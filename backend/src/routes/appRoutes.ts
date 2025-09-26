
import { Router } from 'express';
import { getApps, addApp, updateApp, deleteApp, lockApp, unlockApp, getAppStatus } from '../controllers/AppController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// All routes in this file are protected
router.use(authenticateToken);

router.get('/', getApps);
router.post('/', addApp);
router.get('/status', getAppStatus);

router.put('/:id', updateApp);
router.delete('/:id', deleteApp);

router.post('/:id/lock', lockApp);
router.post('/:id/unlock', unlockApp);

export default router;
