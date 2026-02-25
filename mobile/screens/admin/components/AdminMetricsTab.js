import React from 'react';
import { View, FlatList, RefreshControl, Text } from 'react-native';
import { AdminDashboardScreenStyles as styles } from '../styles/AdminDashboardScreenStyles';

const AdminMetricsTab = ({ metrics, loading: _loading, refreshing, onRefresh, StatCard }) => {
  return (
    <FlatList
      data={[]}
      keyExtractor={(item, index) => index.toString()}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      ListHeaderComponent={() => (
        <View>
          {metrics ? (
            <View>
              <Text style={styles.welcome}>📈 Metrics</Text>
              <StatCard label="Pharmacy Orders" value={metrics.pharmacy?.total_orders || 0} />
              <StatCard
                label="Medical Transports"
                value={metrics.medicalTransports?.total_transports || 0}
              />
              <StatCard
                label="Document Pickups"
                value={metrics.documentPickups?.total_pickups || 0}
              />
              <StatCard label="Bills" value={metrics.bills?.total_bills || 0} />
            </View>
          ) : null}
        </View>
      )}
      renderItem={() => null}
    />
  );
};

export default AdminMetricsTab;
