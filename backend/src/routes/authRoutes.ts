
import { Router } from 'express';
import { register, login, refresh, logout, getMe, getWindowsHelloChallenge, verifyWindowsHello } from '../controllers/AuthController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.get('/me', authenticateToken, getMe);

// Mocked Windows Hello Routes
router.post('/windows-hello/challenge', getWindowsHelloChallenge);
router.post('/windows-hello/verify', verifyWindowsHello);

export default router;
