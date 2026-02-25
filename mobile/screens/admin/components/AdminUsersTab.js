import React from 'react';
import { View, ScrollView, RefreshControl, Text, TouchableOpacity, Alert } from 'react-native';
import { AdminDashboardScreenStyles as styles } from '../styles/AdminDashboardScreenStyles';

const AdminUsersTab = ({
  users,
  expandedSections,
  toggleSection,
  renderUserRoleSeparator,
  renderUsersWithSeparators,
  loading,
  refreshing,
  onRefresh,
  currentUser,
  onEditUser,
  onDeleteUser,
}) => {
  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      style={styles.content}
    >
      {renderUsersWithSeparators()}
    </ScrollView>
  );
};

export default AdminUsersTab;
