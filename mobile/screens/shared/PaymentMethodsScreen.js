import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mobileTheme } from '../../theme';
import { paymentsAPI } from '../../services/api';
import { paymentMethodsScreenStyles } from './styles/PaymentMethodsScreenStyles';
import { geocodeAddress } from '../../services/geocoding';
import { useToast } from '../../hooks/useToast';

const ADDR_KEY = 'saved_addresses_v1';

export default function PaymentMethodsScreen() {
  const [addresses, setAddresses] = useState([]);
  const [cards, setCards] = useState([]);
  const [addAddrVisible, setAddAddrVisible] = useState(false);
  const [addCardVisible, setAddCardVisible] = useState(false);
  const [addrInput, setAddrInput] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const { showToast } = useToast();

  useEffect(() => {
    (async () => {
      try {
        const a = await AsyncStorage.getItem(ADDR_KEY);
        setAddresses(a ? JSON.parse(a) : []);
        // load server-side saved cards
        const serverCards = await paymentsAPI.getSavedCards();
        setCards(serverCards || []);
      } catch (e) {
        console.error('Failed to load payment methods', e);
      }
    })();
  }, []);

  const persist = async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  };

  const addAddress = async () => {
    if (!addrInput.trim()) return showToast('Inserisci un indirizzo', 'error');
    try {
      const geocoded = await geocodeAddress(addrInput.trim());
      const newAddr = {
        id: Date.now().toString(),
        label: addrInput.trim(),
        displayName: geocoded?.displayName || addrInput.trim(),
        latitude: geocoded?.latitude || null,
        longitude: geocoded?.longitude || null,
      };
      const next = [newAddr, ...addresses];
      setAddresses(next);
      await persist(ADDR_KEY, next);
      setAddrInput('');
      setAddAddrVisible(false);
      showToast('Indirizzo salvato', 'success');
    } catch (e) {
      console.error('Failed to add address', e);
      showToast('Impossibile geocodificare l\'indirizzo', 'error');
    }
  };

  const removeAddress = async id => {
    const next = addresses.filter(a => a.id !== id);
    setAddresses(next);
    await persist(ADDR_KEY, next);
    showToast('Indirizzo rimosso', 'info');
  };

  const addCard = async () => {
    const trimmed = (cardNumber || '').replace(/\s+/g, '');
    if (trimmed.length < 12) return showToast('Numero carta non valido', 'error');

    try {
      const serverResp = await paymentsAPI.tokenizeCard(trimmed, cardName || 'Carta');
      if (serverResp && serverResp.token) {
        const newCard = {
          id: serverResp.id || serverResp.token,
          masked: serverResp.masked,
          name: cardName || 'Carta',
          token: serverResp.token,
        };
        const next = [newCard, ...(cards || [])];
        setCards(next);
        setCardNumber('');
        setCardName('');
        setAddCardVisible(false);
        showToast('Carta salvata sul server', 'success');
      } else {
        showToast('Errore nel salvataggio della carta', 'error');
      }
    } catch (e) {
      console.error('Failed to tokenize card', e);
      showToast('Errore nella comunicazione con il server', 'error');
    }
  };

  const removeCard = async id => {
    try {
      await paymentsAPI.deleteCard(id);
      const next = (cards || []).filter(c => c.id !== id);
      setCards(next);
      showToast('Carta rimossa', 'info');
    } catch (e) {
      console.error('Failed to delete card', e);
      showToast('Errore nella rimozione carta', 'error');
    }
  };

  return (
    <View style={paymentMethodsScreenStyles.container}>
      <View style={paymentMethodsScreenStyles.card}>
        <Text style={paymentMethodsScreenStyles.title}>💳 Metodi di pagamento</Text>
        <Text style={paymentMethodsScreenStyles.subtitle}>Gestisci indirizzi e carte salvate.</Text>

        <View style={{ marginTop: 16 }}>
          <Text style={paymentMethodsScreenStyles.sectionTitle}>Carte</Text>
          {cards.length === 0 ? (
            <Text style={paymentMethodsScreenStyles.subtitle}>Nessuna carta salvata.</Text>
          ) : (
            <FlatList
              data={cards}
              keyExtractor={i => i.id}
              renderItem={({ item }) => (
                <View style={paymentMethodsScreenStyles.actionRow}>
                  <Text style={paymentMethodsScreenStyles.actionLabel}>{item.masked}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => removeCard(item.id)}>
                      <Text style={[paymentMethodsScreenStyles.actionLabel, { color: 'red' }]}>Elimina</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          )}

          <TouchableOpacity
            style={[paymentMethodsScreenStyles.checkoutButton, { marginTop: 12 }]}
            onPress={() => setAddCardVisible(true)}
          >
            <Text style={paymentMethodsScreenStyles.checkoutButtonText}>Aggiungi Carta</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 24 }}>
          <Text style={paymentMethodsScreenStyles.sectionTitle}>Indirizzi Salvati</Text>
          {addresses.length === 0 ? (
            <Text style={paymentMethodsScreenStyles.subtitle}>Nessun indirizzo salvato.</Text>
          ) : (
            <FlatList
              data={addresses}
              keyExtractor={i => i.id}
              renderItem={({ item }) => (
                <View style={paymentMethodsScreenStyles.actionRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={paymentMethodsScreenStyles.actionLabel}>{item.displayName}</Text>
                    {item.latitude && (
                      <Text style={{ color: mobileTheme.colors.text.secondary, fontSize: 12 }}>
                        {item.latitude.toFixed(5)}, {item.longitude.toFixed(5)}
                      </Text>
                    )}
                  </View>
                  <TouchableOpacity onPress={() => removeAddress(item.id)}>
                    <Text style={[paymentMethodsScreenStyles.actionLabel, { color: 'red' }]}>Elimina</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}

          <TouchableOpacity
            style={[paymentMethodsScreenStyles.checkoutButton, { marginTop: 12 }]}
            onPress={() => setAddAddrVisible(true)}
          >
            <Text style={paymentMethodsScreenStyles.checkoutButtonText}>Aggiungi Indirizzo</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal Add Address */}
      <Modal visible={addAddrVisible} animationType="slide" transparent>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
            <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Nuovo Indirizzo</Text>
            <TextInput placeholder="Es. Via Garibaldi 12" value={addrInput} onChangeText={setAddrInput} style={{ borderWidth: 1, borderColor: '#eee', padding: 10, borderRadius: 8, marginBottom: 12 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={() => setAddAddrVisible(false)} style={{ padding: 12 }}>
                <Text>Annulla</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={addAddress} style={{ padding: 12 }}>
                <Text>Aggiungi</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal Add Card */}
      <Modal visible={addCardVisible} animationType="slide" transparent>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
            <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Aggiungi Carta (demo)</Text>
            <TextInput placeholder="Numero carta" value={cardNumber} onChangeText={setCardNumber} keyboardType="numeric" style={{ borderWidth: 1, borderColor: '#eee', padding: 10, borderRadius: 8, marginBottom: 12 }} />
            <TextInput placeholder="Nome intestatario" value={cardName} onChangeText={setCardName} style={{ borderWidth: 1, borderColor: '#eee', padding: 10, borderRadius: 8, marginBottom: 12 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={() => setAddCardVisible(false)} style={{ padding: 12 }}>
                <Text>Annulla</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={addCard} style={{ padding: 12 }}>
                <Text>Aggiungi</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
