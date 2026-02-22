import db from '../config/db.js';
import Stripe from 'stripe';

// Inizializza Stripe con la chiave segreta dal .env
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create cash payment record
export const createCashPayment = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const { orderId } = req.body;
    if (!orderId) {
      return res.status(400).json({ error: 'Order ID is required' });
    }

    console.log(' Creating cash payment for order:', orderId, 'userId:', userId);

    // Check if order exists and belongs to user
    const orderResult = await db.query(
      'SELECT id, customer_id, total_amount FROM orders WHERE id = $1 AND customer_id = $2',
      [orderId, userId]
    );

    if (orderResult.rows.length === 0) {
      console.log(' Order not found for cash payment:', orderId);
      return res.status(404).json({ message: 'Order not found' });
    }

    const order = orderResult.rows[0];
    if (order.customer_id !== userId) {
      console.log(' Access denied for cash payment - order belongs to different user');
      return res.status(403).json({ message: 'Access denied' });
    }

    console.log(' Order found for cash payment:', { id: order.id, customer_id: order.customer_id, total_amount: order.total_amount });

    const amount = Number(order.total_amount);
    console.log('💰 Creating cash payment record with amount:', amount);
    console.log('📋 Payment data being inserted:', {
      order_id: orderId,
      payment_method: 'cash',
      amount: amount,
      status: 'pending'
    });

    // Create cash payment record
    const paymentResult = await db.query(
      `INSERT INTO payments (order_id, payment_method, amount, status, created_at)
       VALUES ($1, 'cash', $2, 'pending', CURRENT_TIMESTAMP)
       RETURNING *`,
      [orderId, order.total_amount]
    );

    console.log(' Cash payment record created:', paymentResult.rows[0]);

    res.status(201).json(paymentResult.rows[0]);
  } catch (error) {
    console.error('❌ Error creating cash payment:', error);
    console.error('❌ Error details:', {
      message: error.message,
      detail: error.detail,
      constraint: error.constraint,
      table: error.table,
      column: error.column,
      datatype: error.datatype
    });

    // Log specifico per constraint violation
    if (error.constraint === 'payments_status_check') {
      console.error('🚨 PAYMENTS_STATUS_CHECK VIOLATION!');
      console.error('📋 Attempted values:', {
        payment_method: 'cash',
        status: 'pending'
      });
      console.error('🔍 Expected values for status constraint: pending, processing, completed, failed, refunded');
    }

    res.status(500).json({
      message: 'Error creating cash payment',
      error: error.message,
      constraint: error.constraint
    });
  }
};

// Mark cash as collected
export const markCashCollected = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const { orderId } = req.body;
    if (!orderId) {
      return res.status(400).json({ error: 'Order ID is required' });
    }

    // Update payment status to completed
    const result = await db.query(
      `UPDATE payments 
       SET status = 'completed', collected_at = CURRENT_TIMESTAMP, collected_by = $1
       WHERE order_id = $2 AND payment_method = 'cash'
       RETURNING *`,
      [userId, orderId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cash payment not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error marking cash collected:', error);
    res.status(500).json({ error: 'Failed to mark cash as collected' });
  }
};

// Create Stripe payment intent
export const createPayment = async (req, res) => {
  try {
    const { orderId } = req.body;
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    if (!orderId) {
      return res.status(400).json({ error: 'Order ID is required' });
    }

    // Check if order exists and belongs to user
    const orderResult = await db.query(
      'SELECT o.*, u.email FROM orders o JOIN users u ON o.customer_id = u.id WHERE o.id = $1 AND o.customer_id = $2',
      [orderId, userId]
    );

    if (orderResult.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const order = orderResult.rows[0];
    const user = await db.query('SELECT email FROM users WHERE id = $1', [userId]);
    if (!isStripeConfigured()) {
      return res.status(501).json({ message: 'Stripe non configurato sul server' });
    }

    // Crea un payment intent reale con Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.total_amount * 100), // Converti in centesimi
      currency: 'eur',
      metadata: {
        order_id: orderId.toString(),
        user_id: userId.toString()
      },
      automatic_payment_methods: {
        enabled: ['card']
      }
    });

    // Salva il payment intent nel database
    const paymentResult = await db.query(
      `INSERT INTO payments (order_id, payment_method, amount, status, stripe_payment_id, created_at)
       VALUES ($1, 'stripe', $2, 'pending', $3, CURRENT_TIMESTAMP)
       RETURNING *`,
      [orderId, order.total_amount, paymentIntent.id]
    );

    const response = {
      ...paymentResult.rows[0],
      client_secret: paymentIntent.client_secret,
      payment_intent_id: paymentIntent.id
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating Stripe payment:', error);
    res.status(500).json({ message: 'Error creating Stripe payment', error: error.message });
  }
};

// Confirm Stripe payment
export const confirmStripePayment = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const { orderId, paymentIntentId } = req.body;
    if (!orderId || !paymentIntentId) {
      return res.status(400).json({ error: 'Order ID and Payment Intent ID are required' });
    }

    // Verifica il payment intent con Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({
        error: 'Payment not successful',
        status: paymentIntent.status
      });
    }

    // Aggiorna lo stato del pagamento a completed
    const result = await db.query(
      `UPDATE payments 
       SET status = 'completed', confirmed_at = CURRENT_TIMESTAMP
       WHERE stripe_payment_id = $1 AND order_id = $2
       RETURNING *`,
      [paymentIntentId, orderId]
    );

    // Conferma l'ordine
    await db.query(
      'UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2',
      ['confirmed', orderId]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Confirm payment error:', error);
    res.status(500).json({ error: 'Failed to confirm payment' });
  }
};
