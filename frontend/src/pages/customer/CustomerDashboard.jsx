import React, { useState, useEffect } from 'react';
import { ordersAPI } from '../../services/api';
import CreateOrderModal from '../../components/CreateOrderModal';
import CustomerHomeEnhanced from './CustomerHomeEnhanced';
import CustomerOrdersEnhanced from './CustomerOrdersEnhanced';
import adminStyles from '../../styles/adminTheme';
import '../../styles/adminUtilities.css';
import { theme } from '../../theme/theme';

const CATEGORIES = [
  { id: 'food', name: '🍔 Cibo', icon: '🍕', color: theme.colors.primary },
  { id: 'pharmacy', name: '💊 Farmacia', icon: '⚕️', color: theme.colors.success },
  { id: 'groceries', name: '🛒 Spesa', icon: '🥬', color: theme.colors.info },
  { id: 'clothes', name: '👕 Abbigliamento', icon: '👔', color: theme.colors.warning },
  { id: 'electronics', name: '💻 Elettronica', icon: '📱', color: theme.colors.secondary },
  { id: 'books', name: '📚 Libri', icon: '📖', color: theme.colors.manager },
];

export default function CustomerDashboard({ user }) {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div style={adminStyles.container} className="u-container">
      {/* Top Navigation Tabs */}
      <div style={{ display: 'flex', gap: '1rem', borderBottom: `2px solid ${theme.colors.border}`, marginBottom: '2rem', paddingBottom: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          onClick={() => setActiveTab('home')}
            style={{
            background: activeTab === 'home' ? theme.colors.primary : 'transparent',
            color: activeTab === 'home' ? theme.colors.white : theme.colors.text.primary,
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '25px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: activeTab === 'home' ? 'bold' : 'normal',
            transition: 'all 0.3s ease',
          }}
        >
          🏠 Home
        </button>
        <button
          onClick={() => setActiveTab('orders')}
            style={{
            background: activeTab === 'orders' ? theme.colors.primary : 'transparent',
            color: activeTab === 'orders' ? theme.colors.white : theme.colors.text.primary,
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '25px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: activeTab === 'orders' ? 'bold' : 'normal',
            transition: 'all 0.3s ease',
          }}
        >
          📦 Ordini
        </button>
        <button
          onClick={() => setActiveTab('favorites')}
            style={{
            background: activeTab === 'favorites' ? theme.colors.primary : 'transparent',
            color: activeTab === 'favorites' ? theme.colors.white : theme.colors.text.primary,
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '25px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: activeTab === 'favorites' ? 'bold' : 'normal',
            transition: 'all 0.3s ease',
          }}
        >
          ❤️ Preferiti
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'home' && <CustomerHomeEnhanced user={user} />}
      {activeTab === 'orders' && <CustomerOrdersEnhanced user={user} />}
      {activeTab === 'favorites' && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p style={{ fontSize: '1.5rem', color: theme.colors.text.secondary }}>
            ❤️ I tuoi preferiti verranno mostrati qui
          </p>
        </div>
      )}
    </div>
  );
}
