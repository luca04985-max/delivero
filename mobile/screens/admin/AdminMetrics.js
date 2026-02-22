import React, { useState, useEffect } from 'react';
import { View, FlatList, RefreshControl, Text, ScrollView, ActivityIndicator } from 'react-native';
import { adminAPI } from '../../services/api';
import { adminMetricsStyles as styles } from './styles/AdminMetricsStyles';

export default function AdminMetrics({ navigation }) {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMetrics = async () => {
    try {
      const data = await adminAPI.getServiceMetrics();
      setMetrics(data);
    } catch (e) {
      console.error('Error loading metrics:', e);
      // Non mostriamo l'errore all'utente per non bloccare l'uso
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchMetrics();
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Text style={styles.title}>📈 Metrics</Text>
        <Text style={styles.subtitle}>Metriche di servizio complete</Text>
      </View>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.container}>
        {renderHeader()}
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B00" />
          <Text style={styles.loadingText}>Caricamento metriche...</Text>
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
        {metrics ? (
          <View>
            <Text style={styles.welcome}>📈 Service Metrics</Text>

            {/* Pharmacy Services */}
            {metrics.pharmacy && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>🏥 Servizi Farmacia</Text>
                <Text style={styles.sectionValue}>{metrics.pharmacy.total_orders || 0}</Text>
                <Text style={styles.sectionSubtext}>Ordini farmacia completati</Text>
                <Text style={styles.sectionSubtext}>Incasso: €{Number(metrics.pharmacy.total_revenue || 0).toFixed(2)}</Text>
              </View>
            )}

            {/* Medical Transport Services */}
            {metrics.medicalTransports && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>🚑 Trasporti Medici</Text>
                <Text style={styles.sectionValue}>{metrics.medicalTransports.total_transports || 0}</Text>
                <Text style={styles.sectionSubtext}>Trasporti completati</Text>
                <Text style={styles.sectionSubtext}>Incasso: €{Number(metrics.medicalTransports.total_revenue || 0).toFixed(2)}</Text>
              </View>
            )}

            {/* Document Pickup Services */}
            {metrics.documentPickups && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>📄 Ritiro Documenti</Text>
                <Text style={styles.sectionValue}>{metrics.documentPickups.total_pickups || 0}</Text>
                <Text style={styles.sectionSubtext}>Ritiri completati</Text>
                <Text style={styles.sectionSubtext}>Incasso: €{Number(metrics.documentPickups.total_revenue || 0).toFixed(2)}</Text>
              </View>
            )}

            {/* Bill Management */}
            {metrics.bills && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>🧾 Gestione Bollette</Text>
                <Text style={styles.sectionValue}>{metrics.bills.total_bills || 0}</Text>
                <Text style={styles.sectionSubtext}>Bolle create</Text>
                <Text style={styles.sectionSubtext}>Incasso totale: €{Number(metrics.bills.total_amount || 0).toFixed(2)}</Text>
              </View>
            )}

            {/* Food Delivery */}
            {metrics.foodDelivery && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>🍔️ Consegna Cibo</Text>
                <Text style={styles.sectionValue}>{metrics.foodDelivery.total_orders || 0}</Text>
                <Text style={styles.sectionSubtext}>Ordini cibo completati</Text>
                <Text style={styles.sectionSubtext}>Incasso: €{Number(metrics.foodDelivery.total_revenue || 0).toFixed(2)}</Text>
              </View>
            )}

            {/* Package Delivery */}
            {metrics.packageDelivery && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>📦 Consegna Pacchi</Text>
                <Text style={styles.sectionValue}>{metrics.packageDelivery.total_deliveries || 0}</Text>
                <Text style={styles.sectionSubtext}>Consegne pacchi completate</Text>
                <Text style={styles.sectionSubtext}>Incasso: €{Number(metrics.packageDelivery.total_revenue || 0).toFixed(2)}</Text>
              </View>
            )}

            {/* Performance Metrics */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>⚡ Performance</Text>
              <Text style={styles.sectionValue}>{metrics.performance?.avg_delivery_time || 'N/A'} min</Text>
              <Text style={styles.sectionSubtext}>Tempo medio consegna</Text>
              <Text style={styles.sectionSubtext}>Tasso completamento: {metrics.performance?.completion_rate || 'N/A'}%</Text>
            </View>

            {/* User Activity */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>👥 Attività Utenti</Text>
              <Text style={styles.sectionValue}>{metrics.users?.active_users || 0}</Text>
              <Text style={styles.sectionSubtext}>Utenti attivi oggi</Text>
              <Text style={styles.sectionSubtext}>Nuovi utenti: {metrics.users?.new_users || 0}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nessuna metrica disponibile</Text>
            <Text style={styles.emptySubtext}>Le metriche di servizio non sono disponibili</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
