import pool from '../config/db.js';

// Create a new order
export const createOrder = async (userId, orderData) => {
  try {
    const { deliveryAddress, items, totalAmount, deliveryFee, restaurantId, notes } = orderData;

    const result = await pool.query(
      `INSERT INTO orders (
        user_id, 
        restaurant_id, 
        delivery_address, 
        items, 
        total_amount, 
        delivery_fee, 
        status, 
        notes,
        created_at,
        updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING *`,
      [
        userId,
        restaurantId,
        deliveryAddress,
        JSON.stringify(items),
        totalAmount,
        deliveryFee,
        'pending',
        notes || null,
      ],
    );

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

// Get order by ID
export const getOrderById = async orderId => {
  try {
    const result = await pool.query(
      `SELECT o.*, u.name as customer_name, u.phone as customer_phone, u.email as customer_email
       FROM orders o
       JOIN users u ON o.user_id = u.id
       WHERE o.id = $1`,
      [orderId],
    );

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

// Get user's orders
export const getUserOrders = async (userId, limit = 10, offset = 0) => {
  try {
    const result = await pool.query(
      `SELECT o.*, 
              r.name as restaurant_name,
              r.address as restaurant_address
       FROM orders o
       LEFT JOIN restaurants r ON o.restaurant_id = r.id
       WHERE o.customer_id = $1
       ORDER BY o.created_at DESC
       LIMIT $2 OFFSET $3`,
      [userId, limit, offset],
    );

    return result.rows;
  } catch (error) {
    throw error;
  }
};

// Update order status
export const updateOrderStatus = async (orderId, status) => {
  try {
    const validStatuses = [
      'pending',
      'confirmed',
      'preparing',
      'ready',
      'in_transit',
      'delivered',
      'cancelled',
    ];

    if (!validStatuses.includes(status)) {
      throw new Error('Stato ordine non valido');
    }

    const result = await pool.query(
      `UPDATE orders 
       SET status = $1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING *`,
      [status, orderId],
    );

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

// Assign rider to order
export const assignRiderToOrder = async (orderId, riderId) => {
  try {
    const result = await pool.query(
      `UPDATE orders 
       SET rider_id = $1, status = 'in_transit', updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING *`,
      [riderId, orderId],
    );

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

// Get pending orders for riders
export const getPendingOrders = async () => {
  try {
    const result = await pool.query(
      `SELECT o.*, 
              u.name as customer_name, 
              u.phone as customer_phone,
              r.name as restaurant_name,
              r.address as restaurant_address
       FROM orders o
       JOIN users u ON o.user_id = u.id
       LEFT JOIN restaurants r ON o.restaurant_id = r.id
       WHERE o.status IN ('pending', 'confirmed', 'preparing', 'ready')
       ORDER BY o.created_at ASC`,
    );

    return result.rows;
  } catch (error) {
    throw error;
  }
};

// Get rider's orders
export const getRiderOrders = async riderId => {
  try {
    const result = await pool.query(
      `SELECT o.*, 
              u.name as customer_name, 
              u.phone as customer_phone,
              r.name as restaurant_name,
              r.address as restaurant_address
       FROM orders o
       JOIN users u ON o.user_id = u.id
       LEFT JOIN restaurants r ON o.restaurant_id = r.id
       WHERE o.rider_id = $1
       ORDER BY o.created_at DESC`,
      [riderId],
    );

    return result.rows;
  } catch (error) {
    throw error;
  }
};

// Delete order
export const deleteOrder = async (orderId, userId) => {
  try {
    const result = await pool.query(
      `DELETE FROM orders 
       WHERE id = $1 AND user_id = $2
       RETURNING *`,
      [orderId, userId],
    );

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

// Get order statistics
export const getOrderStats = async () => {
  try {
    const result = await pool.query(
      `SELECT 
         COUNT(*) as total_orders,
         COUNT(CASE WHEN status = 'delivered' THEN 1 END) as delivered_orders,
         COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled_orders,
         AVG(total_amount) as avg_order_value,
         SUM(total_amount) as total_revenue
       FROM orders
       WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'`,
    );

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};
