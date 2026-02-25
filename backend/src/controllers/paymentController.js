import {
  createPaymentIntent,
  confirmPayment,
  savePayment,
  saveCashPayment,
  getPayment,
  isStripeConfigured,
} from '../services/payment.js';
import db from '../config/db.js';
import { sendOrderConfirmation } from '../services/email.js';
import logger from '../utils/logger.js';

export const createPayment = async (req, res) => {
  try {
    const { orderId, payment_method_token } = req.body;
    const userId = req.user.userId;

    // Verify order exists
    const orderResult = await db.query(
      'SELECT o.*, u.email FROM orders o JOIN users u ON o.customer_id = u.id WHERE o.id = $1 AND o.customer_id = $2',
      [orderId, userId],
    );

    if (orderResult.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const order = orderResult.rows[0];
    const user = await db.query('SELECT email FROM users WHERE id = $1', [userId]);

    if (!isStripeConfigured()) {
      return res.status(501).json({ message: 'Stripe non configurato sul server' });
    }

    // Always compute amount server-side
    const amount = Number(order.total_amount);

    // If client provided a saved payment token, attempt an immediate charge
    if (payment_method_token) {
      try {
        const paymentIntent = await createPaymentIntentWithMethod(
          amount,
          orderId,
          userId,
          user.rows[0].email,
          payment_method_token,
          true,
        );

        // Persist payment record
        await savePayment(orderId, paymentIntent.id, amount, paymentIntent.status, 'card');

        if (paymentIntent.status === 'succeeded') {
          await db.query('UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2', [
            'confirmed',
            orderId,
          ]);
        }

        return res.status(201).json({
          clientSecret: paymentIntent.client_secret,
          paymentIntentId: paymentIntent.id,
          status: paymentIntent.status,
        });
      } catch (err) {
        // If immediate charge failed (e.g. requires_action), fall back to returning client_secret
        logger.error('Immediate charge with saved token failed:', err.message || err);
        try {
          const fallback = await createPaymentIntent(amount, orderId, userId, user.rows[0].email);
          await savePayment(orderId, fallback.id, amount, 'pending', 'card');
          return res.status(201).json({
            clientSecret: fallback.client_secret,
            paymentIntentId: fallback.id,
          });
        } catch (fallbackErr) {
          logger.error('Fallback payment intent creation failed:', fallbackErr.message || fallbackErr);
          return res.status(500).json({ message: 'Error creating payment', error: fallbackErr.message });
        }
      }
    }

    // Default: create a normal PaymentIntent and return client_secret to client
    const paymentIntent = await createPaymentIntent(amount, orderId, userId, user.rows[0].email);
    await savePayment(orderId, paymentIntent.id, amount, 'pending', 'card');
    res.status(201).json({ clientSecret: paymentIntent.client_secret, paymentIntentId: paymentIntent.id });
  } catch (error) {
    res.status(500).json({ message: 'Error creating payment', error: error.message });
  }
};

export const confirmOrderPayment = async (req, res) => {
  try {
    const { paymentIntentId, orderId } = req.body;
    const userId = req.user.userId;

    if (!isStripeConfigured()) {
      return res.status(501).json({ message: 'Stripe non configurato sul server' });
    }

    // Confirm with Stripe
    const isConfirmed = await confirmPayment(paymentIntentId);

    if (!isConfirmed) {
      return res.status(400).json({ message: 'Payment not confirmed' });
    }

    // Update order status
    await db.query(
      'UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2 AND customer_id = $3',
      ['confirmed', orderId, userId],
    );

    // Update payment status
    await db.query('UPDATE payments SET status = $1 WHERE stripe_payment_id = $2', [
      'completed',
      paymentIntentId,
    ]);

    // Get user email and send confirmation
    const userResult = await db.query('SELECT email FROM users WHERE id = $1', [userId]);
    const orderResult = await db.query('SELECT total_amount FROM orders WHERE id = $1', [orderId]);

    await sendOrderConfirmation(
      userResult.rows[0].email,
      orderId,
      orderResult.rows[0].total_amount,
    );

    res.status(200).json({ message: 'Payment confirmed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error confirming payment', error: error.message });
  }
};

export const createCashPayment = async (req, res) => {
  try {
    const { orderId } = req.body;
    const userId = req.user.userId;
    const orderResult = await db.query('SELECT * FROM orders WHERE id = $1 AND customer_id = $2', [
      orderId,
      userId,
    ]);
    if (orderResult.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const order = orderResult.rows[0];
    const amount = Number(order.total_amount);

    // Create a cash payment record (due on delivery)
    const payment = await saveCashPayment(orderId, amount, 'pending');
    // Confirm order (can now be accepted by riders/managers)
    await db.query(
      'UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2 AND customer_id = $3',
      ['pending', orderId, userId],
    );
    res.status(201).json({ message: 'Cash payment created', payment });
  } catch (error) {
    logger.error('Error creating cash payment:', error);
    res.status(500).json({ message: 'Error creating cash payment', error: error.message });
  }
};

export const markCashCollected = async (req, res) => {
  try {
    const { orderId } = req.body;
    const requesterId = req.user.userId;

    const roleRes = await db.query('SELECT role FROM users WHERE id = $1', [requesterId]);
    const role = roleRes.rows[0]?.role;
    if (role !== 'admin' && role !== 'manager' && role !== 'rider') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const payRes = await db.query(
      `UPDATE payments
       SET status = 'completed', updated_at = NOW()
       WHERE order_id = $1 AND payment_method = 'cash'
       RETURNING *`,
      [orderId],
    );

    if (payRes.rows.length === 0) {
      return res.status(404).json({ message: 'Cash payment not found for order' });
    }

    res.status(200).json({ message: 'Cash marked as collected', payment: payRes.rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Error updating cash payment', error: error.message });
  }
};
