import express from 'express';
import {
  createPayment,
  confirmOrderPayment,
  createCashPayment,
  markCashCollected,
} from '../controllers/paymentController.js';
import {
  tokenizeCard,
  listCards,
  deleteCard,
} from '../controllers/customerCardsController.js';
import { stripeWebhook } from '../controllers/webhookController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/create', authenticateToken, createPayment);
router.post('/confirm', authenticateToken, confirmOrderPayment);
router.post('/cash/create', authenticateToken, createCashPayment);
router.post('/cash/collected', authenticateToken, markCashCollected);
router.post('/webhooks/stripe', stripeWebhook);

// Customer card management (server-side tokenization)
router.post('/cards/tokenize', authenticateToken, tokenizeCard);
router.get('/cards', authenticateToken, listCards);
router.delete('/cards/:id', authenticateToken, deleteCard);

export default router;
