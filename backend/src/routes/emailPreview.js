import express from 'express';
import { renderRestaurantOnboardingHtml, renderPasswordResetHtml, renderOrderConfirmationHtml } from '../services/email.js';

const router = express.Router();

// Dev-only preview of restaurant onboarding email
router.get('/onboarding', (req, res) => {
  // Require explicit enable in env
  if (process.env.ENABLE_EMAIL_PREVIEW !== 'true') {
    return res.status(403).send('Email preview disabled');
  }

  const { ownerName, restaurantName, token } = req.query;
  // Do not allow preview with defaults: require explicit parameters
  if (!ownerName || !restaurantName || !token) {
    return res.status(400).send('Missing required query parameters: ownerName, restaurantName, token');
  }

  const frontendUrl = process.env.FRONTEND_URL || '';
  const mobileScheme = process.env.MOBILE_DEEP_LINK || '';
  const webLink = `${frontendUrl}/reset-password?token=${token}`;
  const mobileLink = `${mobileScheme}reset-password?token=${token}`;

  const html = renderRestaurantOnboardingHtml(ownerName, restaurantName, webLink, mobileLink);
  res.set('Content-Type', 'text/html');
  res.send(html);
});

// Preview password reset email
router.get('/reset', (req, res) => {
  if (process.env.ENABLE_EMAIL_PREVIEW !== 'true') {
    return res.status(403).send('Email preview disabled');
  }

  const { token } = req.query;
  if (!token) {
    return res.status(400).send('Missing required query parameter: token');
  }

  const frontendUrl = process.env.FRONTEND_URL || '';
  const resetLink = `${frontendUrl}/reset-password?token=${token}`;

  const html = renderPasswordResetHtml(resetLink);
  res.set('Content-Type', 'text/html');
  res.send(html);
});

// Preview order confirmation / receipt email
router.get('/order', (req, res) => {
  if (process.env.ENABLE_EMAIL_PREVIEW !== 'true') {
    return res.status(403).send('Email preview disabled');
  }

  const { orderId, amount } = req.query;
  if (!orderId || !amount) {
    return res.status(400).send('Missing required query parameters: orderId, amount');
  }

  const html = renderOrderConfirmationHtml(orderId, amount);
  res.set('Content-Type', 'text/html');
  res.send(html);
});

export default router;
