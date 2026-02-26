import { useEffect, useState } from 'react';
import { ordersAPI } from '../services/api';
import OrderTracking from '../components/OrderTracking';
import adminStyles from '../styles/adminTheme';
import { theme } from '../theme/theme';

export default function OrdersList({ userId }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await ordersAPI.getAll();
      setOrders(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSearch('');
    setStatusFilter('all');
    setDateFrom('');
    setDateTo('');
  };

  if (loading) return <p>Caricamento ordini...</p>;
  if (error) return <p style={{ color: 'var(--admin-danger, #D32F2F)' }}>Errore: {error}</p>;

  const filteredOrders = orders.filter(o => {
    // search by id, customer name or email
    const q = search.trim().toLowerCase();
    if (q) {
      const inId = o.id.toString().includes(q);
      const inName = (o.name || '').toLowerCase().includes(q);
      const inEmail = (o.email || '').toLowerCase().includes(q);
      if (!(inId || inName || inEmail)) return false;
    }

    if (statusFilter !== 'all' && o.status !== statusFilter) return false;

    if (dateFrom) {
      const from = new Date(dateFrom);
      if (new Date(o.created_at) < from) return false;
    }
    if (dateTo) {
      const to = new Date(dateTo);
      if (new Date(o.created_at) > to) return false;
    }

    return true;
  });

  return (
    <div style={{ ...adminStyles.container }}>
      <h2 style={{ ...adminStyles.title }}>I tuoi Ordini</h2>

      <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'center' }}>
        <input
          placeholder="Cerca per id, nome, email"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ ...adminStyles.input }}
        />
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ ...adminStyles.select }}>
          <option value="all">Tutti gli stati</option>
          <option value="pending">Pending</option>
          <option value="in_transit">In Transit</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} style={{ ...adminStyles.input }} />
        <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} style={{ ...adminStyles.input }} />
        <button onClick={clearFilters} style={{ ...adminStyles.button }}>Reset</button>
      </div>

      {filteredOrders.length === 0 ? (
        <p style={adminStyles.muted}>Nessun ordine</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {filteredOrders.map(order => (
            <li
              key={order.id}
              style={{
                ...adminStyles.card,
                marginBottom: '12px',
                cursor: 'pointer',
                backgroundColor: selectedOrder?.id === order.id ? theme.colors.surface : theme.colors.white,
              }}
              onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <strong>Ordine #{order.id}</strong> - €{order.total_amount}
                  <p style={{ margin: '6px 0', color: theme.colors.text.secondary }}>
                    Stato:{' '}
                    <span
                      style={{
                        color:
                          order.status === 'completed'
                            ? 'var(--admin-success, #4caf50)'
                            : order.status === 'pending'
                              ? 'var(--admin-warning, #FF9800)'
                              : 'var(--admin-primary, #0B5FFF)',
                      }}
                    >
                      {order.status.toUpperCase().replace('_', ' ')}
                    </span>
                  </p>
                  <small style={adminStyles.muted}>{new Date(order.created_at).toLocaleDateString('it-IT')}</small>
                </div>
              </div>

              {selectedOrder?.id === order.id && (
                <OrderTracking orderId={order.id} userId={userId} />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
