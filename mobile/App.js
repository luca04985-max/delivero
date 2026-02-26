import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { userAPI } from './services/api';
import { CartProvider } from './context/CartContext';
import logger from './utils/logger';
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
import ProfileScreen from './screens/shared/ProfileScreen';
import PaymentMethodsScreen from './screens/shared/PaymentMethodsScreen';
import InventoryScreen from './screens/restaurant/InventoryScreen';
import OwnerDashboard from './screens/restaurant/OwnerDashboard';
import { ActivityIndicator, View, Text, TouchableOpacity } from 'react-native';
import { mobileTheme } from './theme';
import AdminDashboardTickets from './screens/admin/AdminDashboardTickets';
import ManagerRealTimeMapScreen from './screens/admin/ManagerRealTimeMapScreen';

let Device = null;
if (Platform.OS !== 'web') {
  try {
    Device = require('expo-device');
  } catch (e) {
    // dynamic require failed (e.g. running in web bundler) — leave Device null
    Device = null;
  }
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Auth Stack per non autenticati
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

// Customer Stack
function CustomerTabs({ user }) {
  const cart = useCart();

  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: true,
        tabBarActiveTintColor: mobileTheme.colors.primary,
        tabBarInactiveTintColor: mobileTheme.colors.text.primary,
        headerStyle: {
          backgroundColor: mobileTheme.colors.primary,
        },
        headerTintColor: mobileTheme.colors.white,
        headerTitleStyle: {
          fontWeight: '700',
        },
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            style={{ marginRight: 12 }}
          >
            <Text style={{ fontSize: 20 }}>👤</Text>
          </TouchableOpacity>
        ),
      })}
    >
      <Tab.Screen
        name="Home"
        component={CustomerHomeScreen}
        options={{
          title: user?.name || 'Home',
          tabBarLabel: '🍔 Home',
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>🏠</Text>,
        }}
      />
      <Tab.Screen
        name="Restaurants"
        component={RestaurantsScreen}
        options={{
          title: user?.name || 'Ristoranti',
          tabBarLabel: '🍽️ Ristoranti',
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>🍽️</Text>,
        }}
      />
      <Tab.Screen
        name="Shopping"
        component={ShoppingScreen}
        options={{
          title: user?.name || 'Shopping',
          tabBarLabel: '🛍️ Shopping',
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>🛍️</Text>,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: user?.name || 'Carrello',
          tabBarLabel: '🛒 Carrello',
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>🛒</Text>,
          tabBarBadge: cart?.itemCount > 0 ? cart.itemCount : null,
        }}
      />
      {/* Orders moved to stack: accessible from Profile -> "I miei ordini" */}
    </Tab.Navigator>
  );
}

