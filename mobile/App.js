import React, { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { userAPI } from './services/api';
import { CartProvider } from './context/CartContext';

let Device = null;
if (Platform.OS !== 'web') {
  try {
    Device = require('expo-device');
  } catch (e) {
    // dynamic require failed (e.g. running in web bundler) — leave Device null
    Device = null;
  }
}
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import CustomerHomeScreen from './screens/customer/CustomerHomeScreen';
import RestaurantsScreen from './screens/customer/RestaurantsScreen';
import RestaurantDetailScreen from './screens/customer/RestaurantDetailScreen';
import CartScreen from './screens/customer/CartScreen';
import { useCart } from './context/CartContext';
import ShoppingScreen from './screens/customer/ShoppingScreen';
import BrandProductsScreen from './screens/customer/BrandProductsScreen';
import CustomerOrdersScreen from './screens/customer/CustomerOrdersScreen';
import CustomerOrderTrackingScreen from './screens/customer/CustomerOrderTrackingScreen';
import OrderTrackingLiveScreen from './screens/customer/OrderTrackingLiveScreen';
import CustomerTicketsScreen from './screens/customer/CustomerTicketsScreen';
import CreateTicketScreen from './screens/shared/CreateTicketScreen';
import TicketDetailScreen from './screens/shared/TicketDetailScreen';
import OrderSelectionScreen from './screens/customer/OrderSelectionScreen';
import RiderHomeScreen from './screens/rider/RiderHomeScreen';
import RiderActiveScreen from './screens/rider/RiderActiveScreen';
import RiderTicketsScreen from './screens/rider/RiderTicketsScreen';
import AdminDashboardScreen from './screens/admin/AdminDashboardScreen';
import AdminTicketsScreen from './screens/admin/AdminTicketsScreen';
import { ActivityIndicator, View, Text, TouchableOpacity } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Auth Stack per non autenticati
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

// Customer Stack
function CustomerTabs({ onLogout, user }) {
  const cart = useCart();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#FF6B00',
        tabBarInactiveTintColor: '#000',
        headerStyle: {
          backgroundColor: '#FF6B00',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={CustomerHomeScreen}
        options={{
          title: user?.name || 'Home',
          tabBarLabel: '🍔 Home',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>🏠</Text>,
          headerRight: () => (
            <TouchableOpacity onPress={onLogout} style={{ marginRight: 12 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#fff' }}>Logout</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Restaurants"
        component={RestaurantsScreen}
        options={{
          title: user?.name || 'Ristoranti',
          tabBarLabel: '🍽️ Ristoranti',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>🍽️</Text>,
          headerRight: () => (
            <TouchableOpacity onPress={onLogout} style={{ marginRight: 12 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#fff' }}>Logout</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Shopping"
        component={ShoppingScreen}
        options={{
          title: user?.name || 'Shopping',
          tabBarLabel: '🛍️ Shopping',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>🛍️</Text>,
          headerRight: () => (
            <TouchableOpacity onPress={onLogout} style={{ marginRight: 12 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#fff' }}>Logout</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: user?.name || 'Carrello',
          tabBarLabel: '🛒 Carrello',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>🛒</Text>,
          headerRight: () => (
            <TouchableOpacity onPress={onLogout} style={{ marginRight: 12 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#fff' }}>Logout</Text>
            </TouchableOpacity>
          ),
          tabBarBadge: cart?.itemCount > 0 ? cart.itemCount : null,
        }}
      />
      <Tab.Screen
        name="Orders"
        component={CustomerOrdersScreen}
        options={{
          title: user?.name || 'Ordini',
          tabBarLabel: '📦 Ordini',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>📦</Text>,
          headerRight: () => (
            <TouchableOpacity onPress={onLogout} style={{ marginRight: 12 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#fff' }}>Logout</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Tickets"
        component={CustomerTicketsScreen}
        options={{
          title: user?.name || 'Ticket',
          tabBarLabel: '🎫 Ticket',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>🎫</Text>,
          headerRight: () => (
            <TouchableOpacity onPress={onLogout} style={{ marginRight: 12 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#fff' }}>Logout</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function CustomerStack({ onLogout, user }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CustomerTabs"
        // pass onLogout down to tabs so header button can call it
        children={() => <CustomerTabs onLogout={onLogout} user={user} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BrandProducts"
        component={BrandProductsScreen}
        options={{ title: 'Prodotti' }}
      />
      <Stack.Screen
        name="RestaurantDetail"
        component={RestaurantDetailScreen}
        options={{
          title: '🍽️ Menu',
          headerStyle: {
            backgroundColor: '#FF6B00',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="OrderTracking"
        component={CustomerOrderTrackingScreen}
        options={{
          title: '📍 Tracciamento Ordine',
          headerStyle: {
            backgroundColor: '#FF6B00',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="OrderTrackingLive"
        component={OrderTrackingLiveScreen}
        options={{
          title: '🗺️ Tracking Live',
          headerStyle: {
            backgroundColor: '#FF6B00',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="OrderSelection"
        component={OrderSelectionScreen}
        options={{
          title: '📋 Seleziona Ordine',
          headerStyle: {
            backgroundColor: '#FF6B00',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="CreateTicket"
        component={CreateTicketScreen}
        options={{
          title: '📝 Nuovo Ticket',
          headerStyle: {
            backgroundColor: '#FF6B00',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="TicketDetail"
        component={TicketDetailScreen}
        options={{
          title: '🎫 Dettagli Ticket',
          headerStyle: {
            backgroundColor: '#FF6B00',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
}

// Rider Stack
function RiderStack({ onLogout, user }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#0066FF',
        tabBarInactiveTintColor: '#999',
        headerStyle: {
          backgroundColor: '#0066FF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen
        name="Available"
        component={RiderHomeScreen}
        options={{
          title: user?.name || 'Disponibili',
          tabBarLabel: '📦 Disponibili',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>📦</Text>,
          headerRight: () => (
            <TouchableOpacity onPress={onLogout} style={{ marginRight: 12 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#fff' }}>Logout</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Active"
        component={RiderActiveScreen}
        options={{
          title: user?.name || 'Consegne',
          tabBarLabel: '🚚 Consegne',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>🚚</Text>,
          headerRight: () => (
            <TouchableOpacity onPress={onLogout} style={{ marginRight: 12 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#fff' }}>Logout</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Tickets"
        component={RiderTicketsScreen}
        options={{
          title: user?.name || 'Ticket',
          tabBarLabel: '🎫 Ticket',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>🎫</Text>,
          headerRight: () => (
            <TouchableOpacity onPress={onLogout} style={{ marginRight: 12 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#fff' }}>Logout</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Rider Stack con schermate aggiuntive
function RiderStackWithScreens({ onLogout, user }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RiderTabs"
        children={() => <RiderStack onLogout={onLogout} user={user} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateTicket"
        component={CreateTicketScreen}
        options={{
          title: '📝 Nuovo Ticket',
          headerStyle: {
            backgroundColor: '#0066FF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="TicketDetail"
        component={TicketDetailScreen}
        options={{
          title: '🎫 Dettagli Ticket',
          headerStyle: {
            backgroundColor: '#0066FF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
}

// Manager Stack - Admin Dashboard
function ManagerStack({ token, user, onLogout }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#FF6B00',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="AdminDashboard"
        component={AdminDashboardScreen}
        options={{
          title: user?.name || 'Admin Dashboard',
          headerRight: () => (
            <TouchableOpacity onPress={onLogout} style={{ marginRight: 12 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#fff' }}>Logout</Text>
            </TouchableOpacity>
          ),
        }}
        initialParams={{ token, user }}
      />
      <Stack.Screen
        name="AdminTickets"
        component={AdminTicketsScreen}
        options={{
          title: user?.name || 'Tickets',
          headerRight: () => (
            <TouchableOpacity onPress={onLogout} style={{ marginRight: 12 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#fff' }}>Logout</Text>
            </TouchableOpacity>
          ),
        }}
        initialParams={{ token }}
      />
      <Stack.Screen
        name="OrderTracking"
        component={CustomerOrderTrackingScreen}
        options={{
          title: user?.name || 'Tracciamento Ordine',
          headerRight: () => (
            <TouchableOpacity onPress={onLogout} style={{ marginRight: 12 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#fff' }}>Logout</Text>
            </TouchableOpacity>
          ),
        }}
        initialParams={{ token }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            user: action.user,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            user: action.user,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            user: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      user: null,
    }
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let token;
      let user;
      try {
        token = await AsyncStorage.getItem('token');
        user = await AsyncStorage.getItem('user');
        if (user) user = JSON.parse(user);
      } catch (e) {
        // Restoring token failed
        console.error('Error restoring token:', e);
      }

      dispatch({ type: 'RESTORE_TOKEN', token, user });
    };

    bootstrapAsync();

    // Listener per rilevare i cambiamenti di AsyncStorage (login)
    let lastToken = null;
    let lastUser = null;

    const checkStorageChanges = async () => {
      try {
        const currentToken = await AsyncStorage.getItem('token');
        const currentUser = await AsyncStorage.getItem('user');

        if (currentToken !== lastToken || currentUser !== lastUser) {
          lastToken = currentToken;
          lastUser = currentUser;

          if (currentToken && currentUser) {
            const user = JSON.parse(currentUser);
            dispatch({ type: 'SIGN_IN', token: currentToken, user });
          } else if (!currentToken) {
            dispatch({ type: 'SIGN_OUT' });
          }
        }
      } catch (e) {
        console.error('Error checking storage changes:', e);
      }
    };

    const interval = setInterval(checkStorageChanges, 500); // Check every 500ms

    // Try to register push token for logged in user
    const registerPush = async () => {
      try {
        if (Device && !Device.isDevice) {
          console.log('Push notifications require a physical device');
          return;
        }

        if (!Device) {
          console.log('Push notifications on web - skipping native device check');
        }
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          return;
        }
        const tokenData = await Notifications.getExpoPushTokenAsync();
        const token = tokenData.data;
        await AsyncStorage.setItem('push_token', token);
        // send to backend
        try {
          await userAPI.setPushToken(token);
        } catch (e) {
          console.warn('Could not send push token to backend', e.message);
        }
      } catch (e) {
        console.warn('registerPush error', e.message);
      }
    };

    registerPush();

    return () => clearInterval(interval);
  }, []);

  if (state.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FF6B00" />
      </View>
    );
  }

  return (
    <CartProvider>
      <NavigationContainer>
        {state.userToken == null ? (
          <AuthStack />
        ) : state.user?.role === 'customer' ? (
          <CustomerStack
            user={state.user}
            onLogout={async () => {
              try {
                await AsyncStorage.removeItem('token');
                await AsyncStorage.removeItem('user');
              } catch (e) {
                console.warn('Errore durante logout:', e);
              }
              dispatch({ type: 'SIGN_OUT' });
            }}
          />
        ) : state.user?.role === 'rider' ? (
          <RiderStackWithScreens
            user={state.user}
            onLogout={async () => {
              try {
                await AsyncStorage.removeItem('token');
                await AsyncStorage.removeItem('user');
              } catch (e) {
                console.warn('Errore durante logout:', e);
              }
              dispatch({ type: 'SIGN_OUT' });
            }}
          />
        ) : state.user?.role === 'manager' || state.user?.role === 'admin' ? (
          <ManagerStack token={state.userToken} user={state.user} onLogout={async () => {
            try {
              await AsyncStorage.removeItem('token');
              await AsyncStorage.removeItem('user');
            } catch (e) {
              console.warn('Errore durante logout:', e);
            }
            dispatch({ type: 'SIGN_OUT' });
          }} />
        ) : (
          <AuthStack />
        )}
      </NavigationContainer>
    </CartProvider>
  );
}
