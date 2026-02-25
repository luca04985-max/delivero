import React from 'react';

export default function RestaurantCard({ restaurant, onFavorite, isFavorite, onOrder }) {
  return (
    <div className="restaurant-card">
      <div className="restaurant-image">
        {restaurant.image_url ? (
          <img src={restaurant.image_url} alt={restaurant.name} />
        ) : (
          <div className="placeholder-image">🍽️</div>
        )}
      </div>

      <div className="restaurant-content">
        <div className="restaurant-header">
          <h3>{restaurant.name}</h3>
          <button className="favorite-btn" onClick={() => onFavorite(restaurant)}>
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>

        <div className="restaurant-meta">
          <div className="rating">
            <span className="stars">⭐</span>
            <span className="rating-value">{restaurant.rating || '4.5'}</span>
          </div>
          <div className="delivery-info">
            <span className="time">⏱️ {restaurant.delivery_time || '30'} min</span>
            <span className="price">💰 €{restaurant.delivery_cost || '2.00'}</span>
          </div>
          <div className="distance">📍 {restaurant.distance || '1.2'} km</div>
        </div>
      </div>

      <div className="restaurant-description">
        <p>{restaurant.description}</p>
      </div>

      <div className="restaurant-actions">
        <button className="quick-order-btn" onClick={() => onOrder(restaurant)}>
          Ordina Veloce
        </button>
        <button
          className="menu-btn"
          onClick={() => {
            /* Navigate to menu */
          }}
        >
          Menu Completo
        </button>
      </div>

      <div className="restaurant-footer">
        <div className="restaurant-status">
          {restaurant.is_open ? (
            <span className="open-status">🟢 Aperto Ora</span>
          ) : (
            <span className="closed-status">🔴 Chiuso</span>
          )}
        </div>
        <div className="restaurant-tags">
          {restaurant.categories?.map(cat => (
            <span key={cat} className="tag">
              {cat}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
