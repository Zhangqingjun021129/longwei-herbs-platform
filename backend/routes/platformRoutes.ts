import { Router } from 'express';
import { getPlatforms, getPlatform, syncPlatform, updatePlatform } from '../controllers/platformController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, getPlatforms);
router.get('/:id', authenticate, getPlatform);
router.post('/:id/sync', authenticate, syncPlatform);
router.put('/:id', authenticate, updatePlatform);

export default router;