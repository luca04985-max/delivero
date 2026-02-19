import express from 'express';
import {
  sendRiderLocation,
  getRiderLocation,
  getMyActiveOrderLocation
} from '../controllers/riderController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

router.post('/location', sendRiderLocation);
router.get('/:riderId/location', getRiderLocation);
router.get('/my-active-order/location', getMyActiveOrderLocation);

export default router;
