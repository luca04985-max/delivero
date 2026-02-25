import db from '../config/db.js';
import logger from '../utils/logger.js';
import { dispatchEstimateTotal, dispatchSimulateTotal } from '../middleware/metrics.js';

function haversineKm(lat1, lon1, lat2, lon2) {
  const toRad = v => (v * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// helper: compute travel minutes given distance and speed (km/h)
function travelMinutesFromKm(km, speedKmh = 25) {
  return (km / speedKmh) * 60;
}

// If single restaurant: original behaviour. If multiple orders provided, attempt naive batching.
export const estimateMeet = async (req, res) => {
  try {
    logger.info('Dispatch: estimateMeet called');
    const { restaurantLat, restaurantLon, prepMinutes = 15, riders = [], orders = [] } = req.body;

    if ((!restaurantLat || !restaurantLon) && (!Array.isArray(orders) || orders.length === 0)) {
      return res.status(400).json({ message: 'Dati mancanti: restaurantLat/restaurantLon o orders[]' });
    }

    if (!Array.isArray(riders) || riders.length === 0) {
      return res.status(400).json({ message: 'Dati mancanti: riders[]' });
    }

    // handle single-order case (compat)
    if ((!orders || orders.length === 0) && restaurantLat && restaurantLon) {
      // compute distances
      const evaluated = riders.map(r => {
        const distKm = haversineKm(r.latitude, r.longitude, restaurantLat, restaurantLon);
        const travelMin = travelMinutesFromKm(distKm);
        return { ...r, distKm, travelMin };
      });
      evaluated.sort((a, b) => a.travelMin - b.travelMin);
      const best = evaluated[0];
      let meetupLat, meetupLon;
      if (best.travelMin <= prepMinutes) {
        meetupLat = restaurantLat;
        meetupLon = restaurantLon;
      } else {
        const ratio = prepMinutes / (prepMinutes + best.travelMin);
        meetupLat = best.latitude + (restaurantLat - best.latitude) * ratio;
        meetupLon = best.longitude + (restaurantLon - best.longitude) * ratio;
      }
      logger.info('Dispatch: single-order estimate', { suggestedRiderId: best.id, riderTravelMin: Math.round(best.travelMin) });
      try { dispatchEstimateTotal.inc(); } catch (e) { logger.warn('Metrics increment failed', { error: e.message }); }
      return res.json({ suggestedRiderId: best.id, riderTravelMin: Math.round(best.travelMin), prepMinutes, meetup: { latitude: meetupLat, longitude: meetupLon } });
    }

    // Multi-order batching: naive greedy assignment
    // Each order: { id, restaurantLat, restaurantLon, prepMinutes }
    const ordersList = orders.map(o => ({
      id: o.id,
      lat: o.restaurantLat,
      lon: o.restaurantLon,
      prepMinutes: o.prepMinutes || 15,
    }));

    // Precompute rider travel times to each order
    const matrix = riders.map(r => {
      return ordersList.map(o => {
        const distKm = haversineKm(r.latitude, r.longitude, o.lat, o.lon);
        return { distKm, travelMin: travelMinutesFromKm(distKm) };
      });
    });

    // Greedy assignment: for each order pick the rider with minimal (travelMin - prepMinutes) if positive
    const assignments = [];
    const usedRiders = new Set();

    for (let j = 0; j < ordersList.length; j++) {
      let bestIdx = -1;
      let bestScore = Infinity;
      for (let i = 0; i < riders.length; i++) {
        if (usedRiders.has(i)) continue; // one rider per order in this naive approach
        const score = Math.abs(matrix[i][j].travelMin - ordersList[j].prepMinutes);
        if (score < bestScore) {
          bestScore = score;
          bestIdx = i;
        }
      }
      if (bestIdx >= 0) {
        usedRiders.add(bestIdx);
        const rider = riders[bestIdx];
        const travelMin = Math.round(matrix[bestIdx][j].travelMin);
        // meetup point: weighted between rider and restaurant
        const ratio = ordersList[j].prepMinutes / (ordersList[j].prepMinutes + matrix[bestIdx][j].travelMin);
        const meetupLat = rider.latitude + (ordersList[j].lat - rider.latitude) * ratio;
        const meetupLon = rider.longitude + (ordersList[j].lon - rider.longitude) * ratio;
        assignments.push({ orderId: ordersList[j].id, riderId: rider.id, riderTravelMin: travelMin, meetup: { latitude: meetupLat, longitude: meetupLon } });
      } else {
        assignments.push({ orderId: ordersList[j].id, riderId: null, message: 'No available riders' });
      }
    }

    logger.info('Dispatch: batching assignments computed', { assignmentsCount: assignments.length });
    try { dispatchEstimateTotal.inc(assignments.length); } catch (e) { logger.warn('Metrics increment failed', { error: e.message }); }
    return res.json({ assignments });
  } catch (err) {
    logger.error('Dispatch estimate error', { error: err?.message || err });
    return res.status(500).json({ message: 'Errore server', error: err.message });
  }
};

// Simple simulation: generate N mock riders around a center point within radiusKm
export const simulateRiders = async (req, res) => {
  try {
    const { centerLat, centerLon, count = 5, radiusKm = 2 } = req.body;
    if (centerLat == null || centerLon == null) return res.status(400).json({ message: 'centerLat and centerLon required' });
    logger.info('Dispatch: simulateRiders', { centerLat, centerLon, count, radiusKm });
    const riders = [];
    for (let i = 0; i < count; i++) {
      const ang = Math.random() * Math.PI * 2;
      const dist = Math.random() * radiusKm; // km
      // offset in degrees approx (very rough): 1 deg lat ~111 km; lon scaled by cos(lat)
      const dLat = (dist * Math.cos(ang)) / 111;
      const dLon = (dist * Math.sin(ang)) / (111 * Math.cos((centerLat * Math.PI) / 180));
      riders.push({ id: `sim-${i + 1}`, latitude: centerLat + dLat, longitude: centerLon + dLon });
    }
    logger.debug('Dispatch: simulated riders generated', { count: riders.length });
    try { dispatchSimulateTotal.inc(); } catch (e) { logger.warn('Metrics increment failed', { error: e.message }); }
    return res.json({ riders });
  } catch (err) {
    logger.error('Dispatch simulate error', { error: err?.message || err });
    return res.status(500).json({ message: 'Errore server', error: err.message });
  }
};
