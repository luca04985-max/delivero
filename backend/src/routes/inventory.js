import express from 'express';
import { listItems, setAvailability } from '../controllers/inventoryController.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';

const router = express.Router();

// Public: List menu items for a restaurant
router.get('/:restaurantId/items', listItems);

// Protected: Toggle availability for a menu item (restaurant or admin)
router.put(
  '/items/:itemId/availability',
  authenticateToken,
  authorizeRole(['restaurant', 'admin']),
  setAvailability,
);

export default router;
