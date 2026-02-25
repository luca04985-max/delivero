import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Alert,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import { adminAPI } from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { adminDashboardUsersStyles as styles } from './styles/AdminDashboardUsersStyles';

export default function AdminDashboardUsers({ navigation: _navigation }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [newRole, setNewRole] = useState('');
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');

  const toggleSection = section => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const fetchUsers = async () => {
    try {
      const data = await adminAPI.getAllUsers();
      setUsers(Array.isArray(data) ? data : data.data || []);
    } catch (e) {
      Alert.alert('Errore', 'Non ho potuto caricare tutti gli utenti.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const loadCurrentUser = async () => {
    const userStr = await AsyncStorage.getItem('user');
    if (userStr) setCurrentUser(JSON.parse(userStr));
  };

  useEffect(() => {
    loadCurrentUser();
    fetchUsers();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchUsers();
  };

  // Funzione per renderizzare il separatore di ruolo
  const renderRoleSeparator = (role, count, roleInfo, isExpanded) => {
    return (
      <TouchableOpacity
        style={styles.statusSeparator}
        onPress={() => toggleSection(role)}
        activeOpacity={0.7}
      >
        <View style={styles.statusSeparatorContent}>
          <View style={styles.statusSeparatorLeft}>
            <Text style={styles.statusSeparatorIcon}>{roleInfo.icon}</Text>
            <Text style={styles.statusSeparatorTitle}>{roleInfo.label}</Text>
          </View>
          <View style={styles.statusSeparatorRight}>
            <Text style={styles.statusSeparatorCount}>{count}</Text>
            <Text style={styles.statusSeparatorToggle}>{isExpanded ? '🔼' : '🔽'}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Funzione per renderizzare gli utenti con separatori
  const renderUsersWithSeparators = () => {
    const roleGroups = {};

    // Raggruppa gli utenti per ruolo
    users.forEach(user => {
      const role = user.role || 'unknown';
      if (!roleGroups[role]) {
        roleGroups[role] = [];
      }
      roleGroups[role].push(user);
    });

    const roleInfo = {
      customer: { label: 'Clienti', icon: '👤' },
      rider: { label: 'Rider', icon: '🚴' },
      manager: { label: 'Manager', icon: '👨‍💼' },
      admin: { label: 'Admin', icon: '👑' },
    };

    const result = [];

    Object.keys(roleGroups).forEach(role => {
      const groupUsers = roleGroups[role];
      const isExpanded = !!expandedSections[role];

      result.push(
        <View key={`separator-${role}`}>
          {renderRoleSeparator(
            role,
            groupUsers.length,
            roleInfo[role] || { label: role, icon: '👤' },
            isExpanded,
          )}
        </View>,
      );

      if (isExpanded) {
        groupUsers.forEach(user => {
          result.push(<View key={`user-${user.id}`}>{renderUser({ item: user })}</View>);
        });
      }
    });

    return result;
  };

  const renderUser = ({ item }) => {
    const isSelf = currentUser?.id === item.id;
    return (
      <View style={styles.card}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>
          {item.email} - <Text style={{ color: '#FF6B00' }}>{item.role}</Text>
        </Text>

        <View style={styles.userActions}>
          <TouchableOpacity
            onPress={() => {
              setEditingUser(item);
              setEditName(item.name);
              setEditEmail(item.email);
              setNewRole(item.role);
            }}
            style={[styles.btnEdit, isSelf && styles.btnDisabled]}
            disabled={isSelf}
          >
            <Text style={styles.buttonText}>Modifica</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleDeleteUser(item.id)}
            style={[styles.btnDelete, isSelf && styles.btnDisabled]}
            disabled={isSelf}
          >
            <Text style={styles.buttonText}>{isSelf ? "Can't Delete Self" : 'Elimina'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const handleUpdateUserRole = async userId => {
    try {
      setLoading(true);
      await adminAPI.updateUser(userId, { name: editName, email: editEmail, role: newRole });
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      Alert.alert('Errore', err?.message || 'Errore aggiornamento utente');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = userId => {
    if (currentUser?.id && String(currentUser.id) === String(userId)) {
      Alert.alert('Operazione non consentita', 'Non puoi eliminare il tuo account.');
      return;
    }
    Alert.alert('Attenzione', "Eliminare definitivamente l'utente?", [
      { text: 'Annulla', style: 'cancel' },
      {
        text: 'Elimina',
        style: 'destructive',
        onPress: async () => {
          await adminAPI.deleteUser(userId);
          fetchUsers();
        },
      },
    ]);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Text style={styles.title}>Tutti gli Utenti</Text>
        <Text style={styles.subtitle}>Gestione completa utenti</Text>
      </View>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.container}>
        {renderHeader()}
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B00" />
          <Text style={styles.loadingText}>Caricamento utenti...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderHeader()}

      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        style={styles.content}
      >
        {users.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nessun utente trovato</Text>
            <Text style={styles.emptySubtext}>Non ci sono utenti nel sistema</Text>
          </View>
        ) : (
          renderUsersWithSeparators()
        )}
      </ScrollView>

      {/* Modal per modifica utente */}
      <Modal
        visible={!!editingUser}
        transparent
        animationType="fade"
        onRequestClose={() => setEditingUser(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Modifica Utente</Text>

            <View style={styles.editRow}>
              <View style={styles.editField}>
                <Text style={styles.fieldLabel}>Nome:</Text>
                <TextInput style={styles.textInput} value={editName} onChangeText={setEditName} />
              </View>
            </View>

            <View style={styles.editRow}>
              <View style={styles.editField}>
                <Text style={styles.fieldLabel}>Email:</Text>
                <TextInput
                  style={styles.textInput}
                  value={editEmail}
                  onChangeText={setEditEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.editRow}>
              <View style={styles.editField}>
                <Text style={styles.fieldLabel}>Ruolo:</Text>
                <View style={styles.roleButtons}>
                  {['customer', 'rider', 'manager', 'admin'].map(role => (
                    <TouchableOpacity
                      key={role}
                      style={[styles.roleButton, newRole === role && styles.roleButtonSelected]}
                      onPress={() => setNewRole(role)}
                    >
                      <Text
                        style={[
                          styles.roleButtonText,
                          newRole === role && styles.roleButtonTextSelected,
                        ]}
                      >
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>

            <View style={styles.editActions}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => handleUpdateUserRole(editingUser.id)}
                disabled={loading}
              >
                <Text style={styles.btnSaveText}>Salva</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setEditingUser(null)}
                disabled={loading}
              >
                <Text style={styles.btnCancelText}>Annulla</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
