import db from '../config/db.js';

// Create cash payment record
export const createCashPayment = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const { orderId } = req.body;
    if (!orderId) {
      return res.status(400).json({ error: 'Order ID is required' });
    }

    // Check if order exists and belongs to user
    const orderResult = await db.query(
      'SELECT id, customer_id, total_amount FROM orders WHERE id = $1',
      [orderId]
    );

    if (orderResult.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const order = orderResult.rows[0];
    if (order.customer_id !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Create cash payment record
    const paymentResult = await db.query(
      `INSERT INTO payments (order_id, payment_method, amount, status, created_at)
       VALUES ($1, 'cash', $2, 'pending', CURRENT_TIMESTAMP)
       RETURNING *`,
      [orderId, order.total_amount]
    );

    res.status(201).json(paymentResult.rows[0]);
  } catch (error) {
    console.error('Error creating cash payment:', error);
    res.status(500).json({ error: 'Failed to create cash payment' });
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
export const createStripePayment = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const { orderId } = req.body;
    if (!orderId) {
      return res.status(400).json({ error: 'Order ID is required' });
    }

    // Check if order exists and belongs to user
    const orderResult = await db.query(
      'SELECT id, customer_id, total_amount FROM orders WHERE id = $1',
      [orderId]
    );

    if (orderResult.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const order = orderResult.rows[0];
    if (order.customer_id !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Mock Stripe payment intent (in real implementation, use Stripe SDK)
    const paymentIntent = {
      id: `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      order_id: orderId,
      amount: order.total_amount * 100, // Convert to cents
      currency: 'eur',
      status: 'requires_payment_method',
      client_secret: `pi_${Date.now()}_secret_${Math.random().toString(36).substr(2, 9)}`,
      created_at: new Date().toISOString()
    };

    // Create payment record
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
    res.status(500).json({ error: 'Failed to create Stripe payment' });
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

    // Update payment status to completed
    const result = await db.query(
      `UPDATE payments 
       SET status = 'completed', confirmed_at = CURRENT_TIMESTAMP, stripe_payment_id = $1
       WHERE order_id = $2 AND payment_method = 'stripe'
       RETURNING *`,
      [paymentIntentId, orderId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Stripe payment not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error confirming Stripe payment:', error);
    res.status(500).json({ error: 'Failed to confirm Stripe payment' });
  }
};
