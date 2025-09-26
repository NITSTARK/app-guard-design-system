
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import EncryptedFile from '../models/EncryptedFile';
import { EncryptionService } from '../services/EncryptionService';

const UPLOAD_DIR = path.join(__dirname, '..', '..', 'uploads', 'encrypted');

// Ensure upload directory exists
fs.mkdir(UPLOAD_DIR, { recursive: true }).catch(console.error);

export const uploadFile = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const file = req.file; // Multer adds file to req.file
    const { name, folder } = req.body;

    if (!userId || !file) {
      return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'User ID and file are required' } });
    }

    const fileBuffer = await fs.readFile(file.path);
    const { encryptedData, iv, authTag } = EncryptionService.encrypt(fileBuffer);

    const fileId = uuidv4();
    const storageFileName = `${fileId}.enc`;
    const storagePath = path.join(UPLOAD_DIR, storageFileName);

    await fs.writeFile(storagePath, encryptedData);

    const encryptedFile = await EncryptedFile.create({
      id: fileId,
      userId,
      name: name || file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      storagePath,
      iv: iv.toString('hex'),
      authTag: authTag.toString('hex'),
      folder,
    });

    // Clean up the temporary file uploaded by multer
    await fs.unlink(file.path);

    res.status(201).json({ success: true, data: encryptedFile });
  } catch (error: any) {
    console.error('Upload file error:', error);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' } });
  }
};

export const getFiles = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const files = await EncryptedFile.findAll({ where: { userId } });
    res.status(200).json({ success: true, data: files });
  } catch (error: any) {
    console.error('Get files error:', error);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' } });
  }
};

export const getFileMetadata = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const file = await EncryptedFile.findOne({ where: { id, userId } });

    if (!file) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'File not found' } });
    }

    res.status(200).json({ success: true, data: file });
  } catch (error: any) {
    console.error('Get file metadata error:', error);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' } });
  }
};

export const downloadFile = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const fileMetadata = await EncryptedFile.findOne({ where: { id, userId } });

    if (!fileMetadata) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'File not found' } });
    }

    const encryptedFileBuffer = await fs.readFile(fileMetadata.storagePath);
    const decryptedBuffer = EncryptionService.decrypt(
      encryptedFileBuffer,
      Buffer.from(fileMetadata.iv, 'hex'),
      Buffer.from(fileMetadata.authTag, 'hex')
    );

    res.setHeader('Content-Disposition', `attachment; filename="${fileMetadata.name}"`);
    res.setHeader('Content-Type', fileMetadata.mimeType);
    res.setHeader('Content-Length', decryptedBuffer.length);
    res.end(decryptedBuffer);

  } catch (error: any) {
    console.error('Download file error:', error);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' } });
  }
};

export const updateFile = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { name, folder } = req.body;

    const file = await EncryptedFile.findOne({ where: { id, userId } });

    if (!file) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'File not found' } });
    }

    file.name = name ?? file.name;
    file.folder = folder ?? file.folder;

    await file.save();
    res.status(200).json({ success: true, data: file });
  } catch (error: any) {
    console.error('Update file error:', error);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' } });
  }
};

export const deleteFile = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const file = await EncryptedFile.findOne({ where: { id, userId } });

    if (!file) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'File not found' } });
    }

    // Delete the encrypted file from disk
    await fs.unlink(file.storagePath);
    // Delete the metadata from the database
    await file.destroy();

    res.status(204).send(); // No content
  } catch (error: any) {
    console.error('Delete file error:', error);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' } });
  }
};

export const getFilePreview = async (req: Request, res: Response) => {
  // This is a mocked/simplified endpoint as actual preview generation is complex.
  // In a real scenario, this would involve decrypting, potentially converting,
  // and then serving a smaller version or a text snippet.
  res.status(200).json({ success: true, message: 'File preview not fully implemented, returning placeholder.', data: { previewUrl: '/placeholder-preview.png' } });
};
