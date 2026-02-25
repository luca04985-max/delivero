import admin from 'firebase-admin';
import db from '../config/db.js';
import fs from 'fs';

let initialized = false;

export function initPush() {
  if (initialized) return;
  const svcPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
  const svcJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  try {
    if (svcPath) {
      const fileContent = fs.readFileSync(svcPath, 'utf-8');
      const cred = JSON.parse(fileContent);
      admin.initializeApp({ credential: admin.credential.cert(cred) });
      initialized = true;
      return;
    }
    if (svcJson) {
      const obj = JSON.parse(svcJson);
      admin.initializeApp({ credential: admin.credential.cert(obj) });
      initialized = true;
      return;
    }
  } catch (e) {
    console.error('Firebase admin init failed:', e.message);
  }
}

export async function sendPushToUser(userId, payload) {
  try {
    if (!initialized) initPush();
    if (!admin.apps.length) {
      return false;
    }
    const res = await db.query('SELECT push_token FROM users WHERE id = $1', [userId]);
    const token = res.rows[0]?.push_token;
    if (!token) {
      return false;
    }
    const message = {
      token,
      notification: {
        title: payload.title || 'Delivero',
        body: payload.body || '',
      },
      data: payload.data || {},
    };
    const r = await admin.messaging().send(message);
    return true;
  } catch (e) {
    console.error('sendPushToUser failed:', e.message);
    return false;
  }
}

export default { initPush, sendPushToUser };
