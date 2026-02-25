import db from '../config/db.js';
import crypto from 'crypto';

const SECRET = process.env.CARD_TOKEN_KEY || 'dev_card_key_change_in_prod';

export const tokenizeCard = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const { card_number, name } = req.body;
    if (!card_number || card_number.length < 12) {
      return res.status(400).json({ message: 'Invalid card number' });
    }

    // Create a server-side token using HMAC (demo). Do NOT store raw PAN.
    const token = crypto.createHmac('sha256', SECRET).update(card_number).digest('hex');
    const last4 = card_number.slice(-4);
    const masked = `•••• •••• •••• ${last4}`;

    // Persist token
    const result = await db.query(
      `INSERT INTO customer_cards (user_id, token, masked, last4, brand)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (token) DO UPDATE SET user_id = $1
       RETURNING id, token, masked, last4, created_at`,
      [userId, token, masked, last4, null],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Failed to tokenize card', error);
    res.status(500).json({ message: 'Failed to tokenize card', error: error.message });
  }
};

export const listCards = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const result = await db.query('SELECT id, token, masked, last4, created_at FROM customer_cards WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Failed to list cards', error);
    res.status(500).json({ message: 'Failed to list cards', error: error.message });
  }
};

export const deleteCard = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    const { id } = req.params;
    const del = await db.query('DELETE FROM customer_cards WHERE id = $1 AND user_id = $2 RETURNING id', [id, userId]);
    if (del.rows.length === 0) return res.status(404).json({ message: 'Card not found' });
    res.json({ message: 'Card removed' });
  } catch (error) {
    console.error('Failed to delete card', error);
    res.status(500).json({ message: 'Failed to delete card', error: error.message });
  }
};

export default { tokenizeCard, listCards, deleteCard };
