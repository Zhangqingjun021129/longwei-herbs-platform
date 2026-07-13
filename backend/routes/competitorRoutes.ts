import { Router } from 'express';
import { getCompetitors, getCompetitor, createCompetitor, updateCompetitor, deleteCompetitor } from '../controllers/competitorController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, getCompetitors);
router.get('/:id', authenticate, getCompetitor);
router.post('/', authenticate, createCompetitor);
router.put('/:id', authenticate, updateCompetitor);
router.delete('/:id', authenticate, deleteCompetitor);

export default router;