
import { Router } from 'express';
import multer from 'multer';
import { authenticateToken } from '../middleware/authMiddleware';
import {
  uploadFile,
  getFiles,
  getFileMetadata,
  downloadFile,
  updateFile,
  deleteFile,
  getFilePreview,
} from '../controllers/FileController';

const router = Router();

// Configure multer for file uploads
const upload = multer({ dest: './uploads/temp' }); // Temporary storage for uploaded files

// All routes in this file are protected
router.use(authenticateToken);

router.post('/', upload.single('file'), uploadFile);
router.get('/', getFiles);
router.get('/:id', getFileMetadata);
router.get('/:id/download', downloadFile);
router.put('/:id', updateFile);
router.delete('/:id', deleteFile);
router.get('/:id/preview', getFilePreview);

export default router;
