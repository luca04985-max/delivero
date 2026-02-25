import express from 'express';

// Stubbed bills router: endpoints removed to match mobile frontend usage
const router = express.Router();

router.all('*', (req, res) => {
	res.status(410).json({ message: 'Bills endpoints removed' });
});

export default router;
