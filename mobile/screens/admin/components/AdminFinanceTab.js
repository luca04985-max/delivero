import React from 'react';
import { View, FlatList, RefreshControl, Text } from 'react-native';
import { adminDashboardScreenStyles as styles } from '../styles/AdminDashboardScreenStyles';

const AdminFinanceTab = ({ 
  finance, 
  loading, 
  refreshing, 
  onRefresh,
  StatCard 
}) => {
  return (
    <FlatList
      data={[]}
      keyExtractor={(item, index) => index.toString()}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      ListHeaderComponent={() => (
        <View>
          {finance ? (
            <View>
              <Text style={styles.welcome}>💰 Finance</Text>
              <StatCard label="Incasso" value={`€${Number(finance.totalRevenue || 0).toFixed(2)}`} />
              <StatCard label="Bill Payments" value={finance.billPayments?.total || 0} />
              <StatCard label="Bills Total" value={`€${Number(finance.billPayments?.amount || 0).toFixed(2)}`} />
            </View>
          ) : null}
        </View>
      )}
      renderItem={() => null}
    />
  );
};

export default AdminFinanceTab;
