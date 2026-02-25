import db from '../config/db.js';

export const listAddresses = async (req, res) => {
  try {
    const userId = req.user.userId;
    const result = await db.query('SELECT id, label, display_name, latitude, longitude, created_at FROM customer_addresses WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
    res.json(result.rows);
  } catch (err) {
    console.error('Failed to list addresses', err);
    res.status(500).json({ message: 'Failed to list addresses' });
  }
};

export const createAddress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { label, displayName, latitude, longitude } = req.body;
    const result = await db.query(
      'INSERT INTO customer_addresses (user_id, label, display_name, latitude, longitude) VALUES ($1,$2,$3,$4,$5) RETURNING id, label, display_name as "displayName", latitude, longitude, created_at',
      [userId, label || null, displayName || null, latitude || null, longitude || null],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Failed to create address', err);
    res.status(500).json({ message: 'Failed to create address' });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const id = Number(req.params.id);
    await db.query('DELETE FROM customer_addresses WHERE id = $1 AND user_id = $2', [id, userId]);
    res.json({ success: true });
  } catch (err) {
    console.error('Failed to delete address', err);
    res.status(500).json({ message: 'Failed to delete address' });
  }
};

export default { listAddresses, createAddress, deleteAddress };
