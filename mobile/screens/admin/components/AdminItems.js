import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { AdminDashboardScreenStyles as styles } from '../styles/AdminDashboardScreenStyles';
import { mobileTheme } from '../../../theme';

// Componente per gli utenti
export const UserItem = ({ item, onEdit, onDelete, currentUser }) => {
  const isSelf = currentUser?.id === item.id;
  return (
    <View style={styles.card}>
      <Text style={styles.userName}>{item.name}</Text>
      <Text style={styles.userEmail}>
        {item.email} - <Text style={styles.roleInline}>{item.role}</Text>
      </Text>

      <View style={styles.row}>
        <TouchableOpacity onPress={() => onEdit(item)} style={styles.btnEdit} disabled={isSelf}>
          <Text style={styles.btnText}>Modifica</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onDelete(item.id)}
          style={[styles.btnDelete, isSelf && styles.btnDisabled]}
          disabled={isSelf}
        >
          <Text style={styles.btnText}>{isSelf ? "Can't Delete Self" : 'Elimina'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Componente per le statistiche
export const StatCard = ({ label, value }) => (
  <View style={styles.statCard}>
    <Text style={styles.statValue}>{value || 0}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);
