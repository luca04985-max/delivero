import { useEffect, useState } from 'react';
import logger from '../utils/logger';
import { adminAPI, ordersAPI, ticketsAPI } from '../services/api';
import ManagerTrackingDashboard from './ManagerTrackingDashboard';
import TrackingMap from '../components/TrackingMap';
import adminStyles from '../styles/adminTheme';
import { theme } from '../theme/theme';

const styles = {
  container: {
    padding: '28px',
    maxWidth: '1300px',
    margin: '0 auto',
    backgroundColor: theme.colors.background,
    minHeight: '100vh',
  },
  header: { marginBottom: '28px' },
  tabsContainer: {
    display: 'flex',
    gap: '12px',
    marginBottom: '22px',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  tabButton: active => ({
    padding: '10px 16px',
    background: 'transparent',
    color: active ? theme.colors.secondary : theme.colors.text.primary,
    border: '1px solid transparent',
    cursor: 'pointer',
    borderRadius: '8px',
    fontWeight: active ? 700 : 500,
    boxShadow: active ? '0 6px 18px rgba(11,95,255,0.08)' : 'none',
    transition: 'all 150ms ease',
  }),
  card: {
    padding: '22px',
    backgroundColor: 'white',
    borderRadius: '10px',
    marginBottom: '18px',
    boxShadow: '0 4px 16px rgba(16,24,40,0.04)',
  },
  gridCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '18px',
    marginBottom: '28px',
  },
  statCard: {
    padding: '18px',
    backgroundColor: 'white',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 6px 18px rgba(16,24,40,0.04)',
  },
  statValue: { fontSize: '26px', fontWeight: 700, color: theme.colors.secondary, marginBottom: '8px' },
  statLabel: { fontSize: '13px', color: theme.colors.text.secondary },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '18px',
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 6px 18px rgba(16,24,40,0.04)',
  },
  tableHeader: { backgroundColor: theme.colors.secondary, color: theme.colors.white },
  tableHeaderCell: { padding: '14px', textAlign: 'left', borderBottom: '1px solid rgba(0,0,0,0.06)' },
  tableCell: { padding: '12px 14px', borderBottom: '1px solid rgba(0,0,0,0.04)', color: theme.colors.text.primary },
  tableRowHover: { backgroundColor: theme.colors.surface },
  inputGroup: { display: 'flex', gap: '12px', marginBottom: '18px', flexWrap: 'wrap', alignItems: 'center' },
  select: {
    padding: '10px',
    borderRadius: '8px',
    border: `1px solid ${theme.colors.border}`,
    flex: '0 0 220px',
    minWidth: '150px',
    color: theme.colors.text.primary,
    backgroundColor: theme.colors.white,
  },
  button: {
    padding: '10px 16px',
    backgroundColor: theme.colors.secondary,
    color: theme.colors.white,
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 6px 18px rgba(11,95,255,0.12)',
  },
  ghostButton: {
    padding: '10px 14px',
    background: 'transparent',
    color: theme.colors.text.primary,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: '8px',
    cursor: 'pointer',
  },
  actionButton: danger => ({
    padding: '8px 12px',
    backgroundColor: danger ? theme.colors.error : theme.colors.secondary,
    color: theme.colors.white,
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '13px',
  }),
  loading: { textAlign: 'center', padding: '40px', color: theme.colors.text.secondary },
  error: {
    padding: '16px',
    backgroundColor: 'var(--notice-error-bg, #FEF2F2)',
    color: theme.colors.error,
    borderRadius: '8px',
    marginBottom: '18px',
  },
  success: {
    padding: '16px',
    backgroundColor: 'var(--notice-success-bg, #ECFDF5)',
    color: theme.colors.success,
    borderRadius: '8px',
    marginBottom: '18px',
  },
  // Modal / form styles
  modalOverlay: {
    position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(2,6,23,0.6)', zIndex: 1400,
  },
  modalBox: { width: 'min(720px, 96%)', background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 10px 40px rgba(2,6,23,0.2)' },
  modalTitle: { margin: 0, fontSize: 20, fontWeight: 700, color: theme.colors.text.primary },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 },
  formField: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: { fontSize: 13, color: theme.colors.text.secondary },
  inputStyle: { padding: '10px 12px', borderRadius: 8, border: `1px solid ${theme.colors.border}`, fontSize: 14, outline: 'none' },
  helperText: { fontSize: 12, color: theme.colors.text.secondary },
  actionsRow: { display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 16 },
  cancelButton: { padding: '10px 14px', background: 'transparent', borderRadius: 8, border: `1px solid ${theme.colors.border}`, cursor: 'pointer' },
  createButton: { padding: '10px 16px', backgroundColor: theme.colors.secondary, color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', boxShadow: '0 6px 18px rgba(11,95,255,0.12)' },
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('stats');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [showCreateRestaurant, setShowCreateRestaurant] = useState(false);
  const [newRestaurant, setNewRestaurant] = useState({
    email: '',
    ownerName: '',
    restaurantName: '',
    phone: '',
    address: '',
  });
  const [createError, setCreateError] = useState(null);

  // Stats
  const [stats, setStats] = useState(null);
  const [finance, setFinance] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [ticketStats, setTicketStats] = useState(null);

  // Orders
  const [orders, setOrders] = useState([]);
  const [orderFilter, setOrderFilter] = useState('all');

  // Users
  const [users, setUsers] = useState([]);
  const [userFilter, setUserFilter] = useState('all');
  const [editingUser, setEditingUser] = useState(null);
  const [newRole, setNewRole] = useState('');

  // Tickets
  const [tickets, setTickets] = useState([]);
  const [ticketFilter, setTicketFilter] = useState('open');

  // Tracking
  const [selectedOrderTracking, setSelectedOrderTracking] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setCurrentUser(user);
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [stats, finance, metrics, tickets] = await Promise.all([
        adminAPI.getStats(),
        adminAPI.getFinanceReport(),
        adminAPI.getServiceMetrics(),
        adminAPI.getTicketStats(),
      ]);
      setStats(stats);
      setFinance(finance);
      setMetrics(metrics);
      setTicketStats(tickets);
    } catch (err) {
      logger.error('Error loading dashboard data:', err);
      setError(err.response?.data?.message || 'Error loading dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getAllOrders();
      setOrders(Array.isArray(response) ? response : response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Error loading orders');
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getAllUsers();
      setUsers(Array.isArray(response) ? response : response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Error loading users');
    } finally {
      setLoading(false);
    }
  };

  const loadTickets = async () => {
    try {
      setLoading(true);
      const response = await ticketsAPI.getAdminTickets();
      setTickets(Array.isArray(response) ? response : response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Error loading tickets');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = tab => {
    setActiveTab(tab);
    setError(null);
    setSuccess(null);

    if (tab === 'orders' && orders.length === 0) loadOrders();
    if (tab === 'users' && users.length === 0) loadUsers();
    if (tab === 'tickets' && tickets.length === 0) loadTickets();
  };

  const handleUpdateUserRole = async userId => {
    try {
      setLoading(true);
      await adminAPI.updateUserRole(userId, newRole);
      setSuccess('User role updated successfully');
      setEditingUser(null);
      await loadUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating user role');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async userId => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        setLoading(true);
        await adminAPI.deleteUser(userId);
        setSuccess('User deleted successfully');
        await loadUsers();
      } catch (err) {
        setError(err.response?.data?.message || 'Error deleting user');
      } finally {
        setLoading(false);
      }
    }
  };

  const filteredOrders = orders.filter(o =>
    orderFilter === 'all' ? true : o.status === orderFilter,
  );
  const filteredUsers = users.filter(u => (userFilter === 'all' ? true : u.role === userFilter));
  const filteredTickets = tickets.filter(t =>
    ticketFilter === 'all' ? true : t.status === ticketFilter,
  );

  if (loading && activeTab === 'stats')
    return <div style={styles.loading}>Loading dashboard...</div>;

  return (
    <div style={adminStyles.container}>
      <div style={styles.header}>
        <h1 style={adminStyles.title}>⚙️ Admin Dashboard</h1>
        <p style={adminStyles.subtitle}>Manage all system operations and data</p>
      </div>

      {error && <div style={styles.error}>{error}</div>}
      {success && <div style={styles.success}>{success}</div>}

      <div style={styles.tabsContainer}>
        <button
          style={styles.tabButton(activeTab === 'stats')}
          onClick={() => handleTabChange('stats')}
        >
          📊 Statistics
        </button>
        <button
          style={styles.tabButton(activeTab === 'orders')}
          onClick={() => handleTabChange('orders')}
        >
          📦 Orders
        </button>
        <button
          style={styles.tabButton(activeTab === 'users')}
          onClick={() => handleTabChange('users')}
        >
          👥 Users
        </button>
        <button
          style={styles.tabButton(activeTab === 'finance')}
          onClick={() => handleTabChange('finance')}
        >
          💰 Finance
        </button>
        <button
          style={styles.tabButton(activeTab === 'metrics')}
          onClick={() => handleTabChange('metrics')}
        >
          📈 Metrics
        </button>
        <button
          style={styles.tabButton(activeTab === 'tickets')}
          onClick={() => handleTabChange('tickets')}
        >
          🎫 Tickets
        </button>
        <button
          style={styles.tabButton(activeTab === 'tracking')}
          onClick={() => handleTabChange('tracking')}
        >
          🗺️ Tracciamento
        </button>
        <button
          style={{ ...styles.button, marginLeft: 12 }}
          onClick={() => setShowCreateRestaurant(true)}
        >
          ➕ Crea Ristorante
        </button>
      </div>

      {showCreateRestaurant && (
        <div style={styles.modalOverlay} onClick={() => setShowCreateRestaurant(false)}>
          <div style={styles.modalBox} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={styles.modalTitle}>➕ Crea Ristorante</h3>
              <div style={{ fontSize: 13, color: theme.colors.text.secondary }}>Invia link per impostare la password</div>
            </div>

            <div style={{ marginTop: 12 }}>
              {createError && (
                <div style={{ padding: 10, background: 'rgba(254,242,242,0.8)', borderRadius: 8, color: theme.colors.error, marginBottom: 8 }}>
                  {createError}
                </div>
              )}

              <div style={styles.formGrid}>
                <div style={styles.formField}>
                  <label style={styles.label}>Email</label>
                  <input style={styles.inputStyle} placeholder="es. info@ristorante.it" value={newRestaurant.email} onChange={e => setNewRestaurant(prev => ({ ...prev, email: e.target.value }))} />
                  <div style={styles.helperText}>L'email verrà usata per inviare il link di onboarding.</div>
                </div>

                <div style={styles.formField}>
                  <label style={styles.label}>Telefono</label>
                  <input style={styles.inputStyle} placeholder="es. +39 333 1234567" value={newRestaurant.phone} onChange={e => setNewRestaurant(prev => ({ ...prev, phone: e.target.value }))} />
                </div>

                <div style={styles.formField}>
                  <label style={styles.label}>Proprietario (nome)</label>
                  <input style={styles.inputStyle} placeholder="Nome del proprietario" value={newRestaurant.ownerName} onChange={e => setNewRestaurant(prev => ({ ...prev, ownerName: e.target.value }))} />
                </div>

                <div style={styles.formField}>
                  <label style={styles.label}>Nome Ristorante</label>
                  <input style={styles.inputStyle} placeholder="Nome del ristorante" value={newRestaurant.restaurantName} onChange={e => setNewRestaurant(prev => ({ ...prev, restaurantName: e.target.value }))} />
                </div>

                <div style={{ gridColumn: '1 / -1', ...styles.formField }}>
                  <label style={styles.label}>Indirizzo</label>
                  <input style={styles.inputStyle} placeholder="Via, città, CAP" value={newRestaurant.address} onChange={e => setNewRestaurant(prev => ({ ...prev, address: e.target.value }))} />
                </div>
              </div>

              <div style={styles.actionsRow}>
                <button style={styles.cancelButton} onClick={() => setShowCreateRestaurant(false)}>Annulla</button>
                <button
                  style={styles.createButton}
                  onClick={async () => {
                    // Client-side validation
                    setCreateError(null);
                    const emailRx = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
                    if (!newRestaurant.email || !emailRx.test(newRestaurant.email)) {
                      setCreateError('Email non valida');
                      return;
                    }
                    if (!newRestaurant.ownerName || !newRestaurant.restaurantName) {
                      setCreateError('Nome proprietario e nome ristorante sono obbligatori');
                      return;
                    }

                    try {
                      setLoading(true);
                      setError(null);
                      const resp = await adminAPI.createRestaurant(newRestaurant);
                      setSuccess(resp.data?.message || 'Ristorante creato');
                      setShowCreateRestaurant(false);
                      setNewRestaurant({ email: '', ownerName: '', restaurantName: '', phone: '', address: '' });
                    } catch (err) {
                      setCreateError(err.response?.data?.message || err.message);
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  Crea e invia email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Statistics Tab */}
      {activeTab === 'stats' && stats && (
        <div>
          <div style={adminStyles.gridCards}>
            <div style={adminStyles.card}>
              <div style={styles.statValue}>{stats.totalUsers}</div>
              <div style={styles.statLabel}>Total Users</div>
            </div>
            <div style={adminStyles.card}>
              <div style={styles.statValue}>{stats.totalOrders}</div>
              <div style={styles.statLabel}>Total Orders</div>
            </div>
            <div style={adminStyles.card}>
              <div style={styles.statValue}>€{stats.totalRevenue?.toFixed(2)}</div>
              <div style={styles.statLabel}>Total Revenue</div>
            </div>
          </div>

          <h3>Recent Orders</h3>
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.tableHeaderCell}>ID</th>
                <th style={styles.tableHeaderCell}>Customer</th>
                <th style={styles.tableHeaderCell}>Amount</th>
                <th style={styles.tableHeaderCell}>Status</th>
                <th style={styles.tableHeaderCell}>Date</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders?.map(order => (
                <tr key={order.id}>
                  <td style={styles.tableCell}>#{order.id}</td>
                  <td style={styles.tableCell}>{order.name}</td>
                  <td style={styles.tableCell}>€{order.total_amount}</td>
                  <td style={styles.tableCell}>{order.status}</td>
                  <td style={styles.tableCell}>
                    {new Date(order.created_at).toLocaleDateString('en-US')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div>
          <div style={styles.inputGroup}>
            <select
              style={adminStyles.select}
              value={orderFilter}
              onChange={e => setOrderFilter(e.target.value)}
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <h3>Orders ({filteredOrders.length})</h3>
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.tableHeaderCell}>ID</th>
                <th style={styles.tableHeaderCell}>Customer</th>
                <th style={styles.tableHeaderCell}>Amount</th>
                <th style={styles.tableHeaderCell}>Status</th>
                <th style={styles.tableHeaderCell}>Date</th>
                <th style={styles.tableHeaderCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id}>
                  <td style={styles.tableCell}>#{order.id}</td>
                  <td style={styles.tableCell}>{order.name}</td>
                  <td style={styles.tableCell}>€{order.total_amount}</td>
                  <td style={styles.tableCell}>{order.status}</td>
                  <td style={styles.tableCell}>
                    {new Date(order.created_at).toLocaleDateString('en-US')}
                  </td>
                  <td style={styles.tableCell}>
                    <button
                      style={styles.actionButton(false)}
                      onClick={() => setSelectedOrderTracking(order.id)}
                    >
                      Traccia
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Tracking Map Modal */}
          {selectedOrderTracking && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
              }}
            >
              <div
                style={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  padding: '20px',
                  width: '90%',
                  maxWidth: '900px',
                  maxHeight: '90vh',
                  overflow: 'auto',
                  position: 'relative',
                }}
              >
                <button
                  onClick={() => setSelectedOrderTracking(null)}
                    style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: 'var(--admin-muted, #999)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    cursor: 'pointer',
                    fontSize: '18px',
                  }}
                >
                  ✕
                </button>
                <TrackingMap orderId={selectedOrderTracking} />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div>
          <div style={styles.inputGroup}>
            <select
              style={adminStyles.select}
              value={userFilter}
              onChange={e => setUserFilter(e.target.value)}
            >
              <option value="all">All Users</option>
              <option value="customer">Customers</option>
              <option value="rider">Riders</option>
              <option value="manager">Managers</option>
              <option value="admin">Admins</option>
            </select>
          </div>

          <h3>Users ({filteredUsers.length})</h3>
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.tableHeaderCell}>ID</th>
                <th style={styles.tableHeaderCell}>Name</th>
                <th style={styles.tableHeaderCell}>Email</th>
                <th style={styles.tableHeaderCell}>Role</th>
                <th style={styles.tableHeaderCell}>Date</th>
                <th style={styles.tableHeaderCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td style={styles.tableCell}>#{user.id}</td>
                  <td style={styles.tableCell}>{user.name}</td>
                  <td style={styles.tableCell}>{user.email}</td>
                  <td style={styles.tableCell}>
                    {editingUser === user.id ? (
                      <select
                        style={{ ...styles.select, width: 'auto' }}
                        value={newRole}
                        onChange={e => setNewRole(e.target.value)}
                      >
                        <option value="customer">Customer</option>
                        <option value="rider">Rider</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      user.role
                    )}
                  </td>
                  <td style={styles.tableCell}>
                    {new Date(user.created_at).toLocaleDateString('en-US')}
                  </td>
                  <td style={styles.tableCell}>
                    {editingUser === user.id ? (
                      <>
                        <button style={adminStyles.button} onClick={() => handleUpdateUserRole(user.id)}>
                          Save
                        </button>
                        <button
                          style={{ ...adminStyles.button, backgroundColor: 'var(--admin-muted, #999)', marginLeft: '5px' }}
                          onClick={() => setEditingUser(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          style={styles.actionButton(false)}
                          onClick={() => {
                            setEditingUser(user.id);
                            setNewRole(user.role);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          style={{
                            ...styles.actionButton(true),
                            marginLeft: '5px',
                            opacity: currentUser?.id === user.id ? 0.5 : 1,
                            cursor: currentUser?.id === user.id ? 'not-allowed' : 'pointer',
                          }}
                          onClick={() => handleDeleteUser(user.id)}
                          disabled={currentUser?.id === user.id}
                        >
                          {currentUser?.id === user.id ? "Can't Delete Self" : 'Delete'}
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Finance Tab */}
      {activeTab === 'finance' && finance && (
        <div>
          <div style={styles.gridCards}>
            <div style={styles.statCard}>
              <div style={styles.statValue}>
                €{finance.totalRevenue ? Number(finance.totalRevenue).toFixed(2) : '0.00'}
              </div>
              <div style={styles.statLabel}>Total Revenue</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statValue}>{finance.billPayments?.total || 0}</div>
              <div style={styles.statLabel}>Bill Payments</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statValue}>
                €
                {finance.billPayments?.amount
                  ? Number(finance.billPayments.amount).toFixed(2)
                  : '0.00'}
              </div>
              <div style={styles.statLabel}>Bills Total</div>
            </div>
          </div>

          <h3>Payment Methods</h3>
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.tableHeaderCell}>Method</th>
                <th style={styles.tableHeaderCell}>Count</th>
                <th style={styles.tableHeaderCell}>Total</th>
              </tr>
            </thead>
            <tbody>
              {finance.paymentMethods?.map((pm, idx) => (
                <tr key={idx}>
                  <td style={styles.tableCell}>{pm.payment_method}</td>
                  <td style={styles.tableCell}>{pm.count}</td>
                  <td style={styles.tableCell}>
                    €{pm.total ? Number(pm.total).toFixed(2) : '0.00'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 style={{ marginTop: '30px' }}>Orders by Status</h3>
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.tableHeaderCell}>Status</th>
                <th style={styles.tableHeaderCell}>Count</th>
              </tr>
            </thead>
            <tbody>
              {finance.ordersByStatus?.map((status, idx) => (
                <tr key={idx}>
                  <td style={styles.tableCell}>{status.status}</td>
                  <td style={styles.tableCell}>{status.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Metrics Tab */}
      {activeTab === 'metrics' && metrics && (
        <div>
          <div style={styles.gridCards}>
            <div style={styles.statCard}>
              <div style={styles.statValue}>{metrics.pharmacy?.total_orders}</div>
              <div style={styles.statLabel}>Pharmacy Orders</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statValue}>{metrics.medicalTransports?.total_transports}</div>
              <div style={styles.statLabel}>Medical Transports</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statValue}>{metrics.documentPickups?.total_pickups}</div>
              <div style={styles.statLabel}>Document Pickups</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statValue}>{metrics.bills?.total_bills}</div>
              <div style={styles.statLabel}>Bills</div>
            </div>
          </div>
        </div>
      )}

      {/* Tickets Tab */}
      {activeTab === 'tickets' && ticketStats && (
        <div>
          <div style={styles.gridCards}>
            <div style={styles.statCard}>
              <div style={styles.statValue}>{ticketStats.totalTickets}</div>
              <div style={styles.statLabel}>Total Tickets</div>
            </div>
          </div>

          <div style={styles.inputGroup}>
            <select
              style={styles.select}
              value={ticketFilter}
              onChange={e => setTicketFilter(e.target.value)}
            >
              <option value="all">All Tickets</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <h3>Unresolved Tickets</h3>
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.tableHeaderCell}>ID</th>
                <th style={styles.tableHeaderCell}>Title</th>
                <th style={styles.tableHeaderCell}>Type</th>
                <th style={styles.tableHeaderCell}>Priority</th>
                <th style={styles.tableHeaderCell}>Date</th>
              </tr>
            </thead>
            <tbody>
              {ticketStats.unresolvedTickets?.map(ticket => (
                <tr key={ticket.id}>
                  <td style={styles.tableCell}>#{ticket.id}</td>
                  <td style={styles.tableCell}>{ticket.title}</td>
                  <td style={styles.tableCell}>{ticket.type}</td>
                  <td style={styles.tableCell}>{ticket.priority}</td>
                  <td style={styles.tableCell}>
                    {new Date(ticket.created_at).toLocaleDateString('en-US')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 style={{ marginTop: '30px' }}>Tickets by Status</h3>
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.tableHeaderCell}>Status</th>
                <th style={styles.tableHeaderCell}>Count</th>
              </tr>
            </thead>
            <tbody>
              {ticketStats.byStatus?.map((status, idx) => (
                <tr key={idx}>
                  <td style={styles.tableCell}>{status.status}</td>
                  <td style={styles.tableCell}>{status.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tracking Tab */}
      {activeTab === 'tracking' && (
        <div>
          <ManagerTrackingDashboard />
        </div>
      )}
    </div>
  );
}
