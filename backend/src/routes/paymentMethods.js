import express from 'express';
import {
  getSavedPaymentMethods,
  savePaymentMethod,
  deletePaymentMethod,
} from '../controllers/paymentMethodsController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all saved payment methods for the authenticated user
router.get('/', authenticateToken, getSavedPaymentMethods);

// Save a new payment method
router.post('/', authenticateToken, savePaymentMethod);

// Delete a payment method
router.delete('/:id', authenticateToken, deletePaymentMethod);

export default router;
