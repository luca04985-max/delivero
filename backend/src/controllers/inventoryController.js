import db from '../config/db.js';
import logger from '../utils/logger.js';
import { inventoryToggleTotal } from '../middleware/metrics.js';

export const listItems = async (req, res) => {
  const { restaurantId } = req.params;
  logger.info(`Inventory: listing items for restaurant ${restaurantId}`);
  try {
    const result = await db.query(
      'SELECT id, name, price, is_available, preparation_time_minutes FROM menu_items WHERE restaurant_id = $1 ORDER BY id',
      [restaurantId],
    );
    logger.debug(`Inventory: found ${result.rowCount} items for ${restaurantId}`);
    res.json(result.rows);
  } catch (err) {
    logger.error('Inventory list error', { restaurantId, error: err.message });
    res.status(500).json({ message: 'Errore server', error: err.message });
  }
};

export const setAvailability = async (req, res) => {
  const { itemId } = req.params;
  const { is_available } = req.body;
  logger.info(`Inventory: set availability for item ${itemId} => ${is_available}`);
  try {
    const result = await db.query(
      'UPDATE menu_items SET is_available = $1, updated_at = NOW() WHERE id = $2 RETURNING id, name, is_available',
      [is_available, itemId],
    );
    if (result.rowCount === 0) return res.status(404).json({ message: 'Menu item non trovato' });
    logger.info('Inventory: availability updated', { itemId, is_available });
    // increment metric; try/catch to avoid throwing if metrics fail
    try { inventoryToggleTotal.inc({ by_role: req.user?.role || 'unknown' }, 1); } catch (e) { logger.warn('Metrics increment failed', { error: e.message }); }
    res.json(result.rows[0]);
  } catch (err) {
    logger.error('Inventory update error', { itemId, error: err.message });
    res.status(500).json({ message: 'Errore server', error: err.message });
  }
};
