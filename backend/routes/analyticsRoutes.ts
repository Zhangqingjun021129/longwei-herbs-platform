import { Router } from 'express';
import { getSalesData, getTrafficData, getConversionData, getDashboardData, getReport } from '../controllers/analyticsController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/sales', authenticate, getSalesData);
router.get('/traffic', authenticate, getTrafficData);
router.get('/conversion', authenticate, getConversionData);
router.get('/dashboard', authenticate, getDashboardData);
router.get('/report', authenticate, getReport);

export default router;