function CustomerStack({ onLogout, user }) {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            style={{ marginRight: 12 }}
          >
            <Text style={{ fontSize: 20 }}>👤</Text>
          </TouchableOpacity>
        ),
      })}
    >
      <Stack.Screen
        name="CustomerTabs"
        children={() => <CustomerTabs user={user} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Orders"
        component={CustomerOrdersScreen}
        options={{
          title: 'I miei ordini',
          headerStyle: { backgroundColor: mobileTheme.colors.primary },
          headerTintColor: mobileTheme.colors.white,
          headerTitleStyle: { fontWeight: '700' },
        }}
      />
      <Stack.Screen
        name="Profile"
        children={({ navigation }) => (
          <ProfileScreen navigation={navigation} user={user} onLogout={onLogout} />
        )}
        options={{
          title: 'Profilo',
          headerStyle: { backgroundColor: mobileTheme.colors.primary },
          headerTintColor: mobileTheme.colors.white,
          headerTitleStyle: { fontWeight: '700' },
        }}
      />
      <Stack.Screen
        name="PaymentMethods"
        component={PaymentMethodsScreen}
        options={{
          title: 'Metodi di pagamento',
          headerStyle: { backgroundColor: mobileTheme.colors.primary },
          headerTintColor: mobileTheme.colors.white,
          headerTitleStyle: { fontWeight: '700' },
        }}
      />
      <Stack.Screen
        name="CustomerTickets"
        component={CustomerTicketsScreen}
        options={{
          title: '🎫 I miei ticket',
          headerStyle: { backgroundColor: mobileTheme.colors.primary },
          headerTintColor: mobileTheme.colors.white,
          headerTitleStyle: { fontWeight: '700' },
        }}
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
            backgroundColor: mobileTheme.colors.primary,
          },
          headerTintColor: mobileTheme.colors.white,
          headerTitleStyle: {
            fontWeight: '700',
          },
        }}
      />
      <Stack.Screen
        name="OrderTracking"
        component={CustomerOrderTrackingScreen}
        options={{
          title: '📍 Tracciamento Ordine',
          headerStyle: {
            backgroundColor: mobileTheme.colors.primary,
          },
          headerTintColor: mobileTheme.colors.white,
          headerTitleStyle: {
            fontWeight: '700',
          },
        }}
      />
      <Stack.Screen
        name="OrderTrackingLive"
        component={OrderTrackingLiveScreen}
        options={{
          title: '🗺️ Tracking Live',
          headerStyle: {
            backgroundColor: mobileTheme.colors.primary,
          },
          headerTintColor: mobileTheme.colors.white,
          headerTitleStyle: {
            fontWeight: '700',
          },
        }}
      />
      <Stack.Screen
        name="OrderSelection"
        component={OrderSelectionScreen}
        options={{
          title: '📋 Seleziona Ordine',
          headerStyle: {
            backgroundColor: mobileTheme.colors.primary,
          },
          headerTintColor: mobileTheme.colors.white,
          headerTitleStyle: {
            fontWeight: '700',
          },
        }}
      />
      <Stack.Screen
        name="CreateTicket"
        component={CreateTicketScreen}
        options={{
          title: '📝 Nuovo Ticket',
          headerStyle: {
            backgroundColor: mobileTheme.colors.primary,
          },
          headerTintColor: mobileTheme.colors.white,
          headerTitleStyle: {
            fontWeight: '700',
          },
        }}
      />
      <Stack.Screen
        name="TicketDetail"
        component={TicketDetailScreen}
        options={{
          title: '🎫 Dettagli Ticket',
          headerStyle: {
            backgroundColor: mobileTheme.colors.primary,
          },
          headerTintColor: mobileTheme.colors.white,
          headerTitleStyle: {
            fontWeight: '700',
          },
        }}
      />
    </Stack.Navigator>
  );
}

// Rider Stack
function RiderStack({ user }) {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: true,
        tabBarActiveTintColor: mobileTheme.colors.secondary,
        tabBarInactiveTintColor: mobileTheme.colors.text.secondary,
        headerStyle: {
          backgroundColor: mobileTheme.colors.secondary,
        },
        headerTintColor: mobileTheme.colors.white,
        headerTitleStyle: {
          fontWeight: '700',
        },
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            style={{ marginRight: 12 }}
          >
            <Text style={{ fontSize: 20 }}>👤</Text>
          </TouchableOpacity>
        ),
      })}
    >
      <Tab.Screen
        name="Available"
        component={RiderHomeScreen}
        options={{
          title: user?.name || 'Disponibili',
          tabBarLabel: '📦 Disponibili',
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>📦</Text>,
        }}
      />
      <Tab.Screen
        name="Active"
        component={RiderActiveScreen}
        options={{
          title: user?.name || 'Consegne',
          tabBarLabel: '🚚 Consegne',
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>🚚</Text>,
        }}
      />
    </Tab.Navigator>
  );
}

