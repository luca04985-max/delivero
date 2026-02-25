import React, { useEffect, useState } from 'react';
import { inventoryAPI } from '../../services/api';
import logger from '../../utils/logger';

export default function InventoryManager({ restaurantId = 1 }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const data = await inventoryAPI.listItems(restaurantId);
      setItems(data);
    } catch (e) {
      logger.error('Failed to load inventory', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [restaurantId]);

  const toggle = async item => {
    try {
      await inventoryAPI.setAvailability(item.id, !item.is_available);
      load();
    } catch (e) {
      logger.error('Failed to toggle availability', e);
    }
  };

  return (
    <div>
      <h2>🍽️ Inventory - Restaurant #{restaurantId}</h2>
      {loading ? (
        <p>Caricamento...</p>
      ) : (
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          {items.map(it => (
            <div key={it.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>{it.name}</strong>
                <div style={{ fontSize: '0.85rem', color: '#666' }}>€{parseFloat(it.price).toFixed(2)} • prep {it.preparation_time_minutes}m</div>
              </div>
              <div>
                <button className={`btn ${it.is_available ? 'btn-primary' : 'btn-outline'}`} onClick={() => toggle(it)}>
                  {it.is_available ? 'Disponibile' : 'Non disponibile'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
