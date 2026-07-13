import { Router } from 'express';
import { login, register, getUserInfo } from '../controllers/authController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/me', authenticate, getUserInfo);

export default router;