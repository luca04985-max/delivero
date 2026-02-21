import express from 'express';
import {
  createTicket,
  getAllTickets,
  getUserTickets,
  getTicketById,
  updateTicketStatus,
  updateTicketPriority,
  addTicketComment,
  getTicketComments,
  getTicketStats,
  searchTickets,
  deleteTicket
} from '../controllers/ticketsController.js';
import { authenticateToken } from '../middleware/auth.js';
import db from '../config/db.js';

const router = express.Router();

// Create a new ticket (any authenticated user)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { type, title, description, attachmentUrls } = req.body;
    if (!type || !title || !description) {
      return res.status(400).json({ error: 'Type, title, and description are required' });
    }

    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const ticket = await createTicket(userId, type, title, description, attachmentUrls || []);
    res.status(201).json(ticket);
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({ error: 'Failed to create ticket' });
  }
});

// Create a new ticket for customer (customer specific route)
router.post('/customer', authenticateToken, async (req, res) => {
  try {
    const { type, title, description, order_id, attachmentUrls, user_id } = req.body;
    console.log("Request body:", req.body);
    console.log("User from middleware:", req.user);

    if (!type || !title || !description) {
      return res.status(400).json({ error: 'Type, title, and description are required' });
    }

    // Usa user_id dal body se presente, altrimenti dal middleware
    const userId = user_id || req.user?.userId;
    console.log("Extracted userId:", userId);
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    // Check if user is customer
    const userRes = await db.query('SELECT role FROM users WHERE id = $1', [userId]);
    const role = userRes.rows[0]?.role;
    if (role !== 'customer') {
      return res.status(403).json({ error: 'Customer access required' });
    }

    const ticket = await createTicket(userId, type, title, description, attachmentUrls || [], order_id);
    res.status(201).json(ticket);
  } catch (error) {
    console.error('Error creating customer ticket:', error);
    res.status(500).json({ error: 'Failed to create ticket' });
  }
});

// Get all tickets (admin only)
router.get('/admin', authenticateToken, async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    const userRes = await db.query('SELECT role FROM users WHERE id = $1', [userId]);
    const role = userRes.rows[0]?.role;
    if (role !== 'admin' && role !== 'manager') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const { status, type, priority } = req.query;
    const filters = {};
    if (status) filters.status = status;
    if (type) filters.type = type;
    if (priority) filters.priority = priority;

    const tickets = await getAllTickets(filters);
    res.json(tickets);
  } catch (error) {
    console.error('Error getting all tickets:', error);
    res.status(500).json({ error: 'Failed to get tickets' });
  }
});

// Get all tickets (admin only)
router.get('/admin/all', authenticateToken, async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    const userRes = await db.query('SELECT role FROM users WHERE id = $1', [userId]);
    const role = userRes.rows[0]?.role;
    if (role !== 'admin' && role !== 'manager') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const { status, type, priority } = req.query;
    const filters = {};
    if (status) filters.status = status;
    if (type) filters.type = type;
    if (priority) filters.priority = priority;

    const tickets = await getAllTickets(filters);
    res.json(tickets);
  } catch (error) {
    console.error('Error getting all tickets:', error);
    res.status(500).json({ error: 'Failed to get tickets' });
  }
});

