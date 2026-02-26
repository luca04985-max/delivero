import React, { useState, useEffect } from 'react';
import { ordersAPI } from '../services/api';
import socketService from '../services/socket';
import logger from '../utils/logger';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import adminStyles from '../styles/adminTheme';

const styles = {
  ...adminStyles,
  // small overrides specific to tracking dashboard
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '12px',
    borderBottom: '1px solid rgba(15,23,42,0.06)',
  },
  title: { fontSize: '22px', fontWeight: 700, color: '#0F172A' },
  statsBar: { display: 'flex', gap: '18px', marginBottom: '20px' },
  listContainer: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' },
  orderCard: { ...adminStyles.card, borderLeft: '4px solid #ef4444' },
  metricsRow: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', padding: '10px', backgroundColor: '#F8FAFF', borderRadius: '6px' },
};

export default function ManagerTrackingDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrack, setSelectedTrack] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const socket = socketService.initSocket(token ? token.replace('Bearer ', '') : null);
    socket.emit('joinManagerRoom');
    socket.on('activeOrderUpdate', data => {
      // update or insert order into state
      setOrders(prev => {
        const idx = prev.findIndex(o => String(o.id) === String(data.orderId));
        if (idx === -1) {
          // can't fetch full details here; just prepend a small card
          return [
            {
              id: data.orderId,
              rider_latitude: data.latitude,
              rider_longitude: data.longitude,
              eta_minutes: data.eta_minutes,
              status: data.status,
              total_amount: 0,
              delivery_address: '',
            },
            ...prev,
          ];
        }
        const copy = [...prev];
        copy[idx] = {
          ...copy[idx],
          rider_latitude: data.latitude,
          rider_longitude: data.longitude,
          eta_minutes: data.eta_minutes,
          status: data.status,
        };
        return copy;
      });
    });

    loadActiveOrders();
    const interval = setInterval(loadActiveOrders, 15000);
    return () => {
      clearInterval(interval);
      if (socket) socket.off('activeOrderUpdate');
    };
  }, []);

  const loadActiveOrders = async () => {
    try {
      setLoading(false);
      const activeOrders = await ordersAPI.getActiveOrdersTracking();
      setOrders(Array.isArray(activeOrders) ? activeOrders : []);
    } catch (error) {
      logger.error('Error loading active orders:', error);
    }
  };

  const openTrack = async orderId => {
    try {
      const pts = await ordersAPI.getTrackHistory(orderId);
      // Ensure pts is an array
      const trackPoints = Array.isArray(pts) ? pts : [];

      if (trackPoints.length === 0) {
        logger.warn(`No tracking history found for order ${orderId}`);
        alert('Nessuna cronologia di tracciamento disponibile');
        return;
      }

      // normalize points to [lat,lng]
      const poly = trackPoints.map(p => [parseFloat(p.latitude), parseFloat(p.longitude)]);
      setSelectedTrack({ orderId, poly });
    } catch (e) {
      logger.error('Could not fetch track history', e);
      alert(`Errore nel caricamento della cronologia: ${e.message || 'Riprova più tardi'}`);
    }
  };

  const getStatusColor = status => {
    switch (status) {
      case 'in_transit':
        return '#ef4444';
      case 'pickup':
        return '#f59e0b';
      case 'accepted':
        return '#3b82f6';
      case 'pending':
        return '#9ca3af';
      default:
        return '#6b7280';
    }
  };

  const getStatusIcon = status => {
    switch (status) {
      case 'in_transit':
        return '🏍️';
      case 'pickup':
        return '📦';
      case 'accepted':
        return '✅';
      case 'pending':
        return '⏳';
      default:
        return '📍';
    }
  };

  const getStatusText = status => {
    switch (status) {
      case 'in_transit':
        return 'In consegna';
      case 'pickup':
        return 'In ritiro';
      case 'accepted':
        return 'Accettato';
      case 'pending':
        return 'In sospeso';
      default:
        return status;
    }
  };

  const activeOrdersCount = orders.filter(o => ['pickup', 'in_transit'].includes(o.status)).length;
  const activeRidersCount = new Set(orders.map(o => o.rider_id).filter(Boolean)).size;
  const totalAmount = orders.reduce((sum, o) => sum + parseFloat(o.total_amount || 0), 0);

  if (loading && orders.length === 0) {
    return (
      <div style={styles.emptyState}>
        <div style={styles.emptyIcon}>⏳</div>
        <div style={styles.emptyTitle}>Caricamento...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.title}>🚀 Dashboard Tracciamento</div>
        <div style={styles.refreshIcon} onClick={loadActiveOrders}>
          🔄
        </div>
      </div>

      {/* Stats Bar */}
      <div style={styles.statsBar}>
        <div style={styles.statItem}>
          <div style={styles.statIcon}>🏍️</div>
          <div style={styles.statValue}>{activeRidersCount}</div>
          <div style={styles.statLabel}>Rider Attivi</div>
        </div>
        <div style={styles.statItem}>
          <div style={styles.statIcon}>📦</div>
          <div style={styles.statValue}>{activeOrdersCount}</div>
          <div style={styles.statLabel}>In Consegna</div>
        </div>
        <div style={styles.statItem}>
          <div style={styles.statIcon}>💰</div>
          <div style={styles.statValue}>€{totalAmount.toFixed(0)}</div>
          <div style={styles.statLabel}>Totale</div>
        </div>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>📭</div>
          <div style={styles.emptyTitle}>Nessun ordine attivo</div>
          <div style={styles.emptyText}>Non ci sono ordini in consegna al momento</div>
        </div>
      ) : (
        <div style={styles.listContainer}>
          {orders.map(item => (
            <div
              key={item.id}
              style={{
                ...styles.orderCard,
                borderLeftColor: getStatusColor(item.status),
              }}
            >
              {/* Card Header */}
              <div style={styles.cardHeader}>
                <div style={styles.statusBadge}>{getStatusIcon(item.status)}</div>
                <div style={{ flex: 1 }}>
                  <div style={styles.orderId}>Ordine #{item.id}</div>
                  <div style={styles.riderInfo}>
                    👤 Rider: {item.rider_name || `#${item.rider_id || '--'}`}
                  </div>
                </div>
                <div
                  style={{
                    paddingLeft: '8px',
                    paddingRight: '8px',
                    paddingTop: '4px',
                    paddingBottom: '4px',
                    borderRadius: '6px',
                    backgroundColor: getStatusColor(item.status) + '20',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    color: getStatusColor(item.status),
                  }}
                >
                  {getStatusText(item.status)}
                </div>
              </div>

              {/* Metrics Row */}
              <div style={styles.metricsRow}>
                <div>
                  <div style={styles.metricLabel}>ETA</div>
                  <div style={styles.metricValue}>{item.eta_minutes || '--'} min</div>
                </div>
                <div>
                  <div style={styles.metricLabel}>Importo</div>
                  <div style={styles.metricValue}>
                    €{parseFloat(item.total_amount || 0).toFixed(2)}
                  </div>
                </div>
                <div>
                  <div style={styles.metricLabel}>Posizione</div>
                  <div style={styles.metricValue}>
                    {item.rider_latitude
                      ? `${parseFloat(item.rider_latitude).toFixed(4)}, ${parseFloat(item.rider_longitude).toFixed(4)}`
                      : '---'}
                  </div>
                </div>
              </div>

              {/* Info Section */}
              <div style={styles.infoSection}>
                <div style={styles.infoPair}>
                  <div style={styles.infoLabel}>👤 Cliente:</div>
                  <div style={styles.infoValue}>{item.customer_name || `ID#${item.user_id}`}</div>
                </div>
                <div style={styles.infoPair}>
                  <div style={styles.infoLabel}>📍 Consegna:</div>
                  <div style={styles.infoValue}>
                    {item.delivery_address?.substring(0, 60) || 'Indirizzo non disponibile'}
                  </div>
                </div>
              </div>

              {/* Timeline */}
              {item.received_at && (
                <div
                  style={{
                    padding: '10px',
                    backgroundColor: '#fef3c7',
                    borderTop: '1px solid #fde68a',
                    marginTop: '10px',
                    borderRadius: '4px',
                  }}
                >
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#92400e' }}>
                    Accettato:{' '}
                    {new Date(item.received_at).toLocaleTimeString('it-IT', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              )}
              <div style={{ marginTop: '10px' }}>
                <button onClick={() => openTrack(item.id)}>Mostra storico tracciamento</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedTrack && (
        <div style={{ marginTop: 20 }}>
          <h3>Storico tracciamento ordine #{selectedTrack.orderId}</h3>
          <div style={{ height: 400 }}>
            <MapContainer
              center={selectedTrack.poly[0] || [45.0, 9.0]}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Polyline positions={selectedTrack.poly} color="#ef4444" />
              {selectedTrack.poly.map((p, idx) => (
                <Marker key={idx} position={p}></Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      )}
    </div>
  );
}
