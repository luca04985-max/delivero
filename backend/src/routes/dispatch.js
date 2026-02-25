import express from 'express';
import { estimateMeet, simulateRiders } from '../controllers/dispatchController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// POST /api/dispatch/estimate - public
router.post('/estimate', estimateMeet);

// POST /api/dispatch/simulate - protected (useful for tools)
router.post('/simulate', authenticateToken, simulateRiders);

export default router;
