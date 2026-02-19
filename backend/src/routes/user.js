import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);

export default router;
