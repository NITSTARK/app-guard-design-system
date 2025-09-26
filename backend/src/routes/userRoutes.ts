
import { Router } from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/UserController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/profile', authenticateToken, getUserProfile);
router.put('/profile', authenticateToken, updateUserProfile);

export default router;
