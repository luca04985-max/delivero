import db from '../config/db.js';
import { isStripeConfigured } from '../services/payment.js';
import Stripe from 'stripe';

// Inizializza Stripe solo se configurato correttamente
let stripe = null;
if (process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY.startsWith('sk_')) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
}

// Get saved payment methods for a user
export const getSavedPaymentMethods = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    // Get saved cards from customer_cards table
    const result = await db.query(
      'SELECT * FROM customer_cards WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('❌ Error getting saved payment methods:', error);
    res.status(500).json({ error: 'Failed to get saved payment methods' });
  }
};

// Save a payment method
export const savePaymentMethod = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const { payment_method_id, card_last4, card_brand, masked } = req.body;

    if (!payment_method_id) {
      return res.status(400).json({ error: 'Payment method ID is required' });
    }

    if (!stripe || !isStripeConfigured()) {
      return res.status(501).json({ message: 'Stripe non configurato sul server' });
    }

    // Verify the payment method with Stripe
    const paymentMethod = await stripe.paymentMethods.retrieve(payment_method_id);

    // Save to customer_cards table
    const result = await db.query(
      `INSERT INTO customer_cards 
       (user_id, token, masked, last4, brand, created_at)
       VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
       RETURNING *`,
      [
        userId,
        payment_method_id,
        masked || `•••• ${paymentMethod.card?.last4}`,
        card_last4 || paymentMethod.card?.last4,
        card_brand || paymentMethod.card?.brand
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('❌ Error saving payment method:', error);
    res.status(500).json({ error: 'Failed to save payment method' });
  }
};

// Delete a payment method
export const deletePaymentMethod = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const { id } = req.params;

    // Check if card belongs to user
    const methodResult = await db.query(
      'SELECT * FROM customer_cards WHERE id = $1 AND user_id = $2',
      [id, userId]
    );

    if (methodResult.rows.length === 0) {
      return res.status(404).json({ error: 'Payment method not found' });
    }

    const paymentMethod = methodResult.rows[0];

    // Delete from database
    await db.query(
      'DELETE FROM customer_cards WHERE id = $1',
      [id]
    );

    // Also detach from Stripe if possible
    if (stripe && paymentMethod.token) {
      try {
        await stripe.paymentMethods.detach(paymentMethod.token);
      } catch (stripeError) {
        console.warn('⚠️ Could not detach payment method from Stripe:', stripeError);
      }
    }

    res.json({ message: 'Payment method deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting payment method:', error);
    res.status(500).json({ error: 'Failed to delete payment method' });
  }
};