// Get customer tickets
router.get('/customer', authenticateToken, async (req, res) => {
  try {
    console.log('🎫 GET /customer route hit');
    console.log('🔑 Request headers:', req.headers);
    console.log('👤 User from middleware:', req.user);

    const userId = req.user?.userId;
    console.log('🆔 Extracted userId:', userId);

    if (!userId) {
      console.log('❌ No userId found, returning 401');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userRes = await db.query('SELECT role FROM users WHERE id = $1', [userId]);
    const role = userRes.rows[0]?.role;
    console.log('👔 User role:', role);

    if (role !== 'customer') {
      console.log('❌ User is not customer, returning 403');
      return res.status(403).json({ error: 'Customer access required' });
    }

    console.log('🎫 Calling getUserTickets for userId:', userId);
    const tickets = await getUserTickets(userId);
    console.log('🎫 Tickets returned:', tickets);

    res.json(tickets);
  } catch (error) {
    console.error('Error getting customer tickets:', error);
    res.status(500).json({ error: 'Failed to get customer tickets' });
  }
});

// Get specific customer ticket by ID
router.get('/customer/:id', authenticateToken, async (req, res) => {
  try {
    console.log('🎫 GET /customer/:id route hit');
    console.log('🔑 Request headers:', req.headers);
    console.log('👤 User from middleware:', req.user);
    console.log('🎫 Requested ticket ID:', req.params.id);

    const userId = req.user?.userId;
    console.log('🆔 Extracted userId:', userId);

    if (!userId) {
      console.log('❌ No userId found, returning 401');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userRes = await db.query('SELECT role FROM users WHERE id = $1', [userId]);
    const role = userRes.rows[0]?.role;
    console.log('👔 User role:', role);

    if (role !== 'customer') {
      console.log('❌ User is not customer, returning 403');
      return res.status(403).json({ error: 'Customer access required' });
    }

    console.log('🎫 Calling getTicketById for ticket ID:', req.params.id);
    const ticket = await getTicketById(req.params.id);
    console.log('🎫 Ticket returned:', ticket);

    if (!ticket) {
      console.log('❌ Ticket not found, returning 404');
      return res.status(404).json({ error: 'Ticket not found' });
    }

    // Check if user can access this ticket (customer can only see their own tickets)
    if (ticket.user_id !== userId) {
      console.log('❌ Access denied - ticket belongs to different user');
      return res.status(403).json({ error: 'Access denied' });
    }

    console.log('🎫 Access granted, returning ticket');
    res.json(ticket);
  } catch (error) {
    console.error('Error getting customer ticket:', error);
    res.status(500).json({ error: 'Failed to get ticket' });
  }
});

router.get('/rider/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.user?.userId;
    console.log('🆔 Extracted userId:', userId);

    if (!userId) {
      console.log('❌ No userId found, returning 401');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userRes = await db.query('SELECT role FROM users WHERE id = $1', [userId]);
    const role = userRes.rows[0]?.role;
    console.log('👔 User role:', role);

    if (role !== 'rider') {
      console.log('❌ User is not rider, returning 403');
      return res.status(403).json({ error: 'Rider access required' });
    }

    console.log('🎫 Calling getTicketById for ticket ID:', req.params.id);
    const ticket = await getTicketById(req.params.id);
    console.log('🎫 Ticket returned:', ticket);

    if (!ticket) {
      console.log('❌ Ticket not found, returning 404');
      return res.status(404).json({ error: 'Ticket not found' });
    }

    // Check if user can access this ticket (customer can only see their own tickets)
    if (ticket.user_id !== userId) {
      console.log('❌ Access denied - ticket belongs to different user');
      return res.status(403).json({ error: 'Access denied' });
    }

    console.log('🎫 Access granted, returning ticket');
    res.json(ticket);
  } catch (error) {
    console.error('Error getting rider ticket:', error);
    res.status(500).json({ error: 'Failed to get ticket' });
  }
});

// Get rider tickets
router.get('/rider', authenticateToken, async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const userRes = await db.query('SELECT role FROM users WHERE id = $1', [userId]);
    const role = userRes.rows[0]?.role;
    if (role !== 'rider') {
      return res.status(403).json({ error: 'Rider access required' });
    }

    const tickets = await getUserTickets(userId);
    res.json(tickets);
  } catch (error) {
    console.error('Error getting rider tickets:', error);
    res.status(500).json({ error: 'Failed to get rider tickets' });
  }
});

// Get user's tickets
router.get('/my-tickets', authenticateToken, async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const tickets = await getUserTickets(userId);
    res.json(tickets);
  } catch (error) {
    console.error('Error getting user tickets:', error);
    res.status(500).json({ error: 'Failed to get user tickets' });
  }
});

