import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { AdminDashboardScreenStyles as styles } from '../styles/AdminDashboardScreenStyles';

const AdminUsersTab = ({
  users: _users,
  expandedSections: _expandedSections,
  toggleSection: _toggleSection,
  renderUserRoleSeparator: _renderUserRoleSeparator,
  renderUsersWithSeparators,
  loading: _loading,
  refreshing,
  onRefresh,
  currentUser: _currentUser,
  onEditUser: _onEditUser,
  onDeleteUser: _onDeleteUser,
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
