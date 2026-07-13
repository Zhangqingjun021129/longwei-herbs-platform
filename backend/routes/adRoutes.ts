import { Router } from 'express';
import { getAds, getAd, createAd, updateAd, deleteAd } from '../controllers/adController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, getAds);
router.get('/:id', authenticate, getAd);
router.post('/', authenticate, createAd);
router.put('/:id', authenticate, updateAd);
router.delete('/:id', authenticate, deleteAd);

export default router;