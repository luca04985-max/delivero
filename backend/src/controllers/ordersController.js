import db from '../config/db.js';
import { emitOrderUpdate, broadcastLocationUpdate, broadcastOrderStatusChange } from '../services/socket.js';
import { bufferLocationUpdate } from '../services/locationBatcher.js';

export const getOrders = async (req, res) => {
  try {
    const userId = req.user.userId;
    const result = await db.query(
      `SELECT o.*, 
              r.name as restaurant_name,
              r.address as restaurant_address,
              r.image_url as restaurant_image,
              r.rating as restaurant_rating
       FROM orders o
       LEFT JOIN restaurants r ON o.restaurant_id = r.id
       WHERE o.customer_id = $1 
       ORDER BY o.created_at DESC`,
      [userId]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error in getOrders:', error);
    res.status(500).json({ message: 'Errore nel recupero degli ordini', error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const result = await db.query(
      'SELECT * FROM orders WHERE id = $1 AND customer_id = $2',
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Ordine non trovato' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Errore nel recupero ordine', error: error.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    // Support two payload shapes:
    // 1) API-style: { restaurantId, items, totalAmount, deliveryAddress }
    // 2) Mobile simplified: { category, description, address, total_price }
    const userId = req.user.userId;

    let { restaurantId, items, totalAmount, deliveryAddress } = req.body;

    // Also accept alternative/mobile field names
    const { total_price, address, category, description } = req.body;

    // If mobile simplified payload, map to expected fields
    if ((!items || (Array.isArray(items) && items.length === 0)) && description) {
      items = [{ category: category || null, description }];
      totalAmount = totalAmount ?? total_price;
      deliveryAddress = deliveryAddress ?? address;
      restaurantId = restaurantId ?? null;
    }

    // If items were passed but look like PowerShell/hash string, try to normalize
    if (Array.isArray(items) && items.length > 0 && typeof items[0] === 'string') {
      // attempt to parse if it's a JSON string
      try {
        const parsed = items.map(it => {
          if (typeof it === 'string') {
            const trimmed = it.trim();
            if ((trimmed.startsWith('{') && trimmed.endsWith('}')) || (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
              return JSON.parse(trimmed);
            }
            // fallback: try to extract key=value pairs from PowerShell hashtable string like "@{category=food; description=...}"
            const match = trimmed.match(/\{?@?\{?([^}]+)\}?\}?/);
            if (match && match[1]) {
              const pairs = match[1].split(/[;|,]/).map(s => s.trim()).filter(Boolean);
              const obj = {};
              pairs.forEach(p => {
                const kv = p.split('=');
                if (kv.length >= 2) {
                  const k = kv[0].trim();
                  const v = kv.slice(1).join('=').trim();
                  obj[k] = v.replace(/^['"]|['"]$/g, '');
                }
              });
              return obj;
            }
          }
          return it;
        });
        items = parsed;
      } catch (e) {
        // leave items as-is if parsing fails
      }
    }

    // Normalize numeric totalAmount
    if (typeof totalAmount === 'string') {
      totalAmount = parseFloat(totalAmount);
    }

    if (!items || !totalAmount || !deliveryAddress) {
      return res.status(400).json({ message: 'Campi obbligatori mancanti' });
    }

    // Allow delivery latitude/longitude
    const { delivery_latitude, delivery_longitude } = req.body;

    const result = await db.query(
      'INSERT INTO orders (customer_id, restaurant_id, items, total_amount, delivery_address, delivery_latitude, delivery_longitude, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [userId, restaurantId, JSON.stringify(items), totalAmount, deliveryAddress, delivery_latitude || null, delivery_longitude || null, 'pending']
    );

    res.status(201).json({ message: 'Ordine creato', order: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Errore nella creazione ordine', error: error.message });
  }
};

// Update delivery coordinates (for geocoding updates)
export const updateDeliveryCoordinates = async (req, res) => {
  try {
    const { id } = req.params;
    const { delivery_latitude, delivery_longitude } = req.body;
    const userId = req.user.userId;
    const userRole = req.user.role;

    console.log('🗺️ Updating delivery coordinates for order:', id);
    console.log('🗺️ New coordinates:', { delivery_latitude, delivery_longitude });

    // Verify user owns this order (customer only)
    if (userRole !== 'customer') {
      return res.status(403).json({ message: 'Solo i customer possono aggiornare le coordinate di consegna' });
    }

    const orderCheck = await db.query(
      'SELECT id, customer_id FROM orders WHERE id = $1 AND customer_id = $2',
      [id, userId]
    );

    if (orderCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Ordine non trovato o non autorizzato' });
    }

    // Update delivery coordinates
    const result = await db.query(
      'UPDATE orders SET delivery_latitude = $1, delivery_longitude = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
      [delivery_latitude, delivery_longitude, id]
    );

    console.log('✅ Delivery coordinates updated:', result.rows[0]);

    res.status(200).json({
      message: 'Coordinate di consegna aggiornate',
      order: result.rows[0]
    });
  } catch (error) {
    console.error('❌ Error updating delivery coordinates:', error);
    res.status(500).json({
      message: 'Errore nell\'aggiornamento delle coordinate',
      error: error.message
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, location } = req.body;
    const userId = req.user.userId;

    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }
    console.log("----------------ORDER STATUS--------------");
    console.log("ID: " + id);
    console.log("Status: " + status + " Location: " + location);
    const result = await db.query(
      'UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2 AND customer_id = $3 RETURNING *',
      [status, id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Emit real-time update via Socket.IO
    emitOrderUpdate(userId, id, status, location);

    res.status(200).json({ message: 'Order status updated', order: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status', error: error.message });
  }
};

// Get available orders for riders
export const getAvailableOrders = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM orders 
       WHERE status = 'pending' 
       ORDER BY created_at ASC 
       LIMIT 50`
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Errore nel recupero ordini disponibili', error: error.message });
  }
};

// Rider accepts order
export const acceptOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const riderId = req.user.userId;

    const result = await db.query(
      `UPDATE orders 
       SET status = 'accepted', rider_id = $1, updated_at = NOW() 
       WHERE id = $2 AND status = 'pending' 
       RETURNING *`,
      [riderId, id]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Ordine non disponibile o già accettato' });
    }

    res.status(200).json({ message: 'Ordine accettato', order: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Errore nell\'accettazione ordine', error: error.message });
  }
};

// Get active rider orders
export const getActiveRiderOrders = async (req, res) => {
  try {
    const riderId = req.user.userId;
    console.log('🔍 getActiveRiderOrders - riderId:', riderId);

    const result = await db.query(
      `SELECT * FROM orders 
       WHERE rider_id = $1 AND status IN ('accepted', 'pickup', 'in_transit', 'delivering', 'delivered') 
       ORDER BY updated_at DESC`,
      [riderId]
    );

    console.log('🔍 Found orders:', result.rows.length);
    console.log('🔍 Orders:', result.rows.map(o => ({ id: o.id, status: o.status, rider_id: o.rider_id })));

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('❌ Error in getActiveRiderOrders:', error);
    res.status(500).json({ message: 'Errore nel recupero ordini attivi', error: error.message });
  }
};

// Complete delivery
export const completeDelivery = async (req, res) => {
  try {
    const { id } = req.params;
    const riderId = req.user.userId;

    const result = await db.query(
      `UPDATE orders 
       SET status = 'delivered', updated_at = NOW() 
       WHERE id = $1 AND rider_id = $2 
       RETURNING *`,
      [id, riderId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Ordine non trovato' });
    }

    res.status(200).json({ message: 'Consegna completata', order: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Errore nel completamento consegna', error: error.message });
  }
};

// Update order status for riders
export const updateRiderOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const riderId = req.user.userId;

    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    console.log('🔍 UpdateRiderOrderStatus - Order ID:', id);
    console.log('🔍 UpdateRiderOrderStatus - Requested status:', status);
    console.log('🔍 UpdateRiderOrderStatus - Rider ID from token:', riderId);

    // Verify order exists BEFORE updating
    console.log('🔍 UpdateRiderOrderStatus - Checking if order exists...');
    const orderCheck = await db.query(
      'SELECT id, status, rider_id FROM orders WHERE id = $1 AND rider_id = $2',
      [id, riderId]
    );

    console.log('🔍 UpdateRiderOrderStatus - Order check result:', orderCheck.rows.length);

    if (orderCheck.rows.length === 0) {
      console.log('❌ Order not found or not assigned to this rider');
      return res.status(404).json({ message: 'Order not found or not assigned to this rider' });
    }

    console.log('🔍 UpdateRiderOrderStatus - Order exists, proceeding with update...');

    // Validate status transitions for riders
    const validStatuses = ['accepted', 'pickup', 'in_transit', 'delivering', 'delivered'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status for rider' });
    }

    console.log('🔍 UpdateRiderOrderStatus - Executing DB query...');
    const result = await db.query(
      `UPDATE orders 
       SET status = $1, updated_at = NOW() 
       WHERE id = $2 AND rider_id = $3 
       RETURNING *`,
      [status, id, riderId]
    );

    console.log('🔍 UpdateRiderOrderStatus - Transaction completed');
    console.log('🔍 UpdateRiderOrderStatus - DB Result rows:', result.rows.length);
    console.log('🔍 UpdateRiderOrderStatus - Full result:', result.rows);

    if (result.rows.length === 0) {
      console.log('❌ Order not found or not assigned to this rider');
      return res.status(404).json({ message: 'Order not found or not assigned to this rider' });
    }

    const updatedOrder = result.rows[0];

    // Emit real-time update via WebSocket
    broadcastOrderStatusChange(id, updatedOrder.customer_id, status);

    res.status(200).json({ message: 'Order status updated', order: updatedOrder });
  } catch (error) {
    console.error('❌ Error updating order status:', error);
    res.status(500).json({ message: 'Error updating order status', error: error.message });
  }
};

// Rate order (customer rates rider or rider rates customer)
export const rateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, notes } = req.body;
    const userId = req.user.userId;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating deve essere tra 1 e 5' });
    }

    const result = await db.query(
      `UPDATE orders 
       SET status = 'rated', rating = $1, rating_notes = $2, updated_at = NOW() 
       WHERE id = $3 
       RETURNING *`,
      [rating, notes || null, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Ordine non trovato' });
    }

    res.status(200).json({ message: 'Valutazione salvata', order: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Errore nel salvataggio valutazione', error: error.message });
  }
};

// Cancel order
export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const result = await db.query(
      `UPDATE orders 
       SET status = 'cancelled', updated_at = NOW() 
       WHERE id = $1 AND customer_id = $2 AND status IN ('pending', 'accepted') 
       RETURNING *`,
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Non è possibile annullare questo ordine' });
    }

    res.status(200).json({ message: 'Ordine annullato', order: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Errore nell\'annullamento ordine', error: error.message });
  }
};

// Track order - Get order details with rider tracking info
export const trackOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const userRole = req.user.role;

    // Customer can see their own orders, riders can see orders they're assigned to
    let query = 'SELECT id, status, rider_id, delivery_address, delivery_latitude, delivery_longitude, created_at, updated_at, rider_latitude, rider_longitude, eta_minutes, received_at, customer_id, total_amount, items FROM orders WHERE id = $1';
    let queryParams = [id];

    if (userRole === 'customer') {
      query += ' AND customer_id = $2';
      queryParams.push(userId);
    } else if (userRole === 'rider' || userRole === 'manager') {
      // Riders and managers can see orders they're assigned to or any order
      if (userRole === 'rider') {
        query += ' AND rider_id = $2';
        queryParams.push(userId);
      }
      // Managers can see all orders (no additional WHERE clause)
    }

    const result = await db.query(query, queryParams);

    console.log('🔍 TrackOrder - Query executed:', query);
    console.log('🔍 TrackOrder - Query params:', queryParams);
    console.log('🔍 TrackOrder - Result rows:', result.rows.length);
    if (result.rows.length > 0) {
      console.log('🔍 TrackOrder - Result data keys:', Object.keys(result.rows[0]));
      console.log('🔍 TrackOrder - Delivery coords:', {
        lat: result.rows[0].delivery_latitude,
        lon: result.rows[0].delivery_longitude
      });
    }

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Ordine non trovato o non autorizzato' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error in trackOrder:', error);
    res.status(500).json({
      message: 'Errore nel recupero ordine',
      error: error.message
    });
  }
};

// Update rider location (for real-time tracking)
export const updateRiderLocation = async (req, res) => {
  try {
    const riderId = req.user.userId;
    const { latitude, longitude, eta_minutes } = req.body;

    // Validate input
    if (latitude === undefined || longitude === undefined) {
      console.warn('❌ Missing coordinates in location update');
      return res.status(400).json({ message: 'Latitude e longitude sono obbligatori' });
    }

    console.log('🔍 UpdateRiderLocation - Order ID:', req.params.id);
    console.log('🔍 UpdateRiderLocation - Rider ID from token:', riderId);

    // Verify rider has this order and get customer id + delivery coords
    const orderRes = await db.query('SELECT id, customer_id, status, delivery_latitude, delivery_longitude FROM orders WHERE id = $1 AND rider_id = $2', [req.params.id, riderId]);

    console.log('🔍 UpdateRiderLocation - Order check rows:', orderRes.rows.length);

    if (orderRes.rows.length === 0) {
      console.warn('❌ Order not found or not assigned to rider:', req.params.id);
      return res.status(403).json({ message: 'Non autorizzato per questo ordine' });
    }
    const order = orderRes.rows[0];

    if (!['accepted', 'pickup', 'in_transit', 'delivering'].includes(order.status)) {
      console.log('ℹ️ Order not in trackable status:', order.status);
      return res.status(200).json({
        message: 'Ordine non in stato tracciabile',
        tracking: false,
        status: order.status
      });
    }

    // Update location on order
    console.log('🔍 UpdateRiderLocation - Updating coordinates:', { latitude, longitude, eta_minutes });
    const result = await db.query(
      `UPDATE orders 
       SET 
        rider_latitude = $1,
        rider_longitude = $2,
        eta_minutes = COALESCE($3, eta_minutes),
        received_at = COALESCE(received_at, NOW()),
        updated_at = NOW()
       WHERE id = $4
       RETURNING *`,
      [latitude, longitude, eta_minutes, req.params.id]
    );

    console.log('🔍 UpdateRiderLocation - Update result rows:', result.rows.length);
    if (result.rows.length > 0) {
      console.log('✅ UpdateRiderLocation - Updated order:', {
        id: result.rows[0].id,
        rider_latitude: result.rows[0].rider_latitude,
        rider_longitude: result.rows[0].rider_longitude,
        eta_minutes: result.rows[0].eta_minutes
      });

      // Add to location batcher for order_tracks table
      try {
        bufferLocationUpdate(
          req.params.id,
          latitude,
          longitude,
          eta_minutes,
          order.customer_id,
          riderId,
          order.delivery_latitude,
          order.delivery_longitude,
          eta_minutes
        );
        console.log('📍 UpdateRiderLocation - Added to location batcher');
      } catch (batchError) {
        console.warn('⚠️ UpdateRiderLocation - Batcher error:', batchError.message);
      }
    }

    if (result.rows.length === 0) {
      console.warn('❌ No rows updated for order:', req.params.id);
      return res.status(404).json({ message: 'Ordine non trovato' });
    }

    const updatedOrder = result.rows[0];

    // Broadcast location update to customer
    try {
      broadcastLocationUpdate(req.params.id, order.customer_id, {
        rider_latitude: latitude,
        rider_longitude: longitude,
        eta_minutes: eta_minutes
      });
    } catch (error) {
      console.warn('⚠️ Failed to broadcast location update:', error.message);
    }

    res.status(200).json({
      message: 'Posizione aggiornata',
      tracking: updatedOrder
    });
  } catch (error) {
    console.error('❌ Error updating rider location:', error);
    res.status(500).json({ message: 'Errore nell\'aggiornamento posizione', error: error.message });
  }
};

// Get track history for an order
export const getTrackHistory = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate order exists and get user_id
    const orderCheck = await db.query(
      'SELECT id, customer_id FROM orders WHERE id = $1',
      [id]
    );

    if (orderCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Ordine non trovato' });
    }

    // Get tracking history
    const result = await db.query(
      `SELECT latitude, longitude, recorded_at FROM order_tracks WHERE order_id = $1 ORDER BY recorded_at ASC`,
      [id]
    );

    // Return empty array if no tracking data found
    res.status(200).json(result.rows || []);
  } catch (error) {
    console.error('Error in getTrackHistory:', error);
    res.status(500).json({
      message: 'Errore nel recupero storico tracciamento',
      error: error.message
    });
  }
};

// Get all active orders (for manager dashboard)
export const getActiveOrders = async (req, res) => {
  try {
    console.log('🔍 GetActiveOrders - Query executed for manager:', req.user?.email);
    const result = await db.query(
      `SELECT 
        o.id,
        o.status,
        o.rider_id,
        o.customer_id,
        o.delivery_address,
        o.delivery_latitude,
        o.delivery_longitude,
        o.rider_latitude,
        o.rider_longitude,
        o.eta_minutes,
        o.received_at,
        o.total_amount,
        o.created_at,
        o.updated_at,
        u.name as rider_name,
        c.name as customer_name
       FROM orders o
       LEFT JOIN users u ON o.rider_id = u.id
       LEFT JOIN users c ON o.customer_id = c.id
       WHERE o.status IN ('pending', 'accepted', 'pickup', 'in_transit', 'delivering')
       ORDER BY o.created_at DESC`,
      []
    );

    console.log('🔍 GetActiveOrders - Result rows:', result.rows.length);
    if (result.rows.length > 0) {
      console.log('🔍 GetActiveOrders - First order delivery coords:', {
        id: result.rows[0].id,
        delivery_lat: result.rows[0].delivery_latitude,
        delivery_lon: result.rows[0].delivery_longitude,
        rider_lat: result.rows[0].rider_latitude,
        rider_lon: result.rows[0].rider_longitude
      });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Errore nel recupero ordini attivi', error: error.message });
  }
};
