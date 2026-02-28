import stripe from 'stripe';
import dotenv from 'dotenv';
import db from '../config/db.js';

dotenv.config();

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const stripeInstance = STRIPE_SECRET_KEY ? new stripe(STRIPE_SECRET_KEY) : null;

export const isStripeConfigured = () => {
  return !!stripeInstance && STRIPE_SECRET_KEY && STRIPE_SECRET_KEY.startsWith('sk_');
};

export { stripeInstance };

// Logging per debug della configurazione Stripe
console.log('🔍 Stripe Configuration Debug:');
console.log('  - STRIPE_SECRET_KEY exists:', !!STRIPE_SECRET_KEY);
console.log('  - STRIPE_SECRET_KEY starts with sk_:', STRIPE_SECRET_KEY?.startsWith('sk_'));
console.log('  - stripeInstance created:', !!stripeInstance);
console.log('  - isStripeConfigured():', isStripeConfigured());

export const createPaymentIntent = async (amount, orderId, userId, email) => {
  try {
    if (!stripeInstance) {
      const err = new Error('Stripe is not configured');
      err.code = 'STRIPE_NOT_CONFIGURED';
      throw err;
    }
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'eur',
      metadata: {
        orderId,
        userId,
      },
      receipt_email: email,
    });

    return paymentIntent;
  } catch (error) {
    throw error;
  }
};

export const createPaymentIntentWithMethod = async (
  amount,
  orderId,
  userId,
  email,
  payment_method,
  confirm = false,
) => {
  try {
    if (!stripeInstance) {
      const err = new Error('Stripe is not configured');
      err.code = 'STRIPE_NOT_CONFIGURED';
      throw err;
    }

    const payload = {
      amount: Math.round(amount * 100),
      currency: 'eur',
      metadata: { orderId, userId },
      receipt_email: email,
    };

    if (payment_method) {
      payload.payment_method = payment_method;
      payload.payment_method_types = ['card'];
      if (confirm) payload.confirm = true;
      // off_session attempt for saved cards
      payload.off_session = true;
    }

    const paymentIntent = await stripeInstance.paymentIntents.create(payload);
    return paymentIntent;
  } catch (error) {
    throw error;
  }
};

export const confirmPayment = async paymentIntentId => {
  try {
    if (!stripeInstance) {
      const err = new Error('Stripe is not configured');
      err.code = 'STRIPE_NOT_CONFIGURED';
      throw err;
    }
    const paymentIntent = await stripeInstance.paymentIntents.retrieve(paymentIntentId);
    return paymentIntent.status === 'succeeded';
  } catch (error) {
    throw error;
  }
};

export const savePayment = async (
  orderId,
  paymentIntentId,
  amount,
  status,
  paymentMethod = 'card',
) => {
  try {
    console.log('paymentIntentId: ', paymentIntentId);
    console.log('status: ', status);
    console.log('paymentMethod: ', paymentMethod);
    console.log('orderId: ', orderId);
    console.log('amount: ', amount);
    const result = await db.query(
      'INSERT INTO payments (order_id, stripe_payment_id, amount, status, payment_method) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [orderId, paymentIntentId || null, amount, status, paymentMethod],
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

export const saveCashPayment = async (orderId, amount, status = 'cash_due') => {
  return savePayment(orderId, null, amount, status, 'cash');
};

export const getPayment = async paymentIntentId => {
  try {
    const result = await db.query('SELECT * FROM payments WHERE stripe_payment_id = $1', [
      paymentIntentId,
    ]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};
