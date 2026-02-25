import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { profileScreenStyles } from './styles/ProfileScreenStyles';

export default function ProfileScreen({ navigation, user, onLogout }) {
  const role = user?.role || 'customer';
  const isCustomer = role === 'customer';
  const isRider = role === 'rider';
  const isRestaurant = role === 'restaurant';

  return (
    <ScrollView style={profileScreenStyles.container} contentContainerStyle={profileScreenStyles.content}>
      <View style={profileScreenStyles.headerCard}>
        <Text style={profileScreenStyles.headerTitle}>👤 Profilo</Text>
        <Text style={profileScreenStyles.headerSubtitle}>{user?.name || 'Utente'}</Text>
        {!!user?.email && <Text style={profileScreenStyles.headerMeta}>{user.email}</Text>}
      </View>

      {isCustomer && (
        <View style={profileScreenStyles.sectionCard}>
          <Text style={profileScreenStyles.sectionTitle}>Area Cliente</Text>
          <TouchableOpacity
            style={profileScreenStyles.actionRow}
            onPress={() => navigation.navigate('CustomerTabs', { screen: 'Orders' })}
          >
            <Text style={profileScreenStyles.actionLabel}>I miei ordini</Text>
            <Text style={profileScreenStyles.actionIcon}>📦</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={profileScreenStyles.actionRow}
            onPress={() => navigation.navigate('CustomerTickets')}
          >
            <Text style={profileScreenStyles.actionLabel}>I miei ticket</Text>
            <Text style={profileScreenStyles.actionIcon}>🎫</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={profileScreenStyles.actionRow}
            onPress={() => navigation.navigate('PaymentMethods')}
          >
            <Text style={profileScreenStyles.actionLabel}>Metodi di pagamento</Text>
            <Text style={profileScreenStyles.actionIcon}>💳</Text>
          </TouchableOpacity>
        </View>
      )}

      {isRider && (
        <View style={profileScreenStyles.sectionCard}>
          <Text style={profileScreenStyles.sectionTitle}>Area Rider</Text>
          <TouchableOpacity
            style={profileScreenStyles.actionRow}
            onPress={() => navigation.navigate('RiderTickets')}
          >
            <Text style={profileScreenStyles.actionLabel}>I miei ticket</Text>
            <Text style={profileScreenStyles.actionIcon}>🎫</Text>
          </TouchableOpacity>
        </View>
      )}

      {isRestaurant && (
        <View style={profileScreenStyles.sectionCard}>
          <Text style={profileScreenStyles.sectionTitle}>Area Ristoratore</Text>
          <TouchableOpacity
            style={profileScreenStyles.actionRow}
            onPress={() => navigation.navigate('Inventory')}
          >
            <Text style={profileScreenStyles.actionLabel}>Gestisci Inventory</Text>
            <Text style={profileScreenStyles.actionIcon}>🍽️</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={profileScreenStyles.sectionCard}>
        <Text style={profileScreenStyles.sectionTitle}>Informazioni personali</Text>
        <View style={profileScreenStyles.infoRow}>
          <Text style={profileScreenStyles.infoLabel}>Nome</Text>
          <Text style={profileScreenStyles.infoValue}>{user?.name || '-'}</Text>
        </View>
        <View style={profileScreenStyles.infoRow}>
          <Text style={profileScreenStyles.infoLabel}>Email</Text>
          <Text style={profileScreenStyles.infoValue}>{user?.email || '-'}</Text>
        </View>
        <View style={profileScreenStyles.infoRow}>
          <Text style={profileScreenStyles.infoLabel}>Ruolo</Text>
          <Text style={profileScreenStyles.infoValue}>{role}</Text>
        </View>
      </View>

      <TouchableOpacity style={profileScreenStyles.logoutButton} onPress={onLogout}>
        <Text style={profileScreenStyles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
