
import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16; // For AES, this is always 16
const SALT_LENGTH = 64;
const KEY_LENGTH = 32;
const TAG_LENGTH = 16;
const ITERATIONS = 100000;
const DIGEST = 'sha512';

// This should be a securely stored master key, loaded from environment variables.
// For this example, we'll use a hardcoded key, but this is NOT recommended for production.
const MASTER_KEY = process.env.ENCRYPTION_MASTER_KEY || 'a-very-secure-master-key-that-is-32-bytes-long';

if (MASTER_KEY.length !== KEY_LENGTH) {
  // Pad or truncate the key to ensure it's 32 bytes (256 bits)
  if (MASTER_KEY.length < KEY_LENGTH) {
    MASTER_KEY = MASTER_KEY.padEnd(KEY_LENGTH, '0');
  } else if (MASTER_KEY.length > KEY_LENGTH) {
    MASTER_KEY = MASTER_KEY.substring(0, KEY_LENGTH);
  }
  console.warn(`Encryption master key length adjusted to ${KEY_LENGTH} bytes.`);
}

export class EncryptionService {

  /**
   * Encrypts a piece of text or a Buffer.
   * @param input The text or Buffer to encrypt.
   * @returns An object containing the encrypted data (Buffer), IV (Buffer), and authTag (Buffer).
   */
  static encrypt(input: string | Buffer): { encryptedData: Buffer, iv: Buffer, authTag: Buffer } {
    const salt = crypto.randomBytes(SALT_LENGTH);
    const iv = crypto.randomBytes(IV_LENGTH);

    const key = crypto.pbkdf2Sync(MASTER_KEY, salt, ITERATIONS, KEY_LENGTH, DIGEST);

    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    const dataToEncrypt = typeof input === 'string' ? Buffer.from(input, 'utf8') : input;
    const encrypted = Buffer.concat([cipher.update(dataToEncrypt), cipher.final()]);
    const tag = cipher.getAuthTag();

    return { encryptedData: encrypted, iv, authTag: tag };
  }

  /**
   * Decrypts a Buffer.
   * @param encryptedData The encrypted data as a Buffer.
   * @param iv The Initialization Vector as a Buffer.
   * @param authTag The Authentication Tag as a Buffer.
   * @returns The decrypted data as a Buffer.
   */
  static decrypt(encryptedData: Buffer, iv: Buffer, authTag: Buffer): Buffer {
    try {
      const key = crypto.pbkdf2Sync(MASTER_KEY, iv, ITERATIONS, KEY_LENGTH, DIGEST); // Using IV as salt for key derivation for decryption

      const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
      decipher.setAuthTag(authTag);

      const decrypted = Buffer.concat([decipher.update(encryptedData), decipher.final()]);

      return decrypted;
    } catch (error) {
      console.error("Decryption failed:", error);
      throw new Error("Decryption failed. The data may be corrupt or the key incorrect.");
    }
  }

  /**
   * Encrypts a piece of text and returns a string in the format: iv:tag:encryptedData
   * @param text The text to encrypt.
   * @returns The encrypted string.
   */
  static encryptText(text: string): string {
    const { encryptedData, iv, authTag } = this.encrypt(text);
    return `${iv.toString('hex')}:${authTag.toString('hex')}:${encryptedData.toString('hex')}`;
  }

  /**
   * Decrypts an encrypted string.
   * @param encryptedText The encrypted string in the format: iv:tag:encryptedData
   * @returns The decrypted text.
   */
  static decryptText(encryptedText: string): string {
    const [ivHex, tagHex, encryptedDataHex] = encryptedText.split(':');
    if (!ivHex || !tagHex || !encryptedDataHex) {
      throw new Error('Invalid encrypted text format');
    }
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(tagHex, 'hex');
    const encryptedData = Buffer.from(encryptedDataHex, 'hex');

    const decryptedBuffer = this.decrypt(encryptedData, iv, authTag);
    return decryptedBuffer.toString('utf8');
  }
}
