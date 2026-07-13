import express from 'express';
import { getAdPlans, getAdPlan, createAdPlan, updateAdPlan, deleteAdPlan, startAdPlan, stopAdPlan, getAdAnalytics } from '../controllers/adController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticate, getAdPlans);
router.get('/:id', authenticate, getAdPlan);
router.post('/', authenticate, createAdPlan);
router.put('/:id', authenticate, updateAdPlan);
router.delete('/:id', authenticate, deleteAdPlan);
router.post('/:id/start', authenticate, startAdPlan);
router.post('/:id/stop', authenticate, stopAdPlan);
router.get('/:id/analytics', authenticate, getAdAnalytics);

export default router;