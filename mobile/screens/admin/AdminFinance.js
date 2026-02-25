import React, { useState, useEffect } from 'react';
import { View, RefreshControl, Text, ScrollView, ActivityIndicator } from 'react-native';
import { adminAPI } from '../../services/api';
import { adminFinanceStyles as styles } from './styles/AdminFinanceStyles';

export default function AdminFinance({ navigation: _navigation }) {
  const [finance, setFinance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchFinance = async () => {
    try {
      const data = await adminAPI.getFinanceReport();
      setFinance(data);
    } catch (e) {
      console.error('Error loading finance:', e);
      // Non mostriamo l'errore all'utente per non bloccare l'uso
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFinance();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchFinance();
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Text style={styles.title}>💰 Finance</Text>
        <Text style={styles.subtitle}>Report finanziario completo</Text>
      </View>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.container}>
        {renderHeader()}
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B00" />
          <Text style={styles.loadingText}>Caricamento dati finanziari...</Text>
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
        {finance ? (
          <View>
            <Text style={styles.welcome}>💰 Finance Report</Text>

            {/* Revenue Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Incasso Totale</Text>
              <Text style={styles.sectionValue}>
                €{Number(finance.totalRevenue || 0).toFixed(2)}
              </Text>
              <Text style={styles.sectionSubtext}>Periodo: {finance.period || 'N/D'}</Text>
            </View>

            {/* Orders Revenue Breakdown */}
            {finance.ordersRevenue && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Incasso Ordini</Text>
                <Text style={styles.sectionValue}>
                  €{Number(finance.ordersRevenue || 0).toFixed(2)}
                </Text>
                <Text style={styles.sectionSubtext}>Ordini completati</Text>
              </View>
            )}

            {/* Service Revenue */}
            {finance.serviceRevenue && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Incasso Servizi</Text>
                <Text style={styles.sectionValue}>
                  €{Number(finance.serviceRevenue || 0).toFixed(2)}
                </Text>
                <Text style={styles.sectionSubtext}>Servizi aggiuntivi</Text>
              </View>
            )}

            {/* Monthly Stats */}
            {finance.monthlyStats && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Statistiche Mensili</Text>
                {Object.entries(finance.monthlyStats).map(([month, data]) => (
                  <View key={month} style={styles.monthlyStat}>
                    <Text style={styles.monthLabel}>{month}</Text>
                    <Text style={styles.monthValue}>€{Number(data.revenue || 0).toFixed(2)}</Text>
                    <Text style={styles.monthOrders}>{data.orders || 0} ordini</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nessun dato finanziario</Text>
            <Text style={styles.emptySubtext}>I dati finanziari non sono disponibili</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