// Get ticket by ID with comments
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const ticket = await getTicketById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    // Check authorization: user can only see their own tickets, admin can see all
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    const userRes = await db.query('SELECT role FROM users WHERE id = $1', [userId]);
    const role = userRes.rows[0]?.role;

    if (role !== 'admin' && role !== 'manager' && ticket.user_id !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(ticket);
  } catch (error) {
    console.error('Error getting ticket:', error);
    res.status(500).json({ error: 'Failed to get ticket' });
  }
});

// Update ticket status (admin only)
router.patch('/:id/status', authenticateToken, async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    const userRes = await db.query('SELECT role FROM users WHERE id = $1', [userId]);
    const role = userRes.rows[0]?.role;
    if (role !== 'admin' && role !== 'manager') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const { status, adminNotes } = req.body;
    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const ticket = await updateTicketStatus(req.params.id, status, adminNotes);
    res.json(ticket);
  } catch (error) {
    console.error('Error updating ticket status:', error);
    res.status(500).json({ error: 'Failed to update ticket status' });
  }
});

// Update ticket priority (admin only)
router.patch('/:id/priority', authenticateToken, async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    const userRes = await db.query('SELECT role FROM users WHERE id = $1', [userId]);
    const role = userRes.rows[0]?.role;
    if (role !== 'admin' && role !== 'manager') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const { priority } = req.body;
    if (!priority) {
      return res.status(400).json({ error: 'Priority is required' });
    }

    const ticket = await updateTicketPriority(req.params.id, priority);
    res.json(ticket);
  } catch (error) {
    console.error('Error updating ticket priority:', error);
    res.status(500).json({ error: 'Failed to update ticket priority' });
  }
});

// Add comment to ticket
router.post('/:id/comments', authenticateToken, async (req, res) => {
  try {
    console.log("-----------Add comment to ticket----------------");
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).json({ error: 'Comment is required' });
    }

    const ticket = await getTicketById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    // Check authorization: can comment on own tickets or if admin
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    const userRes = await db.query('SELECT role FROM users WHERE id = $1', [userId]);
    const role = userRes.rows[0]?.role;

    if (role !== 'admin' && ticket.user_id !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const newComment = await addTicketComment(req.params.id, userId, comment);
    console.log("NEW COMMENT")
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// Get ticket comments
router.get('/:id/comments', authenticateToken, async (req, res) => {
  try {
    const ticket = await getTicketById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    // Check authorization
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    const userRes = await db.query('SELECT role FROM users WHERE id = $1', [userId]);
    const role = userRes.rows[0]?.role;

    if (role !== 'admin' && role !== 'manager' && ticket.user_id !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const comments = await getTicketComments(req.params.id);
    res.json(comments);
  } catch (error) {
    console.error('Error getting comments:', error);
    res.status(500).json({ error: 'Failed to get comments' });
  }
});

// Get ticket statistics (admin only)
router.get('/admin/stats', authenticateToken, async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    const userRes = await db.query('SELECT role FROM users WHERE id = $1', [userId]);
    const role = userRes.rows[0]?.role;
    if (role !== 'admin' && role !== 'manager') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const stats = await getTicketStats();
    res.json(stats);
  } catch (error) {
    console.error('Error getting ticket stats:', error);
    res.status(500).json({ error: 'Failed to get statistics' });
  }
});

// Search tickets
router.get('/search/:term', authenticateToken, async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    const userRes = await db.query('SELECT role FROM users WHERE id = $1', [userId]);
    const role = userRes.rows[0]?.role;
    if (role !== 'admin' && role !== 'manager') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const tickets = await searchTickets(req.params.term);
    res.json(tickets);
  } catch (error) {
    console.error('Error searching tickets:', error);
    res.status(500).json({ error: 'Failed to search tickets' });
  }
});

// Delete ticket (admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    const userRes = await db.query('SELECT role FROM users WHERE id = $1', [userId]);
    const role = userRes.rows[0]?.role;
    if (role !== 'admin' && role !== 'manager') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const ticket = await deleteTicket(req.params.id);
    res.json({ message: 'Ticket deleted', ticket });
  } catch (error) {
    console.error('Error deleting ticket:', error);
    res.status(500).json({ error: 'Failed to delete ticket' });
  }
});

export default router;
