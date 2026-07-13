import express from 'express';
import { getSalesData, getTrafficData, getConversionData, getReport } from '../controllers/analyticsController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/sales', authenticate, getSalesData);
router.get('/traffic', authenticate, getTrafficData);
router.get('/conversion', authenticate, getConversionData);
router.get('/report', authenticate, getReport);

export default router;