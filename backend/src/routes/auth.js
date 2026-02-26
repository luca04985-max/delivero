import express from 'express';
import { register, login, getCurrentUser, updatePushToken, forgotPassword, resetPassword } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';
import { passwordResetLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot', passwordResetLimiter, forgotPassword);
router.post('/reset', resetPassword);
router.get('/me', authenticateToken, getCurrentUser);
router.put('/push-token', authenticateToken, updatePushToken);

export default router;
