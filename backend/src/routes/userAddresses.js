import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import controller from '../controllers/customerAddressesController.js';

const router = express.Router();

// GET /api/user/addresses
router.get('/', authenticateToken, controller.listAddresses);

// POST /api/user/addresses
router.post('/', authenticateToken, controller.createAddress);

// DELETE /api/user/addresses/:id
router.delete('/:id', authenticateToken, controller.deleteAddress);

export default router;
