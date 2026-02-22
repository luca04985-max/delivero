import React, { Modal, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  ActivityIndicator, Alert, RefreshControl
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AdminDashboardScreenStyles as styles } from './styles/AdminDashboardScreenStyles';

// Import all the separate screen components
import AdminStats from './AdminStats';
import AdminFinance from './AdminFinance';
import AdminMetrics from './AdminMetrics';
import AdminDashboardOrders from './AdminDashboardOrders';
import AdminDashboardTickets from './AdminDashboardTickets';
import AdminDashboardUsers from './AdminDashboardUsers';

export default function AdminDashboardScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('stats');
  const [currentUser, setCurrentUser] = useState(null);

  const loadCurrentUser = async () => {
    const userStr = await AsyncStorage.getItem('user');
    if (userStr) setCurrentUser(JSON.parse(userStr));
  };

  React.useEffect(() => {
    loadCurrentUser();
  }, []);

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Text style={styles.title}>👑 Admin Dashboard</Text>
        <Text style={styles.subtitle}>Gestione completa sistema</Text>
      </View>
    </View>
  );

  const renderTabBar = () => (
    <View style={styles.tabBar}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabBarContent}
      >
        {[
          { key: 'stats', label: 'Stats', icon: '📊' },
          { key: 'users', label: 'Users', icon: '👥' },
          { key: 'orders', label: 'Orders', icon: '📦' },
          { key: 'tickets', label: 'Tickets', icon: '🎫' },
          { key: 'finance', label: 'Finance', icon: '💰' },
          { key: 'metrics', label: 'Metrics', icon: '📈' }
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.activeTab]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text style={[styles.tabText, activeTab === tab.key && styles.activeTabText]}>
              {tab.icon} {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderContent = () => {
    const commonProps = { navigation };

    switch (activeTab) {
      case 'stats':
        return <AdminStats {...commonProps} />;
      case 'users':
        return <AdminDashboardUsers {...commonProps} />;
      case 'orders':
        return <AdminDashboardOrders {...commonProps} />;
      case 'tickets':
        return <AdminDashboardTickets {...commonProps} />;
      case 'finance':
        return <AdminFinance {...commonProps} />;
      case 'metrics':
        return <AdminMetrics {...commonProps} />;
      default:
        return <AdminStats {...commonProps} />;
    }
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderTabBar()}
      <View style={styles.content}>
        {renderContent()}
      </View>
    </View>
  );
}
