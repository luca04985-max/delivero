import { createUser, getUserByEmail, verifyUserPassword, getUserById } from '../models/User.js';
import { generateToken, hashPassword } from '../utils/auth.js';
import db from '../config/db.js';
import crypto from 'crypto';
import { sendPasswordReset } from '../services/email.js';

export const register = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    // Validation
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Email, password, e nome sono obbligatori' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password deve avere almeno 6 caratteri' });
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'Email già registrata' });
    }

    // Create user with role (default: 'customer')
    const user = await createUser(email, password, name, role || 'customer');
    const token = generateToken(user.id, user.email);

    res.status(201).json({
      message: 'Utente registrato con successo',
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Errore nella registrazione', error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email e password sono obbligatori' });
    }

    const user = await verifyUserPassword(email, password);
    if (!user) {
      return res.status(401).json({ message: 'Credenziali non valide' });
    }

    const token = generateToken(user.id, user.email);

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Errore nel login', error: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await getUserById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'Utente non trovato' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Errore nel recupero dati utente', error: error.message });
  }
};

export const updatePushToken = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { push_token } = req.body;
    if (!push_token) {
      return res.status(400).json({ message: 'push_token is required' });
    }
    await db.query('UPDATE users SET push_token = $1 WHERE id = $2', [push_token, userId]);
    res.status(200).json({ message: 'Push token updated' });
  } catch (error) {
    res.status(500).json({ message: 'Errore nel salvataggio push token', error: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email è richiesta' });

    // Ensure columns exist
    try {
      await db.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS password_reset_token TEXT');
      await db.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS password_reset_expires TIMESTAMP');
    } catch (alterErr) {
      console.error('Error ensuring reset columns:', alterErr.message || alterErr);
    }

    const user = await getUserByEmail(email);
    if (!user) {
      // Do not reveal existence
      return res.status(200).json({ message: 'Se l\'account esiste, riceverai una email per il reset.' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await db.query('UPDATE users SET password_reset_token = $1, password_reset_expires = $2 WHERE id = $3', [token, expires, user.id]);

    const frontendUrl = process.env.FRONTEND_URL || 'https://delivero.app';
    const resetLink = `${frontendUrl}/reset-password?token=${token}`;

    await sendPasswordReset(email, resetLink);

    res.status(200).json({ message: 'Se l\'account esiste, riceverai una email per il reset.' });
  } catch (error) {
    res.status(500).json({ message: 'Errore nella richiesta di reset password', error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) return res.status(400).json({ message: 'Token e password sono richiesti' });
    if (password.length < 6) return res.status(400).json({ message: 'Password deve avere almeno 6 caratteri' });

    const result = await db.query('SELECT id, password_reset_expires FROM users WHERE password_reset_token = $1', [token]);
    if (result.rows.length === 0) return res.status(400).json({ message: 'Token non valido o scaduto' });

    const user = result.rows[0];
    if (!user.password_reset_expires || new Date(user.password_reset_expires) < new Date()) {
      return res.status(400).json({ message: 'Token non valido o scaduto' });
    }

    const hashed = await hashPassword(password);
    await db.query('UPDATE users SET password = $1, password_reset_token = NULL, password_reset_expires = NULL WHERE id = $2', [hashed, user.id]);

    res.status(200).json({ message: 'Password aggiornata con successo' });
  } catch (error) {
    res.status(500).json({ message: 'Errore nel reset della password', error: error.message });
  }
};
