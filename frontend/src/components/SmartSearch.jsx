import React, { useState, useEffect, useCallback } from 'react';
import './SmartSearch.css';

export default function SmartSearch({
  onSearch,
  onFilter,
  placeholder = 'Cerca ristoranti, piatti...',
}) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  // Mock data for suggestions
  const mockSuggestions = [
    { type: 'restaurant', name: 'Pizza Margherita', category: 'Pizza' },
    { type: 'restaurant', name: 'Sushi Master', category: 'Sushi' },
    { type: 'restaurant', name: 'Burger House', category: 'Burger' },
    { type: 'item', name: 'Pizza Margherita', restaurant: 'Pizzeria Roma' },
    { type: 'item', name: 'Sashimi Mix', restaurant: 'Sushi Master' },
    { type: 'item', name: 'Cheese Burger', restaurant: 'Burger House' },
    { type: 'cuisine', name: 'Italiano' },
    { type: 'cuisine', name: 'Cinese' },
    { type: 'cuisine', name: 'Giapponese' },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const filterSuggestions = useCallback(searchTerm => {
    if (!searchTerm) {
      setSuggestions([]);
      return;
    }

    const filtered = mockSuggestions
      .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, 5);

    setSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
  }, []);

  const handleInputChange = value => {
    setQuery(value);
    filterSuggestions(value);
  };

  const handleSuggestionClick = suggestion => {
    setQuery(suggestion.name);
    setShowSuggestions(false);

    // Add to recent searches
    const newRecent = [
      suggestion,
      ...recentSearches.filter(item => item.name !== suggestion.name),
    ].slice(0, 10);
    setRecentSearches(newRecent);
    localStorage.setItem('recentSearches', JSON.stringify(newRecent));

    onSearch(suggestion.name);
  };

  const handleSearch = () => {
    if (query.trim()) {
      // Add to recent searches
      const existingItem = recentSearches.find(
        item => item.name.toLowerCase() === query.toLowerCase(),
      );
      if (!existingItem) {
        const newRecent = [{ name: query, type: 'custom' }, ...recentSearches].slice(0, 9);
        setRecentSearches(newRecent);
        localStorage.setItem('recentSearches', JSON.stringify(newRecent));
      }

      onSearch(query);
      setShowSuggestions(false);
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return (
    <div className="smart-search">
      <div className="search-input-container">
        <input
          type="text"
          value={query}
          onChange={e => handleInputChange(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleSearch()}
          placeholder={placeholder}
          className="search-input"
          onFocus={() => filterSuggestions(query)}
        />
        <button onClick={handleSearch} className="search-btn">
          🔍
        </button>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <span className="suggestion-type">
                {suggestion.type === 'restaurant' && '🍽️'}
                {suggestion.type === 'item' && '🍽️'}
                {suggestion.type === 'cuisine' && '🍽️'}
                {suggestion.type === 'custom' && '🔍'}
              </span>
              <span className="suggestion-name">{suggestion.name}</span>
              {suggestion.category && (
                <span className="suggestion-category">{suggestion.category}</span>
              )}
              {suggestion.restaurant && (
                <span className="suggestion-restaurant">{suggestion.restaurant}</span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <div className="recent-searches">
          <div className="recent-header">
            <span>Ricerche Recenti</span>
            <button onClick={clearRecentSearches} className="clear-btn">
              🗑️
            </button>
          </div>
          <div className="recent-list">
            {recentSearches.map((item, index) => (
              <div key={index} className="recent-item" onClick={() => handleSuggestionClick(item)}>
                <span className="recent-type">
                  {item.type === 'restaurant' && '🍽️'}
                  {item.type === 'item' && '🍽️'}
                  {item.type === 'cuisine' && '🍽️'}
                  {item.type === 'custom' && '🔍'}
                </span>
                <span className="recent-name">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
