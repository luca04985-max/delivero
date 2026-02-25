import db from '../config/db.js';

// Send rider location
export const sendRiderLocation = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    // Check if user is a rider
    const userResult = await db.query('SELECT role FROM users WHERE id = $1', [userId]);
    if (userResult.rows.length === 0 || userResult.rows[0].role !== 'rider') {
      return res.status(403).json({ error: 'Rider access required' });
    }

    const { orderId, latitude, longitude, eta_minutes } = req.body;

    if (!orderId || !latitude || !longitude) {
      return res.status(400).json({ error: 'Order ID, latitude, and longitude are required' });
    }

    // Check if rider is assigned to this order
    const orderResult = await db.query('SELECT rider_id FROM orders WHERE id = $1', [orderId]);

    if (orderResult.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (orderResult.rows[0].rider_id !== userId) {
      return res.status(403).json({ error: 'Not assigned to this order' });
    }

    // Insert or update location
    const locationResult = await db.query(
      `INSERT INTO rider_locations (order_id, rider_id, latitude, longitude, eta_minutes, timestamp)
       VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
       ON CONFLICT (order_id) 
       DO UPDATE SET 
         latitude = $3, 
         longitude = $4, 
         eta_minutes = $5, 
         timestamp = CURRENT_TIMESTAMP
       RETURNING *`,
      [orderId, userId, latitude, longitude, eta_minutes || null],
    );

    res.json(locationResult.rows[0]);
  } catch (error) {
    console.error('Error sending rider location:', error);
    res.status(500).json({ error: 'Failed to send rider location' });
  }
};

// Get rider location
export const getRiderLocation = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const { riderId } = req.params;

    if (!riderId) {
      return res.status(400).json({ error: 'Rider ID is required' });
    }

    // Get latest location for rider
    const locationResult = await db.query(
      `SELECT rl.*, o.id as order_id, o.status as order_status
       FROM rider_locations rl
       LEFT JOIN orders o ON rl.order_id = o.id
       WHERE rl.rider_id = $1
       ORDER BY rl.timestamp DESC
       LIMIT 1`,
      [riderId],
    );

    if (locationResult.rows.length === 0) {
      return res.status(404).json({ error: 'No location found for this rider' });
    }

    res.json(locationResult.rows[0]);
  } catch (error) {
    console.error('Error getting rider location:', error);
    res.status(500).json({ error: 'Failed to get rider location' });
  }
};

// Get rider's current active order location
export const getMyActiveOrderLocation = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    // Check if user is a rider
    const userResult = await db.query('SELECT role FROM users WHERE id = $1', [userId]);
    if (userResult.rows.length === 0 || userResult.rows[0].role !== 'rider') {
      return res.status(403).json({ error: 'Rider access required' });
    }

    // Get latest location for rider's active order
    const locationResult = await db.query(
      `SELECT rl.*, o.id as order_id, o.status as order_status, o.customer_id
       FROM rider_locations rl
       LEFT JOIN orders o ON rl.order_id = o.id
       WHERE rl.rider_id = $1 AND o.status IN ('accepted', 'preparing', 'in_transit')
       ORDER BY rl.timestamp DESC
       LIMIT 1`,
      [userId],
    );

    if (locationResult.rows.length === 0) {
      return res.status(404).json({ error: 'No active order location found' });
    }

    res.json(locationResult.rows[0]);
  } catch (error) {
    console.error('Error getting active order location:', error);
    res.status(500).json({ error: 'Failed to get active order location' });
  }
};
