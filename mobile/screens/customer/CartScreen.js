import React, { useState } from 'react';
import {
    View, Text, FlatList, TouchableOpacity, Alert,
    ScrollView, Modal, TextInput, ActivityIndicator, StatusBar
} from 'react-native';
import { useCart } from '../../context/CartContext';
import { ordersAPI, paymentsAPI } from '../../services/api';
import * as Location from 'expo-location';
import { mobileTheme } from '../../theme';
// Importiamo lo stylesheet come 'styles' per brevità nel codice
import styles from './styles/CartScreenStyles';

export default function CartScreen({ navigation }) {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
    const [checkoutVisible, setCheckoutVisible] = useState(false);
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [placingOrder, setPlacingOrder] = useState(false);

    const deliveryFee = 2.50;
    const finalTotal = cart.totalPrice + deliveryFee;

    const confirmCheckout = async () => {
        if (!deliveryAddress.trim()) {
            Alert.alert('Indirizzo mancante', 'Inserisci dove vuoi ricevere l\'ordine');
            return;
        }

        setPlacingOrder(true);
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            let coords = { delivery_latitude: null, delivery_longitude: null };

            if (status === 'granted') {
                const loc = await Location.getCurrentPositionAsync({});
                coords = { delivery_latitude: loc.coords.latitude, delivery_longitude: loc.coords.longitude };
            }

            const orderPayload = {
                restaurantId: cart.restaurantId,
                items: cart.items,
                totalAmount: finalTotal,
                deliveryAddress: deliveryAddress.trim(),
                ...coords,
            };

            const created = await ordersAPI.create(orderPayload);
            const orderId = created?.order?.id;

            if (paymentMethod === 'cash') {
                await paymentsAPI.createCashPayment(orderId);
            } else {
                await paymentsAPI.createStripePayment(orderId);
            }

            clearCart();
            setCheckoutVisible(false);
            navigation.navigate('OrderTracking', { orderId });

        } catch (e) {
            Alert.alert('Errore', e.message || 'Riprova più tardi');
        } finally {
            setPlacingOrder(false);
        }
    };

    if (cart.items.length === 0) {
        return (
            <View style={styles.container}>
                <View style={styles.emptyContainer}>
                    <Text style={{ fontSize: 64 }}>🛒</Text>
                    <Text style={[styles.title, { color: mobileTheme.colors.text.primary, marginTop: 20 }]}>Carrello Vuoto</Text>
                    <Text style={styles.emptySubtext}>Sembra che tu non abbia ancora aggiunto nulla di delizioso.</Text>
                    <TouchableOpacity
                        style={[styles.checkoutButton, { width: '100%', marginTop: 30 }]}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Text style={styles.checkoutButtonText}>Esplora Ristoranti</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Text style={styles.title}>Il tuo Ordine</Text>
                </View>
            </View>

            <ScrollView style={styles.cartContent} showsVerticalScrollIndicator={false}>
                {cart.items.map((item) => (
                    <View key={item.id} style={styles.cartItem}>
                        <View style={styles.itemImage}>
                            <Text style={{ fontSize: 30, textAlign: 'center', marginTop: 10 }}>🍲</Text>
                        </View>
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemPrice}>€{item.price.toFixed(2)}</Text>

                            <View style={styles.quantityContainer}>
                                <TouchableOpacity
                                    style={styles.quantityButton}
                                    onPress={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                    <Text style={styles.quantityText}>−</Text>
                                </TouchableOpacity>
                                <Text style={[styles.quantityText, { marginHorizontal: 15 }]}>{item.quantity}</Text>
                                <TouchableOpacity
                                    style={styles.quantityButton}
                                    onPress={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                    <Text style={styles.quantityText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={styles.removeButton}
                            onPress={() => removeFromCart(item.id)}
                        >
                            <Text style={styles.removeButtonText}>Elimina</Text>
                        </TouchableOpacity>
                    </View>
                ))}

                <View style={styles.summaryCard}>
                    <Text style={styles.summaryTitle}>Riepilogo Costi</Text>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Subtotale</Text>
                        <Text style={styles.summaryValue}>€{cart.totalPrice.toFixed(2)}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Consegna</Text>
                        <Text style={styles.summaryValue}>€{deliveryFee.toFixed(2)}</Text>
                    </View>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Totale</Text>
                        <Text style={styles.totalValue}>€{finalTotal.toFixed(2)}</Text>
                    </View>
                </View>
                <View style={{ height: 40 }} />
            </ScrollView>

            <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.checkoutButton} onPress={() => setCheckoutVisible(true)}>
                    <Text style={styles.checkoutButtonText}>Procedi al Checkout</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.clearButton, { marginTop: 10 }]} onPress={clearCart}>
                    <Text style={styles.clearButtonText}>Svuota Carrello</Text>
                </TouchableOpacity>
            </View>

            {/* Modal Checkout */}
            <Modal visible={checkoutVisible} animationType="slide" transparent>
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
                    <View style={{ backgroundColor: 'white', padding: 25, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
                        <Text style={[styles.summaryTitle, { fontSize: 22 }]}>Completa l'ordine</Text>

                        <Text style={[styles.summaryLabel, { marginBottom: 10 }]}>Indirizzo di consegna</Text>
                        <TextInput
                            style={{ backgroundColor: mobileTheme.colors.background, padding: 15, borderRadius: 10, marginBottom: 20 }}
                            placeholder="Es. Via Garibaldi 12, Milano"
                            value={deliveryAddress}
                            onChangeText={setDeliveryAddress}
                        />

                        <TouchableOpacity
                            style={[styles.checkoutButton, { opacity: placingOrder ? 0.7 : 1 }]}
                            onPress={confirmCheckout}
                            disabled={placingOrder}
                        >
                            {placingOrder ? <ActivityIndicator color="white" /> : <Text style={styles.checkoutButtonText}>Conferma e Paga</Text>}
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setCheckoutVisible(false)} style={{ marginTop: 20 }}>
                            <Text style={{ textAlign: 'center', color: mobileTheme.colors.text.tertiary }}>Annulla</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}