// Rider Stack con schermate aggiuntive
function RiderStackWithScreens({ onLogout, user }) {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            style={{ marginRight: 12 }}
          >
            <Text style={{ fontSize: 20 }}>👤</Text>
          </TouchableOpacity>
        ),
      })}
    >
      <Stack.Screen
        name="RiderTabs"
        children={() => <RiderStack user={user} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        children={({ navigation }) => (
          <ProfileScreen navigation={navigation} user={user} onLogout={onLogout} />
        )}
        options={{
          title: 'Profilo',
          headerStyle: { backgroundColor: mobileTheme.colors.secondary },
          headerTintColor: mobileTheme.colors.white,
          headerTitleStyle: { fontWeight: '700' },
        }}
      />
      <Stack.Screen
        name="RiderTickets"
        component={RiderTicketsScreen}
        options={{
          title: '🎫 I miei ticket',
          headerStyle: { backgroundColor: mobileTheme.colors.secondary },
          headerTintColor: mobileTheme.colors.white,
          headerTitleStyle: { fontWeight: '700' },
        }}
      />
      <Stack.Screen
        name="CreateTicket"
        component={CreateTicketScreen}
        options={{
          title: '📝 Nuovo Ticket',
          headerStyle: {
            backgroundColor: mobileTheme.colors.secondary,
          },
          headerTintColor: mobileTheme.colors.white,
          headerTitleStyle: {
            fontWeight: '700',
          },
        }}
      />
      <Stack.Screen
        name="TicketDetail"
        component={TicketDetailScreen}
        options={{
          title: '🎫 Dettagli Ticket',
          headerStyle: {
            backgroundColor: mobileTheme.colors.secondary,
          },
          headerTintColor: mobileTheme.colors.white,
          headerTitleStyle: {
            fontWeight: '700',
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
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: mobileTheme.colors.primary,
        },
        headerTintColor: mobileTheme.colors.white,
        headerTitleStyle: {
          fontWeight: '700',
        },
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            style={{ marginRight: 12 }}
          >
            <Text style={{ fontSize: 20 }}>👤</Text>
          </TouchableOpacity>
        ),
      })}
    >
      <Stack.Screen
        name="AdminDashboard"
        component={AdminDashboardScreen}
        options={{
          title: user?.name || 'Admin Dashboard',
        }}
        initialParams={{ token, user }}
      />
      <Stack.Screen
        name="Profile"
        children={({ navigation }) => (
          <ProfileScreen navigation={navigation} user={user} onLogout={onLogout} />
        )}
        options={{
          title: 'Profilo',
          headerStyle: { backgroundColor: mobileTheme.colors.primary },
          headerTintColor: mobileTheme.colors.white,
          headerTitleStyle: { fontWeight: '700' },
        }}
      />
      <Stack.Screen
        name="AdminTickets"
        component={AdminDashboardTickets}
        options={{
          title: user?.name || 'Tickets',
        }}
        initialParams={{ token }}
      />
      <Stack.Screen
        name="OrderTracking"
        component={CustomerOrderTrackingScreen}
        options={{
          title: user?.name || 'Tracciamento Ordine',
        }}
        initialParams={{ token }}
      />
      <Stack.Screen
        name="ManagerRealTimeMap"
        component={ManagerRealTimeMapScreen}
        options={{
          title: user?.name || 'Mappa Real-Time',
        }}
        initialParams={{ token }}
      />
    </Stack.Navigator>
  );
}

// Restaurant Stack - only for restaurant-role users
function RestaurantStack({ token, user, onLogout }) {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: mobileTheme.colors.primary,
        },
        headerTintColor: mobileTheme.colors.white,
        headerTitleStyle: {
          fontWeight: '700',
        },
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            style={{ marginRight: 12 }}
          >
            <Text style={{ fontSize: 20 }}>👤</Text>
          </TouchableOpacity>
        ),
      })}
    >
      <Stack.Screen
        name="OwnerDashboard"
        component={OwnerDashboard}
        options={{ title: 'Pannello Ristoratore' }}
        initialParams={{ token, user }}
      />
      <Stack.Screen
        name="Inventory"
        component={InventoryScreen}
        options={{ title: 'Gestione Inventory' }}
        initialParams={{ token, user }}
      />
      <Stack.Screen
        name="Profile"
        children={({ navigation }) => (
          <ProfileScreen navigation={navigation} user={user} onLogout={onLogout} />
        )}
        options={{
          title: 'Profilo',
          headerStyle: { backgroundColor: mobileTheme.colors.primary },
          headerTintColor: mobileTheme.colors.white,
          headerTitleStyle: { fontWeight: '700' },
        }}
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
    },
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
        logger.error('Error checking storage changes:', e);
      }
    };

    const interval = setInterval(checkStorageChanges, 500); // Check every 500ms

    // Try to register push token for logged in user
    const registerPush = async () => {
      try {
        if (Device && !Device.isDevice) {
          logger.info('Push notifications require a physical device');
          return;
        }

        if (!Device) {
          logger.info('Push notifications on web - skipping native device check');
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
          logger.warn('Could not send push token to backend', e.message);
        }
      } catch (e) {
        logger.warn('registerPush error', e.message);
      }
    };

    registerPush();

    return () => clearInterval(interval);
  }, []);

  if (state.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={mobileTheme.colors.primary} />
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
          <ManagerStack
            token={state.userToken}
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
        ) : state.user?.role === 'restaurant' ? (
          <RestaurantStack
            token={state.userToken}
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
        ) : (
          <AuthStack />
        )}
      </NavigationContainer>
    </CartProvider>
  );
}
