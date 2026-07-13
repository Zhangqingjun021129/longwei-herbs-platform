import express from 'express';
import { getPlatforms, getPlatform, createPlatform, updatePlatform, deletePlatform, testConnection } from '../controllers/platformController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticate, getPlatforms);
router.get('/:id', authenticate, getPlatform);
router.post('/', authenticate, createPlatform);
router.put('/:id', authenticate, updatePlatform);
router.delete('/:id', authenticate, deletePlatform);
router.post('/:id/test', authenticate, testConnection);

export default router;