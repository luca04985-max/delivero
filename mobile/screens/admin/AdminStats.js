import React, { useState, useEffect } from 'react';
import { View, RefreshControl, Text, ScrollView, ActivityIndicator } from 'react-native';
import { adminAPI } from '../../services/api';
import { adminStatsStyles as styles } from './styles/AdminStatsStyles';
import { mobileTheme } from '../../theme';

export default function AdminStats({ navigation: _navigation }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    try {
      const data = await adminAPI.getStats();
      setStats(data);
    } catch (e) {
      console.error('Error loading stats:', e);
      // Non mostriamo l'errore all'utente per non bloccare l'uso
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchStats();
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Text style={styles.title}>📊 Statistiche</Text>
        <Text style={styles.subtitle}>Statistiche complete del sistema</Text>
      </View>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.container}>
        {renderHeader()}
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={mobileTheme.colors.secondary} />
          <Text style={styles.loadingText}>Caricamento statistiche...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderHeader()}

      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        style={styles.content}
      >
        {stats ? (
          <View>
            {/* Users Stats */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>👥 Utenti</Text>
              <Text style={styles.sectionValue}>{stats.totalUsers || 0}</Text>
              <Text style={styles.sectionSubtext}>Utenti totali registrati</Text>
              <Text style={styles.sectionSubtext}>Nuovi oggi: {stats.newUsersToday || 0}</Text>
            </View>

            {/* Orders Stats */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>📦 Ordini</Text>
              <Text style={styles.sectionValue}>{stats.totalOrders || 0}</Text>
              <Text style={styles.sectionSubtext}>Ordini totali</Text>
              <Text style={styles.sectionSubtext}>Oggi: {stats.ordersToday || 0}</Text>
            </View>

            {/* Revenue Stats */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>💰 Incasso</Text>
              <Text style={styles.sectionValue}>€{Number(stats.totalRevenue || 0).toFixed(2)}</Text>
              <Text style={styles.sectionSubtext}>Incasso totale</Text>
              <Text style={styles.sectionSubtext}>
                Oggi: €{Number(stats.revenueToday || 0).toFixed(2)}
              </Text>
            </View>

            {/* Active Services */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🚚 Servizi Attivi</Text>
              <Text style={styles.sectionValue}>{stats.activeServices || 0}</Text>
              <Text style={styles.sectionSubtext}>Servizi attualmente attivi</Text>
              <Text style={styles.sectionSubtext}>Rider attivi: {stats.activeRiders || 0}</Text>
            </View>

            {/* Tickets Stats */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🎫 Ticket</Text>
              <Text style={styles.sectionValue}>{stats.totalTickets || 0}</Text>
              <Text style={styles.sectionSubtext}>Ticket totali</Text>
              <Text style={styles.sectionSubtext}>Aperti: {stats.openTickets || 0}</Text>
            </View>

            {/* Performance Stats */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>⚡ Performance</Text>
              <Text style={styles.sectionValue}>{stats.avgDeliveryTime || 'N/A'} min</Text>
              <Text style={styles.sectionSubtext}>Tempo medio consegna</Text>
              <Text style={styles.sectionSubtext}>
                Tasso successo: {stats.successRate || 'N/A'}%
              </Text>
            </View>

            {/* System Health */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🔧 Sistema</Text>
              <Text style={styles.sectionValue}>{stats.systemHealth || 'Good'}</Text>
              <Text style={styles.sectionSubtext}>Stato sistema</Text>
              <Text style={styles.sectionSubtext}>Uptime: {stats.uptime || 'N/A'}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nessuna statistica disponibile</Text>
            <Text style={styles.emptySubtext}>Le statistiche non sono disponibili</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
