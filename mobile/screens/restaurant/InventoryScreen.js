import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { mobileTheme } from '../../theme';
import { inventoryAPI } from '../../services/api';
import logger from '../../utils/logger';

export default function InventoryScreen({ route, navigation }) {
  const restaurantId = route?.params?.restaurantId || 1;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const data = await inventoryAPI.listItems(restaurantId);
      setItems(data);
    } catch (e) {
      logger.error('Failed to load inventory', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [restaurantId]);

  const toggle = async item => {
    try {
      await inventoryAPI.setAvailability(item.id, !item.is_available);
      load();
    } catch (e) {
      logger.error('Failed to toggle availability', e);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <View style={styles.info}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.sub}>€{parseFloat(item.price).toFixed(2)} • prep {item.preparation_time_minutes}m</Text>
      </View>
      <TouchableOpacity style={[styles.btn, item.is_available ? styles.btnOn : styles.btnOff]} onPress={() => toggle(item)}>
        <Text style={item.is_available ? styles.btnTextOn : styles.btnTextOff}>{item.is_available ? 'Disponibile' : 'Non disponibile'}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Inventory - Restaurant #{restaurantId}</Text>
      {loading ? (
        <ActivityIndicator color={mobileTheme.colors.primary} />
      ) : (
        <FlatList data={items} keyExtractor={i => String(i.id)} renderItem={renderItem} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: mobileTheme.spacing[4] },
  headerTitle: { fontSize: mobileTheme.typography.fontSize.lg, fontWeight: mobileTheme.typography.fontWeight.bold, marginBottom: mobileTheme.spacing[3] },
  row: { flexDirection: 'row', alignItems: 'center', padding: mobileTheme.spacing[3], borderBottomWidth: 1, borderColor: mobileTheme.colors.border },
  title: { fontSize: mobileTheme.typography.fontSize.base, fontWeight: mobileTheme.typography.fontWeight.semibold },
  sub: { fontSize: mobileTheme.typography.fontSize.xs, color: mobileTheme.colors.text.secondary },
  btn: { paddingVertical: mobileTheme.spacing[2], paddingHorizontal: mobileTheme.spacing[3], borderRadius: mobileTheme.borderRadius.sm },
  btnOn: { backgroundColor: mobileTheme.colors.success },
  btnOff: { backgroundColor: mobileTheme.colors.background },
  btnTextOn: { color: mobileTheme.colors.white, fontWeight: mobileTheme.typography.fontWeight.semibold },
  btnTextOff: { color: mobileTheme.colors.text.primary, fontWeight: mobileTheme.typography.fontWeight.semibold },
  info: { flex: 1 },
});
