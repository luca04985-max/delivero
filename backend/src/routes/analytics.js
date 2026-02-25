import express from 'express';

// Stubbed analytics router: endpoints removed to match mobile frontend usage
const router = express.Router();

router.all('*', (req, res) => {
  res.status(410).json({ message: 'Analytics endpoints removed' });
});

export default router;
