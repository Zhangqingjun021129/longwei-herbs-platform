import express from 'express';
import { getCompetitors, getCompetitor, createCompetitor, updateCompetitor, deleteCompetitor, getCompetitorAnalysis } from '../controllers/competitorController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticate, getCompetitors);
router.get('/:id', authenticate, getCompetitor);
router.post('/', authenticate, createCompetitor);
router.put('/:id', authenticate, updateCompetitor);
router.delete('/:id', authenticate, deleteCompetitor);
router.get('/:id/analysis', authenticate, getCompetitorAnalysis);

export default router;