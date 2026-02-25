import logger from '../utils/logger';

// Cache per evitare richieste duplicate
const geocodeCache = new Map();

// Geocoding service per ottenere coordinate da indirizzo
export const geocodeAddress = async address => {
  try {
    // Controlla cache prima di fare la richiesta
    if (geocodeCache.has(address)) {
      logger.debug('Using cached geocode result for:', address);
      return geocodeCache.get(address);
    }

    // Lista di varianti dell'indirizzo da provare (in ordine di probabilità)
    const addressVariants = [
      `${address}, Roma, Italia`, // Aggiungi Roma e Italia prima (più probabile successo)
      `${address}, 00100 Roma, Italia`, // Aggiungi CAP
      `${address}, Roma, RM, Italia`, // Aggiungi provincia
      address, // Indirizzo originale come ultima opzione
    ];

    logger.debug('Trying geocoding for address variants:', addressVariants);

    for (const variant of addressVariants) {
      try {
        // Aggiungi delay tra le richieste per evitare rate limiting
        if (addressVariants.indexOf(variant) > 0) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }

        const encodedAddress = encodeURIComponent(variant);
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1&countrycodes=IT&addressdetails=1`,
          {
            headers: {
              'User-Agent': 'DeliveroApp/1.0', // Aggiungi User-Agent per evitare blocking
            },
          },
        );

        if (!response.ok) {
          logger.warn(`HTTP error for variant: ${variant}`, response.status);
          continue;
        }

        const data = await response.json();

        if (data && data.length > 0) {
          const { lat, lon, display_name } = data[0];
          const result = {
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
            displayName: display_name || address,
          };

          // Salva in cache
          geocodeCache.set(address, result);
          geocodeCache.set(variant, result); // Cache anche per la variante funzionante

          logger.info('Geocoding successful for variant:', variant);
          logger.debug('Coordinates:', result);
          return result;
        } else {
          logger.warn(`No results for variant: ${variant}`);
        }
      } catch (variantError) {
        logger.warn(`Variant failed: ${variant}`, variantError.message);
        continue;
      }
    }
    logger.warn('All geocoding variants failed for address:', address);
    return null;
  } catch (error) {
    logger.error('Geocoding error:', error.message);
    return null;
  }
};

// Fallback per coordinate di Roma se geocoding fallisce
export const getRomeFallbackCoordinates = address => {
  // Coordinate approssimative per Roma centro
  return {
    latitude: 41.9028,
    longitude: 12.4964,
    displayName: address || 'Roma, Italia',
  };
};

// Funzione per pulire la cache (opzionale)
export const clearGeocodeCache = () => {
  geocodeCache.clear();
  logger.info('Geocode cache cleared');
};
