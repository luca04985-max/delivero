import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CartContext = createContext();

const initialState = {
    items: [], // [{id, restaurantId, name, price, quantity, customizations: [], type: 'restaurant'|'shopping'}]
    restaurantId: null,
    totalPrice: 0,
    itemCount: 0,
    restaurantItems: [], // Separa per ristoranti
    shoppingItems: [],   // Separa per shopping
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const { item, restaurantId, customizations = [] } = action.payload;
            const cartItem = {
                ...item,
                customizations,
                quantity: 1,
                id: Math.random(),
                type: item.type || 'restaurant',
                restaurantId: restaurantId || null
            };

            // Se è un prodotto restaurant e cambio ristorante, svuoto il carrello
            if (cartItem.type === 'restaurant' && state.restaurantId && state.restaurantId !== restaurantId) {
                const newItems = [cartItem];
                return calculateTotals({
                    ...state,
                    items: newItems,
                    restaurantId,
                });
            }

            // Per shopping, posso aggiungere direttamente senza svuotare
            if (cartItem.type === 'shopping') {
                const existingIndex = state.items.findIndex(
                    i => i.id === item.id && i.type === 'shopping'
                );

                let newItems;
                if (existingIndex > -1) {
                    newItems = [...state.items];
                    newItems[existingIndex].quantity += 1;
                } else {
                    newItems = [...state.items, cartItem];
                }

                return calculateTotals({
                    ...state,
                    items: newItems,
                });
            }

            // Per restaurant, controllo personalizzazioni
            const existingIndex = state.items.findIndex(
                i => i.menuItemId === item.id &&
                    JSON.stringify(i.customizations) === JSON.stringify(customizations) &&
                    i.type === 'restaurant'
            );

            let newItems;
            if (existingIndex > -1) {
                newItems = [...state.items];
                newItems[existingIndex].quantity += 1;
            } else {
                newItems = [...state.items, {
                    ...cartItem,
                    menuItemId: item.id,
                }];
            }

            return calculateTotals({
                ...state,
                items: newItems,
                restaurantId,
            });
        }

        case 'REMOVE_FROM_CART': {
            const newItems = state.items.filter(i => i.id !== action.payload);
            const newRestaurantId = newItems.filter(i => i.type === 'restaurant').length === 0
                ? null
                : state.restaurantId;

            return calculateTotals({
                ...state,
                items: newItems,
                restaurantId: newRestaurantId,
            });
        }

        case 'UPDATE_QUANTITY': {
            const { id, quantity } = action.payload;
            if (quantity <= 0) {
                return cartReducer(state, { type: 'REMOVE_FROM_CART', payload: id });
            }

            const newItems = state.items.map(item =>
                item.id === id ? { ...item, quantity } : item
            );

            return calculateTotals({
                ...state,
                items: newItems,
            });
        }

        case 'CLEAR_CART':
            return calculateTotals({
                ...initialState,
            });

        case 'LOAD_CART':
            return calculateTotals({
                ...state,
                items: action.payload.items || [],
            });

        default:
            return state;
    }
};

// Helper per calcolare totali e separare per tipo
const calculateTotals = (state) => {
    const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Separa per tipo
    const restaurantItems = state.items.filter(item => item.type === 'restaurant');
    const shoppingItems = state.items.filter(item => item.type === 'shopping');

    return {
        ...state,
        itemCount,
        totalPrice: parseFloat(totalPrice.toFixed(2)),
        restaurantItems,
        shoppingItems,
    };
};

export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, initialState);

    // Load cart from AsyncStorage on mount
    useEffect(() => {
        loadCart();
    }, []);

    // Save cart to AsyncStorage whenever it changes
    useEffect(() => {
        saveCart();
    }, [cart]);

    const loadCart = async () => {
        try {
            const saved = await AsyncStorage.getItem('cart');
            if (saved) {
                dispatch({ type: 'LOAD_CART', payload: JSON.parse(saved) });
            }
        } catch (error) {
            console.error('Error loading cart:', error);
        }
    };

    const saveCart = async () => {
        try {
            await AsyncStorage.setItem('cart', JSON.stringify(cart));
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    };

    const addToCart = (item, restaurantId = null, customizations = []) => {
        dispatch({
            type: 'ADD_TO_CART',
            payload: { item, restaurantId, customizations }
        });
    };

    const removeFromCart = (id) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    };

    const updateQuantity = (id, quantity) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            // Compatibilità con codice esistente
            items: cart.items,
            totalPrice: cart.totalPrice,
            itemCount: cart.itemCount,
            restaurantItems: cart.restaurantItems,
            shoppingItems: cart.shoppingItems,
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = React.useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};
