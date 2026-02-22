import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Servizio globale per la gestione della posizione GPS
class LocationService {
  constructor() {
    this.currentLocation = null;
    this.isGettingLocation = false;
    this.listeners = [];
    this.lastUpdate = null;
  }

  // Ottieni la posizione corrente (con cache)
  async getCurrentLocation(forceRefresh = false, screenName = 'Unknown') {
    // Se abbiamo già la posizione e non è troppo vecchia (5 minuti), ritorna quella
    if (!forceRefresh && this.currentLocation && this.lastUpdate) {
      const age = Date.now() - this.lastUpdate;
      if (age < 5 * 60 * 1000) { // 5 minuti
        console.log(`📍 [${screenName}] Using cached location (age: ${Math.round(age / 1000)} seconds)`);
        return this.currentLocation;
      }
    }

    if (this.isGettingLocation) {
      console.log(`📍 [${screenName}] Location already being requested, waiting...`);
      return this.waitForLocation();
    }

    this.isGettingLocation = true;

    try {
      console.log(`📍 [${screenName}] Getting fresh GPS location...`);
      console.log(`📍 [${screenName}] Requesting foreground permissions...`);
      const { status } = await Location.requestForegroundPermissionsAsync();
      console.log(`📍 [${screenName}] Permission status:`, status);

      if (status !== 'granted') {
        console.warn(`📍 [${screenName}] Location permission denied (${status})`);
        this.isGettingLocation = false;
        return null;
      }

      console.log(`📍 [${screenName}] Permission granted, getting current position...`);
      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeoutInterval: 5000, // Ridotto a 5 secondi
        maximumAge: 60000, // Accetta posizioni fino a 1 minuto vecchie
      });

      const coords = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        accuracy: loc.coords.accuracy,
        timestamp: loc.timestamp,
      };

      this.currentLocation = coords;
      this.lastUpdate = Date.now();

      // Salva in AsyncStorage per persistenza tra sessioni
      await AsyncStorage.setItem('lastLocation', JSON.stringify(coords));

      console.log(`✅ [${screenName}] Fresh GPS location obtained:`, coords);
      this.notifyListeners(coords);

      return coords;
    } catch (error) {
      console.error(`❌ [${screenName}] Error getting location:`, error);

      // Prova con accuracy più bassa per emulator
      if (error.message && error.message.includes('unavailable')) {
        try {
          console.log(`📍 [${screenName}] Retrying with lower accuracy for emulator...`);
          const loc = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Low,
            timeoutInterval: 3000,
            maximumAge: 120000, // 2 minuti
          });

          const coords = {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            accuracy: loc.coords.accuracy,
            timestamp: loc.timestamp,
          };

          this.currentLocation = coords;
          this.lastUpdate = Date.now();

          await AsyncStorage.setItem('lastLocation', JSON.stringify(coords));

          console.log(`✅ [${screenName}] Low accuracy location obtained:`, coords);
          this.notifyListeners(coords);

          return coords;
        } catch (retryError) {
          console.error(`❌ [${screenName}] Low accuracy retry also failed:`, retryError);
        }
      }

      // Prova a recuperare dalla cache persistente
      const cached = await this.getCachedLocation();
      if (cached) {
        console.log(`📍 [${screenName}] Using persistent cache as fallback`);
        this.currentLocation = cached;
        return cached;
      }

      return null;
    } finally {
      this.isGettingLocation = false;
    }
  }

  // Recupera posizione dalla cache persistente
  async getCachedLocation() {
    try {
      const cached = await AsyncStorage.getItem('lastLocation');
      if (cached) {
        const location = JSON.parse(cached);
        const age = Date.now() - location.timestamp;

        // Se la cache non è più vecchia di 30 minuti, usala
        if (age < 30 * 60 * 1000) {
          return location;
        }
      }
    } catch (error) {
      console.warn('Error reading cached location:', error);
    }
    return null;
  }

  // Aspetta che la posizione sia disponibile
  async waitForLocation(timeout = 15000) {
    return new Promise((resolve) => {
      const startTime = Date.now();

      const checkLocation = () => {
        if (this.currentLocation) {
          resolve(this.currentLocation);
          return;
        }

        if (Date.now() - startTime > timeout) {
          console.warn('📍 Location timeout');
          resolve(null);
          return;
        }

        setTimeout(checkLocation, 500);
      };

      checkLocation();
    });
  }

  // Aggiungi listener per aggiornamenti posizione
  addListener(callback) {
    this.listeners.push(callback);

    // Se abbiamo già una posizione, chiamala subito
    if (this.currentLocation) {
      callback(this.currentLocation);
    }

    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  // Notifica tutti i listener
  notifyListeners(location) {
    this.listeners.forEach(callback => {
      try {
        callback(location);
      } catch (error) {
        console.error('Error in location listener:', error);
      }
    });
  }

  // Resetta la cache
  clearCache() {
    this.currentLocation = null;
    this.lastUpdate = null;
    AsyncStorage.removeItem('lastLocation');
    console.log('📍 Location cache cleared');
  }

  // Verifica se abbiamo una posizione valida
  hasLocation() {
    return this.currentLocation !== null;
  }

  // Ottieni posizione sincrona (se disponibile)
  getLocationSync() {
    return this.currentLocation;
  }
}

// Esporta istanza singleton
export const locationService = new LocationService();
export default locationService;
