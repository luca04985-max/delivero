import React from 'react';
import { View, FlatList, RefreshControl, Text } from 'react-native';
import { AdminDashboardScreenStyles as styles } from '../styles/AdminDashboardScreenStyles';

const AdminStatsTab = ({ stats, loading: _loading, refreshing, onRefresh, StatCard }) => {
  return (
    <FlatList
      data={[]}
      keyExtractor={(item, index) => index.toString()}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      ListHeaderComponent={() => (
        <View>
          {stats ? (
            <View>
              <Text style={styles.welcome}>📊 Dashboard Statistiche</Text>
              <StatCard label="Utenti" value={stats.totalUsers} />
              <StatCard label="Ordini" value={stats.totalOrders} />
              <StatCard label="Incasso" value={`€${stats.totalRevenue?.toFixed(2)}`} />
            </View>
          ) : null}
        </View>
      )}
      renderItem={() => null}
    />
  );
};

export default AdminStatsTab;
