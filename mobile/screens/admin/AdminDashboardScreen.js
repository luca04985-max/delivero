import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  ActivityIndicator, Alert, Platform, RefreshControl, TextInput, Modal, ScrollView
} from 'react-native';
import { adminAPI, ordersAPI } from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

export default function AdminDashboardScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('stats');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Data States
  const [stats, setStats] = useState(null);
  const [finance, setFinance] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [trackingOrders] = useState([]);
  const [expandedStates, setExpandedStates] = useState(new Set(['IN_TRANSIT']));

  // Edit States
  const [editingUser, setEditingUser] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    if (!editingUser) return;
    setEditName(editingUser?.name || "");
    setEditEmail(editingUser?.email || "");
    setNewRole(editingUser?.role || "customer");
  }, [editingUser]);

  useEffect(() => {
    loadCurrentUser();
    loadDashboardData();
  }, [activeTab]);

  const loadCurrentUser = async () => {
    const userStr = await AsyncStorage.getItem('user');
    if (userStr) setCurrentUser(JSON.parse(userStr));
  };

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      if (activeTab === 'stats') {
        const data = await adminAPI.getStats();
        setStats(data);
      } else if (activeTab === 'users') {
        const data = await adminAPI.getAllUsers();
        setUsers(Array.isArray(data) ? data : data.data || []);
      } else if (activeTab === 'orders') {
        const data = await adminAPI.getAllOrders();
        setOrders(Array.isArray(data) ? data : data.data || []);
      } else if (activeTab === 'tickets') {
        const data = await adminAPI.getAdminTickets();
        setTickets(Array.isArray(data) ? data : data.data || []);
      } else if (activeTab === 'finance') {
        const data = await adminAPI.getFinanceReport();
        setFinance(data);
      } else if (activeTab === 'metrics') {
        const data = await adminAPI.getServiceMetrics();
        setMetrics(data);
      }
    } catch (err) {
      setError("Errore nel caricamento dati: " + err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const renderHeader = () => (
    <View style={styles.tabBar}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabBarContent}
      >
        {['stats', 'users', 'orders', 'tickets', 'finance', 'metrics'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const onRefresh = () => {
    setRefreshing(true);
    loadDashboardData();
  };
  const toggleStateExpansion = (status) => {
    setExpandedStates(prev => {
      const next = new Set(prev);
      if (next.has(status)) {
        next.delete(status);
      } else {
        next.add(status);
      }
      return next;
    });
  };
  const handleUpdateUserRole = async (userId) => {
    try {
      setLoading(true);
      await adminAPI.updateUser(userId, { name: editName, email: editEmail, role: newRole });
      setSuccess('Utente aggiornato');
      setEditingUser(null);
      loadDashboardData();
    } catch (err) {
      setError(err?.message || 'Errore aggiornamento utente');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = (userId) => {
    if (currentUser?.id && String(currentUser.id) === String(userId)) {
      Alert.alert('Operazione non consentita', 'Non puoi eliminare il tuo account.');
      return;
    }
    Alert.alert("Attenzione", "Eliminare definitivamente l'utente?", [
      { text: "Annulla", style: "cancel" },
      {
        text: "Elimina", style: "destructive", onPress: async () => {
          await adminAPI.deleteUser(userId);
          loadDashboardData();
        }
      }
    ]);
  };

  return (
    <View style={styles.container}>
      {renderHeader()}

      <View style={styles.content}>
        {error && <Text style={styles.errorBanner}>{error}</Text>}
        {success && <Text style={styles.successBanner}>{success}</Text>}

        {loading && !refreshing ? (
          <ActivityIndicator size="large" color="#FF6B00" style={{ marginTop: 50 }} />
        ) : (
          <FlatList
            data={activeTab === 'users' ? users : activeTab === 'orders' ? orders : activeTab === 'tickets' ? tickets : activeTab === 'tracking' ? trackingOrders : []}
            keyExtractor={(item) => item.id.toString()}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            ListHeaderComponent={() => (
              <View>
                {activeTab === 'stats' && stats ? (
                  <View>
                    <Text style={styles.welcome}>📊 Dashboard Statistiche</Text>
                    <StatCard label="Utenti" value={stats.totalUsers} />
                    <StatCard label="Ordini" value={stats.totalOrders} />
                    <StatCard label="Incasso" value={`€${stats.totalRevenue?.toFixed(2)}`} />
                  </View>
                ) : null}

                {activeTab === 'finance' && finance ? (
                  <View>
                    <Text style={styles.welcome}>💰 Finance</Text>
                    <StatCard label="Incasso" value={`€${Number(finance.totalRevenue || 0).toFixed(2)}`} />
                    <StatCard label="Bill Payments" value={finance.billPayments?.total || 0} />
                    <StatCard label="Bills Total" value={`€${Number(finance.billPayments?.amount || 0).toFixed(2)}`} />
                  </View>
                ) : null}

                {activeTab === 'metrics' && metrics ? (
                  <View>
                    <Text style={styles.welcome}>📈 Metrics</Text>
                    <StatCard label="Pharmacy Orders" value={metrics.pharmacy?.total_orders || 0} />
                    <StatCard label="Medical Transports" value={metrics.medicalTransports?.total_transports || 0} />
                    <StatCard label="Document Pickups" value={metrics.documentPickups?.total_pickups || 0} />
                    <StatCard label="Bills" value={metrics.bills?.total_bills || 0} />
                  </View>
                ) : null}
              </View>
            )}
            renderItem={({ item, index }) => {
              if (activeTab === 'users') return <UserItem item={item} onEdit={(item) => { setEditingUser(item); setEditName(item.name); setEditEmail(item.email); setNewRole(item.role); }} onDelete={handleDeleteUser} currentUser={currentUser} />;
              if (activeTab === 'orders') {
                const currentItem = orders[index];
                const previousItem = index > 0 ? orders[index - 1] : null;
                const isFirstItem = index === 0;

                const currentStatus = String(currentItem.status || '').toUpperCase();
                const previousStatus = previousItem ? String(previousItem.status || '').toUpperCase() : null;

                const showSeparator = isFirstItem || (previousStatus !== currentStatus);
                const isExpanded = expandedStates.has(currentStatus);

                return (
                  <View>
                    {showSeparator && (
                      <TouchableOpacity
                        style={styles.statusSeparator}
                        onPress={() => toggleStateExpansion(currentStatus)}
                        activeOpacity={0.7}
                      >
                        <Text style={styles.separatorText}>
                          {currentStatus} {isExpanded ? ' ▲' : ' ▼'}
                        </Text>
                      </TouchableOpacity>
                    )}

                    {/* Mostra l'item solo se la categoria è espansa */}
                    {isExpanded && (
                      <OrderItem item={item} navigation={navigation} />
                    )}
                  </View>
                );
              }
              if (activeTab === 'tickets') return <TicketItem item={item} onPress={() => {
                console.log('Ticket cliccato:', item);
                setSelectedTicket(item);
                console.log('selectedTicket impostato:', item);
              }} />;
              return null;
            }}
          />
        )}

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
                  <TextInput
                    style={styles.textInput}
                    value={editName}
                    onChangeText={setEditName}
                  />
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
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={newRole}
                      onValueChange={(value) => setNewRole(value)}
                      dropdownIconColor="#333"
                    >
                      <Picker.Item label="Customer" value="customer" />
                      <Picker.Item label="Rider" value="rider" />
                      <Picker.Item label="Manager" value="manager" />
                      <Picker.Item label="Admin" value="admin" />
                    </Picker>
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

        {/* Modal per dettagli ticket */}
        <Modal
          visible={!!selectedTicket}
          transparent
          animationType="fade"
          onRequestClose={() => setSelectedTicket(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <View style={styles.ticketHeader}>
                <Text style={styles.ticketId}>#{selectedTicket?.id}</Text>
                <Text style={styles.modalTitle}>Dettagli Ticket</Text>
              </View>

              {!selectedTicket ? (
                <View style={styles.editField}>
                  <Text style={styles.textInput}>Nessun ticket selezionato</Text>
                </View>
              ) : (
                <ScrollView style={{ maxHeight: 400 }}>
                  <View style={styles.infoSection}>
                    <Text style={styles.sectionTitle}>Informazioni Generali</Text>

                    <View style={styles.fieldRow}>
                      <Text style={styles.fieldLabel}>Titolo:</Text>
                      <Text style={styles.fieldValue}>{selectedTicket?.title || '—'}</Text>
                    </View>

                    <View style={styles.fieldRow}>
                      <Text style={styles.fieldLabel}>Descrizione:</Text>
                      <Text style={styles.fieldValue}>{selectedTicket?.description || '—'}</Text>
                    </View>

                    <View style={styles.fieldRow}>
                      <Text style={styles.fieldLabel}>Tipo:</Text>
                      <View style={[styles.priorityBadge, { backgroundColor: selectedTicket?.type === 'bug' ? '#dc3545' : selectedTicket?.type === 'complaint' ? '#ffc107' : '#17a2b8' }]}>
                        <Text style={styles.priorityText}>{selectedTicket?.type?.toUpperCase() || '—'}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.infoSection}>
                    <Text style={styles.sectionTitle}>Stato e Priorità</Text>

                    <View style={styles.fieldRow}>
                      <Text style={styles.fieldLabel}>Stato:</Text>
                      <View style={[styles.priorityBadge, { backgroundColor: selectedTicket?.status === 'open' ? '#28a745' : selectedTicket?.status === 'resolved' ? '#17a2b8' : '#ffc107' }]}>
                        <Text style={styles.priorityText}>{selectedTicket?.status?.toUpperCase() || '—'}</Text>
                      </View>
                    </View>

                    <View style={styles.fieldRow}>
                      <Text style={styles.fieldLabel}>Priorità:</Text>
                      <View style={[styles.priorityBadge, { backgroundColor: selectedTicket?.priority === 'high' ? '#dc3545' : selectedTicket?.priority === 'medium' ? '#ffc107' : '#6c757d' }]}>
                        <Text style={styles.priorityText}>{selectedTicket?.priority?.toUpperCase() || '—'}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.infoSection}>
                    <Text style={styles.sectionTitle}>Informazioni Utente</Text>

                    <View style={styles.fieldRow}>
                      <Text style={styles.fieldLabel}>Utente:</Text>
                      <Text style={styles.fieldValue}>{selectedTicket?.user_name || '—'}</Text>
                    </View>

                    <View style={styles.fieldRow}>
                      <Text style={styles.fieldLabel}>Email:</Text>
                      <Text style={styles.fieldValue}>{selectedTicket?.user_email || '—'}</Text>
                    </View>
                  </View>

                  <View style={styles.infoSection}>
                    <Text style={styles.sectionTitle}>Date</Text>

                    <View style={styles.fieldRow}>
                      <Text style={styles.fieldLabel}>Creato:</Text>
                      <Text style={styles.fieldValue}>{selectedTicket?.created_at ? new Date(selectedTicket.created_at).toLocaleString() : '—'}</Text>
                    </View>

                    <View style={styles.fieldRow}>
                      <Text style={styles.fieldLabel}>Aggiornato:</Text>
                      <Text style={styles.fieldValue}>{selectedTicket?.updated_at ? new Date(selectedTicket.updated_at).toLocaleString() : '—'}</Text>
                    </View>
                  </View>
                </ScrollView>
              )}

              <View style={styles.editActions}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setSelectedTicket(null)}
                >
                  <Text style={styles.btnCancelText}>Chiudi</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

// Sub-components per pulizia codice
const StatCard = ({ label, value }) => (
  <View style={styles.statCard}>
    <Text style={styles.statValue}>{value || 0}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const UserItem = ({ item, onEdit, onDelete, currentUser }) => {
  const isSelf = currentUser?.id === item.id;
  return (
    <View style={styles.card}>
      <Text style={styles.userName}>{item.name}</Text>
      <Text style={styles.userEmail}>{item.email} - <Text style={{ color: '#FF6B00' }}>{item.role}</Text></Text>

      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => onEdit(item)}
          style={styles.btnEdit}
          disabled={isSelf}
        >
          <Text style={styles.btnText}>Modifica</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onDelete(item.id)}
          style={[styles.btnDelete, isSelf && styles.btnDisabled]}
          disabled={isSelf}
        >
          <Text style={styles.btnText}>{isSelf ? "Can't Delete Self" : "Elimina"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const OrderItem = ({ item, navigation }) => {
  const isDelivered = String(item.status || '').toUpperCase() === 'DELIVERED';

  return (
    <View style={[styles.card, isDelivered && styles.deliveredCard]}>
      <Text style={styles.orderId}>Ordine #{item.id}</Text>
      <Text style={styles.userEmail}>Cliente: {item.customer_name || '—'}</Text>
      <Text style={styles.userEmail}>Rider: {item.rider_name || '—'}</Text>
      <Text style={styles.userEmail}>Indirizzo: {item.delivery_address || '—'}</Text>
      <Text style={styles.userEmail}>Stato: <Text style={[{ color: '#FF6B00' }, isDelivered && styles.deliveredStatus]}>{String(item.status || '').toUpperCase()}</Text></Text>
      <Text style={styles.userEmail}>ETA: {item.eta_minutes != null ? `${item.eta_minutes} min` : '—'}</Text>
      <Text style={styles.userEmail}>Totale: €{item.total_amount != null ? Number(item.total_amount).toFixed(2) : '0.00'}</Text>
      {!isDelivered && (
        <TouchableOpacity style={styles.trackBtn} onPress={() => navigation.navigate('OrderTracking', { orderId: item.id })}>
          <Text style={styles.trackBtnText}>Traccia</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const TicketItem = ({ item, onPress }) => {
  const handlePress = () => {
    console.log('Ticket cliccato:', item);
    if (onPress) {
      onPress(item);
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Text style={styles.userName}>{item.title}</Text>
      <Text style={styles.userEmail}>{item.description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  tabBar: { backgroundColor: '#1a1a2e', paddingTop: 40, paddingBottom: 10 },
  tabBarContent: { paddingHorizontal: 8 },
  tab: { alignItems: 'center', paddingVertical: 10, paddingHorizontal: 14, minWidth: 90 },
  activeTab: { borderBottomWidth: 3, borderBottomColor: '#FF6B00' },
  tabText: { color: '#888', fontSize: 10, fontWeight: 'bold' },
  activeTabText: { color: '#fff' },
  content: { flex: 1, padding: 15 },
  welcome: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#1a1a2e' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 10, elevation: 2, borderLeftWidth: 5, borderLeftColor: '#FF6B00' },
  statCard: { backgroundColor: '#fff', padding: 20, borderRadius: 12, alignItems: 'center', marginBottom: 15, borderLeftWidth: 5, borderLeftColor: '#FF6B00' },
  statValue: { fontSize: 24, fontWeight: 'bold', color: '#1a1a2e' },
  statLabel: { color: '#666' },
  row: { flexDirection: 'row', marginTop: 10 },
  btnEdit: { backgroundColor: '#FF6B00', padding: 8, borderRadius: 6, marginRight: 10 },
  btnDelete: { backgroundColor: '#dc3545', padding: 8, borderRadius: 6 },
  btnDisabled: { opacity: 0.5 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  errorBanner: { backgroundColor: '#f8d7da', color: '#721c24', padding: 10, borderRadius: 6, marginBottom: 10 },
  successBanner: { backgroundColor: '#d4edda', color: '#155724', padding: 10, borderRadius: 6, marginBottom: 10 },
  userName: { fontSize: 16, fontWeight: 'bold' },
  userEmail: { color: '#666', fontSize: 13 },
  orderId: { fontWeight: 'bold', color: '#1a1a2e' },
  orderStatus: { color: '#FF6B00', fontSize: 12, fontWeight: '700' },
  orderPrice: { fontSize: 18, fontWeight: 'bold', marginTop: 5 },
  helperText: { color: '#666', fontSize: 13, marginBottom: 10 },
  trackBtn: { marginTop: 10, alignSelf: 'flex-start', backgroundColor: '#FFA500', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6 },
  trackBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: 15,
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a2e',
    textAlign: 'center',
    marginBottom: 10,
  },
  editContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
  },
  editRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  editField: {
    flex: 1,
    marginBottom: 10,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    color: '#666',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333',
  },
  textInputDisabled: {
    backgroundColor: '#f1f3f5',
    color: '#666',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  editActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 8,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    padding: 12,
    borderRadius: 8,
  },
  btnSaveText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  btnCancelText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  deliveredCard: {
    backgroundColor: '#f8f9fa',
    borderLeftColor: '#28a745',
    opacity: 0.8,
  },
  deliveredStatus: {
    color: '#28a745',
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  ticketId: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B00',
    backgroundColor: '#fff3cd',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FF6B00',
  },
  infoSection: {
    marginBottom: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#FF6B00',
    paddingBottom: 5,
  },
  fieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  fieldValue: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    textAlign: 'right',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 80,
    alignItems: 'center',
  },
  priorityText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  statusSeparator: {
    backgroundColor: '#2c3e50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    elevation: 3,
  },
  separatorText: {
    color: '#FF6B00',
    fontSize: 12,
    fontWeight: 'bold',
  },
});