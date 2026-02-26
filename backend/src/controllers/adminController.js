import db from '../config/db.js';
import { createUser } from '../models/User.js';
import crypto from 'crypto';
import { sendRestaurantOnboarding } from '../services/email.js';

export const getAdminStats = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Check if user is admin
    const userResult = await db.query('SELECT role FROM users WHERE id = $1', [userId]);
    if (
      userResult.rows.length === 0 ||
      (userResult.rows[0].role !== 'admin' && userResult.rows[0].role !== 'manager')
    ) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Total users
    const usersCount = await db.query('SELECT COUNT(*) FROM users');

    // Total orders
    const ordersCount = await db.query('SELECT COUNT(*) FROM orders');

    // Total revenue
    const totalRevenue = await db.query('SELECT SUM(total_amount) FROM orders WHERE status = $1', [
      'confirmed',
    ]);

    // Recent orders
    const recentOrders = await db.query(
      'SELECT o.id, o.total_amount, o.status, u.name, o.created_at FROM orders o JOIN users u ON o.customer_id = u.id ORDER BY o.created_at DESC LIMIT 10',
    );

    res.status(200).json({
      totalUsers: parseInt(usersCount.rows[0].count),
      totalOrders: parseInt(ordersCount.rows[0].count),
      totalRevenue: parseFloat(totalRevenue.rows[0].sum) || 0,
      recentOrders: recentOrders.rows,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats', error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const adminId = req.user?.userId;
    const { userId } = req.params;
    const { name, email, role } = req.body;

    if (!adminId || !userId) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    // Check if requester is admin/manager
    const adminResult = await db.query('SELECT role FROM users WHERE id = $1', [adminId]);
    if (
      adminResult.rows.length === 0 ||
      (adminResult.rows[0].role !== 'admin' && adminResult.rows[0].role !== 'manager')
    ) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const targetId = parseInt(userId);
    if (!Number.isFinite(targetId)) {
      return res.status(400).json({ message: 'Invalid userId' });
    }

    if (typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ message: 'Name is required' });
    }
    if (typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const allowedRoles = ['customer', 'rider', 'manager', 'admin'];
    const roleValue = role ? String(role) : null;
    if (roleValue && !allowedRoles.includes(roleValue)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const result = await db.query(
      'UPDATE users SET name = $1, email = $2, role = COALESCE($3, role) WHERE id = $4 RETURNING id, email, name, role',
      [name.trim(), email.trim().toLowerCase(), roleValue, targetId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated', user: result.rows[0] });
  } catch (error) {
    if (error?.code === '23505') {
      return res.status(409).json({ message: 'Email already in use' });
    }
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Check if user is admin
    const userResult = await db.query('SELECT role FROM users WHERE id = $1', [userId]);
    if (
      userResult.rows.length === 0 ||
      (userResult.rows[0].role !== 'admin' && userResult.rows[0].role !== 'manager')
    ) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const result = await db.query(
      'SELECT o.*, u.name, u.email FROM orders o JOIN users u ON o.customer_id = u.id ORDER BY o.created_at DESC',
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Check if user is admin
    const userResult = await db.query('SELECT role FROM users WHERE id = $1', [userId]);
    if (
      userResult.rows.length === 0 ||
      (userResult.rows[0].role !== 'admin' && userResult.rows[0].role !== 'manager')
    ) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const result = await db.query(
      'SELECT id, email, name, role, created_at FROM users ORDER BY created_at DESC',
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const adminId = req.user.userId;
    // Support userId in URL param (/users/:userId/role) or in body
    const userIdParam = req.params?.userId;
    const { userId: userIdBody, newRole } = req.body;
    const targetUserId = userIdParam || userIdBody;

    // Check if requester is admin
    const adminResult = await db.query('SELECT role FROM users WHERE id = $1', [adminId]);
    if (
      adminResult.rows.length === 0 ||
      (adminResult.rows[0].role !== 'admin' && adminResult.rows[0].role !== 'manager')
    ) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (!targetUserId) {
      return res.status(400).json({ message: 'Target userId is required' });
    }

    const result = await db.query(
      'UPDATE users SET role = $1 WHERE id = $2 RETURNING id, email, name, role',
      [newRole, targetUserId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User role updated', user: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user role', error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const adminId = req.user?.userId;
    const { userId } = req.params;

    if (!adminId || !userId) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    // Check if requester is admin/manager
    const adminResult = await db.query('SELECT role FROM users WHERE id = $1', [adminId]);
    if (
      adminResult.rows.length === 0 ||
      (adminResult.rows[0].role !== 'admin' && adminResult.rows[0].role !== 'manager')
    ) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Prevent deleting self (safe comparison)
    const targetId = parseInt(userId);
    const currentId = parseInt(adminId);
    if (targetId === currentId) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    // Verify user exists
    const userCheck = await db.query('SELECT id, email FROM users WHERE id = $1', [targetId]);
    if (userCheck.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete user and associated records
    try {
      // First delete related records to avoid FK errors
      // Delete order_tracks where order belongs to user OR user is the rider
      await db.query(
        `
        DELETE FROM order_tracks WHERE order_id IN (
          SELECT id FROM orders WHERE customer_id = $1 OR rider_id = $1
        )
      `,
        [targetId],
      );

      // Delete orders where user is the creator OR the rider
      await db.query('DELETE FROM orders WHERE customer_id = $1 OR rider_id = $1', [targetId]);

      // Delete tickets for user
      await db.query('DELETE FROM tickets WHERE user_id = $1', [targetId]);

      // Delete the user
      await db.query('DELETE FROM users WHERE id = $1', [targetId]);

      res.status(200).json({ message: 'User deleted successfully', userId: targetId });
    } catch (dbErr) {
      if (dbErr.message.includes('foreign key')) {
        return res.status(400).json({ message: 'Cannot delete user due to existing records' });
      }
      throw dbErr;
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

export const getFinanceReport = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Check if user is admin
    const userResult = await db.query('SELECT role FROM users WHERE id = $1', [userId]);
    if (
      userResult.rows.length === 0 ||
      (userResult.rows[0].role !== 'admin' && userResult.rows[0].role !== 'manager')
    ) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Total revenue from orders
    const revenueResult = await db.query(
      'SELECT SUM(total_amount) as total_revenue FROM orders WHERE status = $1',
      ['confirmed'],
    );

    // Payment methods breakdown
    const paymentMethodsResult = await db.query(
      'SELECT payment_method, COUNT(*) as count, SUM(amount) as total FROM bill_payments GROUP BY payment_method',
    );

    const billPaymentsResult = await db.query(
      'SELECT COUNT(*) as total_bill_payments, SUM(amount) as total_amount FROM bill_payments',
    );

    // Orders by status
    const orderStatusResult = await db.query(
      'SELECT status, COUNT(*) as count FROM orders GROUP BY status',
    );

    res.status(200).json({
      totalRevenue: parseFloat(revenueResult?.rows?.[0]?.total_revenue) || 0,
      billPayments: {
        total: parseInt(billPaymentsResult?.rows?.[0]?.total_bill_payments || 0, 10),
        amount: parseFloat(billPaymentsResult?.rows?.[0]?.total_amount) || 0,
      },
      paymentMethods: paymentMethodsResult.rows,
      ordersByStatus: orderStatusResult.rows,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching finance report', error: error.message });
  }
};

export const getServiceMetrics = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Check if user is admin
    const userResult = await db.query('SELECT role FROM users WHERE id = $1', [userId]);
    if (
      userResult.rows.length === 0 ||
      (userResult.rows[0].role !== 'admin' && userResult.rows[0].role !== 'manager')
    ) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const pharmacyMetrics = await db.query('SELECT COUNT(*) as total FROM pharmacies');
    const transportMetrics = await db.query('SELECT COUNT(*) as total FROM medical_transports');
    const pickupMetrics = await db.query('SELECT COUNT(*) as total FROM document_pickups');
    const billMetrics = await db.query('SELECT COUNT(*) as total FROM bills');

    res.status(200).json({
      pharmacy: pharmacyMetrics?.rows[0] || null,
      medicalTransports: transportMetrics?.rows[0] || null,
      documentPickups: pickupMetrics?.rows[0] || null,
      bills: billMetrics?.rows[0] || null,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching service metrics', error: error.message });
  }
};

export const getTicketStats = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Check if user is admin
    const userResult = await db.query('SELECT role FROM users WHERE id = $1', [userId]);
    if (
      userResult.rows.length === 0 ||
      (userResult.rows[0].role !== 'admin' && userResult.rows[0].role !== 'manager')
    ) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Total tickets
    const totalTickets = await db.query('SELECT COUNT(*) FROM tickets');

    // Tickets by status
    const byStatus = await db.query(
      'SELECT status, COUNT(*) as count FROM tickets GROUP BY status',
    );

    // Tickets by priority
    const byPriority = await db.query(
      'SELECT priority, COUNT(*) as count FROM tickets GROUP BY priority',
    );

    // Tickets by type
    const byType = await db.query('SELECT type, COUNT(*) as count FROM tickets GROUP BY type');

    // Recent unresolved tickets
    const unresolved = await db.query(
      'SELECT id, title, type, priority, created_at FROM tickets WHERE status != $1 ORDER BY created_at DESC LIMIT 5',
      ['closed'],
    );

    res.status(200).json({
      totalTickets: parseInt(totalTickets.rows[0].count),
      byStatus: byStatus.rows,
      byPriority: byPriority.rows,
      byType: byType.rows,
      unresolvedTickets: unresolved.rows,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ticket stats', error: error.message });
  }
};

export const createRestaurant = async (req, res) => {
  try {
    const adminId = req.user.userId;

    // Check admin/manager
    const adminResult = await db.query('SELECT role FROM users WHERE id = $1', [adminId]);
    if (
      adminResult.rows.length === 0 ||
      (adminResult.rows[0].role !== 'admin' && adminResult.rows[0].role !== 'manager')
    ) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { email, ownerName, restaurantName, phone, address } = req.body;
    if (!email || !ownerName || !restaurantName) {
      return res.status(400).json({ message: 'email, ownerName and restaurantName are required' });
    }

    // Create user with a random temporary password (will ask to reset)
    const tempPassword = crypto.randomBytes(8).toString('hex');

    const existing = await db.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const user = await createUser(email, tempPassword, ownerName, 'restaurant');

    // Create restaurant record
    const restResult = await db.query(
      'INSERT INTO restaurants (name, address, phone, email) VALUES ($1, $2, $3, $4) RETURNING id, name, address, phone, email',
      [restaurantName, address || null, phone || null, email],
    );

    // Ensure password reset columns exist
    try {
      await db.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS password_reset_token TEXT');
      await db.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS password_reset_expires TIMESTAMP');
    } catch (alterErr) {
      console.error('Error ensuring reset columns:', alterErr.message || alterErr);
    }

    // Generate reset token and expiry
    const resetToken = crypto.randomBytes(20).toString('hex');
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await db.query(
      'UPDATE users SET password_reset_token = $1, password_reset_expires = $2 WHERE id = $3',
      [resetToken, expires, user.id],
    );

    // Build links (web + mobile deep link if available)
    const frontendUrl = process.env.FRONTEND_URL || 'https://delivero.app';
    const mobileScheme = process.env.MOBILE_DEEP_LINK || 'delivero://';
    const webLink = `${frontendUrl}/reset-password?token=${resetToken}`;
    const mobileLink = `${mobileScheme}reset-password?token=${resetToken}`;

    // Send onboarding email with reset link(s)
    try {
      await sendRestaurantOnboarding(email, ownerName, restaurantName, webLink, mobileLink);
    } catch (mailErr) {
      console.error('Error sending onboarding email:', mailErr.message || mailErr);
    }

    // Audit log
    try {
      await db.query(
        'INSERT INTO api_logs (method, path, status_code, user_id, created_at) VALUES ($1,$2,$3,$4,NOW())',
        ['POST', '/admin/restaurants', 201, user.id],
      );
    } catch (logErr) {
      console.error('Error writing audit log:', logErr.message || logErr);
    }

    res.status(201).json({ message: 'Restaurant created. Email sent to set password.', user, restaurant: restResult.rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Error creating restaurant', error: error.message });
  }
};
