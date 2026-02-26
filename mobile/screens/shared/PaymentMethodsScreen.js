import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
} from 'react-native';
// addresses are stored server-side; no local AsyncStorage cache
import { mobileTheme } from '../../theme';
import { paymentsAPI, userAPI } from '../../services/api';
import { paymentMethodsScreenStyles } from './styles/PaymentMethodsScreenStyles';
import { geocodeAddress } from '../../services/geocoding';
import { useToast } from '../../hooks/useToast';


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
        const serverAddrs = await userAPI.getAddresses();
        setAddresses(Array.isArray(serverAddrs) ? serverAddrs : []);
        // load server-side saved cards
        const serverCards = await paymentsAPI.getSavedCards();
        setCards(serverCards || []);
      } catch (e) {
        console.error('Failed to load payment methods from server', e);
        setAddresses([]);
      }
    })();
  }, []);

  // no local cache persistence for addresses; server is the source of truth

  const addAddress = async () => {
    if (!addrInput.trim()) return showToast('Inserisci un indirizzo', 'error');
    try {
      const geocoded = await geocodeAddress(addrInput.trim());
      const newAddr = {
        // temporary client id; server will return canonical id
        id: Date.now().toString(),
        label: addrInput.trim(),
        displayName: geocoded?.displayName || addrInput.trim(),
        latitude: geocoded?.latitude || null,
        longitude: geocoded?.longitude || null,
      };
      // Save to server and reflect authoritative result
      try {
        const saved = await userAPI.saveAddress({
          label: newAddr.label,
          display_name: newAddr.displayName,
          latitude: newAddr.latitude,
          longitude: newAddr.longitude,
        });
        if (saved) {
          // prepend saved (server should include id/display_name)
          setAddresses([saved, ...(addresses || [])]);
          setAddrInput('');
          setAddAddrVisible(false);
          showToast('Indirizzo salvato', 'success');
        } else {
          throw new Error('Server did not return saved address');
        }
      } catch (serverErr) {
        console.error('Could not save address to server', serverErr);
        showToast('Impossibile salvare l\'indirizzo sul server', 'error');
      }
    } catch (e) {
      console.error('Failed to add address', e);
      showToast('Impossibile geocodificare l\'indirizzo', 'error');
    }
  };

  const removeAddress = async id => {
    try {
      await userAPI.deleteAddress(id);
      const next = addresses.filter(a => a.id !== id);
      setAddresses(next);
      showToast('Indirizzo rimosso', 'info');
    } catch (e) {
      console.error('Failed to delete address on server', e);
      showToast('Impossibile rimuovere l\'indirizzo', 'error');
    }
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

        <View style={paymentMethodsScreenStyles.section}>
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
                  <View style={paymentMethodsScreenStyles.rowCenter}>
                    <TouchableOpacity onPress={() => removeCard(item.id)}>
                      <Text style={[paymentMethodsScreenStyles.actionLabel, paymentMethodsScreenStyles.removeLabel]}>Elimina</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          )}

          <TouchableOpacity
            style={paymentMethodsScreenStyles.checkoutButton}
            onPress={() => setAddCardVisible(true)}
          >
            <Text style={paymentMethodsScreenStyles.checkoutButtonText}>Aggiungi Carta</Text>
          </TouchableOpacity>
        </View>

        <View style={[paymentMethodsScreenStyles.section, { marginTop: mobileTheme.spacing[5] }]}>
          <Text style={paymentMethodsScreenStyles.sectionTitle}>Indirizzi Salvati</Text>
          {addresses.length === 0 ? (
            <Text style={paymentMethodsScreenStyles.subtitle}>Nessun indirizzo salvato.</Text>
          ) : (
            <FlatList
              data={addresses}
              keyExtractor={i => i.id}
              renderItem={({ item }) => (
                <View style={paymentMethodsScreenStyles.actionRow}>
                  <View style={paymentMethodsScreenStyles.addressInfo}>
                    <Text style={paymentMethodsScreenStyles.actionLabel}>{item.displayName}</Text>
                    {item.latitude && (
                      <Text style={paymentMethodsScreenStyles.coordText}>
                        {item.latitude.toFixed(5)}, {item.longitude.toFixed(5)}
                      </Text>
                    )}
                  </View>
                  <TouchableOpacity onPress={() => removeAddress(item.id)}>
                    <Text style={[paymentMethodsScreenStyles.actionLabel, paymentMethodsScreenStyles.removeLabel]}>Elimina</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}

          <TouchableOpacity
            style={paymentMethodsScreenStyles.checkoutButton}
            onPress={() => setAddAddrVisible(true)}
          >
            <Text style={paymentMethodsScreenStyles.checkoutButtonText}>Aggiungi Indirizzo</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal Add Address */}
      <Modal visible={addAddrVisible} animationType="slide" transparent>
        <View style={paymentMethodsScreenStyles.modalOverlayBottom}>
          <View style={paymentMethodsScreenStyles.modalCard}>
            <Text style={paymentMethodsScreenStyles.modalTitle}>Nuovo Indirizzo</Text>
            <TextInput placeholder="Es. Via Garibaldi 12" value={addrInput} onChangeText={setAddrInput} style={paymentMethodsScreenStyles.input} />
            <View style={paymentMethodsScreenStyles.modalActions}>
              <TouchableOpacity onPress={() => setAddAddrVisible(false)} style={paymentMethodsScreenStyles.modalButton}>
                <Text>Annulla</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={addAddress} style={paymentMethodsScreenStyles.modalButton}>
                <Text>Aggiungi</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal Add Card */}
      <Modal visible={addCardVisible} animationType="slide" transparent>
        <View style={paymentMethodsScreenStyles.modalOverlayBottom}>
          <View style={paymentMethodsScreenStyles.modalCard}>
            <Text style={paymentMethodsScreenStyles.modalTitle}>Aggiungi Carta (demo)</Text>
            <TextInput placeholder="Numero carta" value={cardNumber} onChangeText={setCardNumber} keyboardType="numeric" style={paymentMethodsScreenStyles.input} />
            <TextInput placeholder="Nome intestatario" value={cardName} onChangeText={setCardName} style={paymentMethodsScreenStyles.input} />
            <View style={paymentMethodsScreenStyles.modalActions}>
              <TouchableOpacity onPress={() => setAddCardVisible(false)} style={paymentMethodsScreenStyles.modalButton}>
                <Text>Annulla</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={addCard} style={paymentMethodsScreenStyles.modalButton}>
                <Text>Aggiungi</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
