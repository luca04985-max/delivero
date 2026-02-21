import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Hook custom per gestire il ruolo dell'utente
 * @returns {Object} { userRole, isLoading, error }
 */
export const useUserRole = () => {
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUserRole = async () => {
      try {
        setIsLoading(true);
        const userStr = await AsyncStorage.getItem('user');
        
        if (userStr) {
          const user = JSON.parse(userStr);
          setUserRole(user.role);
          console.log(`👤 User role loaded: ${user.role}`);
        } else {
          console.log('👤 No user found in storage');
        }
      } catch (error) {
        console.error('❌ Error loading user role:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserRole();
  }, []);

  const isRider = userRole === 'rider';
  const isCustomer = userRole === 'customer';
  const isAdmin = userRole === 'admin' || userRole === 'manager';

  return {
    userRole,
    isLoading,
    error,
    isRider,
    isCustomer,
    isAdmin,
  };
};
