import express from 'express';

// Stubbed billPayments router: endpoints removed to match mobile frontend usage
const router = express.Router();

router.all('*', (req, res) => {
  res.status(410).json({ message: 'BillPayments endpoints removed' });
});

export default router;
