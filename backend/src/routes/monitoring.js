import express from 'express';

// Stubbed monitoring router: endpoints removed to match mobile frontend usage
const router = express.Router();

router.all('*', (req, res) => {
  res.status(410).json({ message: 'Monitoring endpoints removed' });
});

export default router;
