import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
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
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.sub}>€{parseFloat(item.price).toFixed(2)} • prep {item.preparation_time_minutes}m</Text>
      </View>
      <TouchableOpacity style={[styles.btn, item.is_available ? styles.btnOn : styles.btnOff]} onPress={() => toggle(item)}>
        <Text style={styles.btnText}>{item.is_available ? 'Disponibile' : 'Non disponibile'}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Inventory - Restaurant #{restaurantId}</Text>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList data={items} keyExtractor={i => String(i.id)} renderItem={renderItem} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
  title: { fontSize: 16, fontWeight: '600' },
  sub: { fontSize: 12, color: '#666' },
  btn: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6 },
  btnOn: { backgroundColor: '#4CAF50' },
  btnOff: { backgroundColor: '#E0E0E0' },
  btnText: { color: '#fff', fontWeight: '600' },
});
