import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { unifiedStyles } from '../../theme/UnifiedStyles';
import { mobileTheme } from '../../theme';
import { ordersAPI } from '../../services/api';

const ownerStyles = StyleSheet.create({
  wrapper: { padding: mobileTheme.spacing[4] },
  greetingText: { marginBottom: mobileTheme.spacing[3], color: mobileTheme.colors.text.secondary },
  statsRow: { flexDirection: 'row', gap: mobileTheme.spacing[3], marginBottom: mobileTheme.spacing[3] },
  statCard: {
    flex: 1,
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.md,
    ...mobileTheme.shadows.sm,
  },
  statValue: { fontSize: mobileTheme.typography.fontSize.lg, fontWeight: mobileTheme.typography.fontWeight.bold, color: mobileTheme.colors.text.primary },
  statLabel: { color: mobileTheme.colors.text.secondary },
  primaryButton: { backgroundColor: mobileTheme.colors.primary, paddingVertical: 12, paddingHorizontal: 16, borderRadius: mobileTheme.borderRadius.md, marginBottom: mobileTheme.spacing[3] },
  secondaryButton: { backgroundColor: mobileTheme.colors.secondary, paddingVertical: 12, paddingHorizontal: 16, borderRadius: mobileTheme.borderRadius.md },
  buttonText: { color: mobileTheme.colors.white, fontWeight: mobileTheme.typography.fontWeight.bold, textAlign: 'center' },
});

export default function OwnerDashboard({ navigation, route }) {
  const user = route?.params?.user;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalOrders: 0, pending: 0, revenue: 0 });

  useEffect(() => {
    let mounted = true;
    const fetch = async () => {
      try {
        const data = await ordersAPI.getMyOrders();
        if (!mounted) return;
        const restaurantId = user?.restaurant_id;
        const filtered = restaurantId ? data.filter(o => o.restaurant_id === restaurantId) : data;
        setOrders(filtered || []);
        const total = (filtered || []).length;
        const pending = (filtered || []).filter(o => o.status === 'pending').length;
        const revenue = (filtered || []).reduce((s, o) => s + (parseFloat(o.total_price) || 0), 0);
        setStats({ totalOrders: total, pending, revenue });
      } catch (e) {
        // silent
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetch();
    return () => {
      mounted = false;
    };
  }, [user]);

  return (
    <View style={unifiedStyles.container}>
      <View style={ownerStyles.wrapper}>
        <Text style={[unifiedStyles.titleCard]}>Pannello Ristoratore</Text>
        <Text style={ownerStyles.greetingText}>
          Benvenuto {user?.name || 'Ristoratore'} — gestisci menu e ordini dal tuo pannello.
        </Text>

        {loading ? (
          <ActivityIndicator size="small" color={mobileTheme.colors.primary} />
        ) : (
          <View style={ownerStyles.statsRow}>
            <View style={ownerStyles.statCard}>
              <Text style={ownerStyles.statValue}>{stats.totalOrders}</Text>
              <Text style={ownerStyles.statLabel}>Ordini Totali</Text>
            </View>
            <View style={ownerStyles.statCard}>
              <Text style={ownerStyles.statValue}>{stats.pending}</Text>
              <Text style={ownerStyles.statLabel}>In Attesa</Text>
            </View>
            <View style={ownerStyles.statCard}>
              <Text style={ownerStyles.statValue}>€{stats.revenue.toFixed(2)}</Text>
              <Text style={ownerStyles.statLabel}>Ricavo</Text>
            </View>
          </View>
        )}

        <TouchableOpacity style={ownerStyles.primaryButton} onPress={() => navigation.navigate('Inventory')}>
          <Text style={ownerStyles.buttonText}>Gestisci Inventory</Text>
        </TouchableOpacity>

        <TouchableOpacity style={ownerStyles.secondaryButton} onPress={() => navigation.navigate('Profile')}>
          <Text style={ownerStyles.buttonText}>Vai al Profilo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
