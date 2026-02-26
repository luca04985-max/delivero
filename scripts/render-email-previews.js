#!/usr/bin/env node
import { pathToFileURL } from 'url';
import path from 'path';
import fs from 'fs/promises';

async function fail(msg) {
  console.error(msg);
  process.exit(1);
}

async function run() {
  const root = process.cwd();
  const servicePath = path.join(root, 'backend', 'src', 'services', 'email.js');
  const fileUrl = pathToFileURL(servicePath).href;

  let mod;
  try {
    mod = await import(fileUrl);
  } catch (err) {
    await fail(`Failed to import email service from ${servicePath}: ${err.message}`);
  }

  const { renderRestaurantOnboardingHtml, renderPasswordResetHtml, renderOrderConfirmationHtml } = mod;
  if (!renderRestaurantOnboardingHtml || !renderPasswordResetHtml || !renderOrderConfirmationHtml) {
    await fail('Required render functions not found in email service');
  }

  // Required environment variables (workflow_dispatch will provide these)
  const OWNER = process.env.ONBOARDING_OWNER;
  const RESTAURANT = process.env.ONBOARDING_RESTAURANT;
  const ONBOARDING_TOKEN = process.env.ONBOARDING_TOKEN;
  const RESET_TOKEN = process.env.RESET_TOKEN;
  const ORDER_ID = process.env.ORDER_ID;
  const ORDER_AMOUNT = process.env.ORDER_AMOUNT;
  const FRONTEND_URL = process.env.FRONTEND_URL;
  const MOBILE_DEEP_LINK = process.env.MOBILE_DEEP_LINK || '';

  if (!OWNER || !RESTAURANT || !ONBOARDING_TOKEN) await fail('ONBOARDING_OWNER, ONBOARDING_RESTAURANT and ONBOARDING_TOKEN are required');
  if (!RESET_TOKEN) await fail('RESET_TOKEN is required');
  if (!ORDER_ID || !ORDER_AMOUNT) await fail('ORDER_ID and ORDER_AMOUNT are required');
  if (!FRONTEND_URL) await fail('FRONTEND_URL is required');

  const outDir = path.join(root, 'artifacts', 'email-previews');
  await fs.mkdir(outDir, { recursive: true });

  // Build links
  const webOnboarding = `${FRONTEND_URL}/reset-password?token=${encodeURIComponent(ONBOARDING_TOKEN)}`;
  const mobileOnboarding = `${MOBILE_DEEP_LINK}reset-password?token=${encodeURIComponent(ONBOARDING_TOKEN)}`;
  const resetLink = `${FRONTEND_URL}/reset-password?token=${encodeURIComponent(RESET_TOKEN)}`;

  // Render
  const onboardingHtml = renderRestaurantOnboardingHtml(OWNER, RESTAURANT, webOnboarding, mobileOnboarding);
  const resetHtml = renderPasswordResetHtml(resetLink);
  const orderHtml = renderOrderConfirmationHtml(ORDER_ID, ORDER_AMOUNT);

  await fs.writeFile(path.join(outDir, 'onboarding.html'), onboardingHtml, 'utf8');
  await fs.writeFile(path.join(outDir, 'reset.html'), resetHtml, 'utf8');
  await fs.writeFile(path.join(outDir, 'order.html'), orderHtml, 'utf8');

  // Generate a simple index.html so Pages has a landing page
  const now = new Date().toISOString();
  const indexHtml = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Delivero Email Previews</title>
  <style>body{font-family:system-ui,Segoe UI,Roboto,Arial;margin:32px;background:#f7f7fb}a{color:#0b5fff}</style>
</head>
<body>
  <h1>Delivero — Email Previews</h1>
  <p>Generated: ${now}</p>
  <ul>
    <li><a href="./onboarding.html">Restaurant Onboarding</a></li>
    <li><a href="./reset.html">Password Reset</a></li>
    <li><a href="./order.html">Order Confirmation</a></li>
  </ul>
</body>
</html>`;

  await fs.writeFile(path.join(outDir, 'index.html'), indexHtml, 'utf8');

  console.log('Email previews generated in:', outDir);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
