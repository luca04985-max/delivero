import { Theme } from '../../styles/Theme';

// 🔍 SMART SEARCH STYLES
export const smartSearchStyles = {
  // Container principale
  container: {
    position: 'relative',
    marginBottom: Theme.spacing.lg,
  },

  // Container input search
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    background: 'white',
    borderRadius: Theme.borderRadius.xl,
    boxShadow: Theme.shadows.card,
    overflow: 'hidden',
    border: `1px solid ${Theme.colors.borderColor}`,
  },

  inputContainerFocus: {
    borderColor: Theme.colors.primary,
    boxShadow: `0 0 0 4px ${Theme.getColor('primary', 0.1)}`,
  },

  // Campo input
  input: {
    flex: 1,
    padding: '15px 20px',
    border: 'none',
    outline: 'none',
    fontSize: '16px',
    background: 'transparent',
    color: Theme.colors.textPrimary,
  },

  inputPlaceholder: {
    color: Theme.colors.textSecondary,
  },

  // Pulsante search
  searchButton: {
    background: Theme.colors.primary,
    border: 'none',
    color: 'white',
    padding: '15px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: Theme.transitions.button,
    borderRadius: Theme.borderRadius.lg,
  },

  searchButtonHover: {
    background: Theme.colors.primaryDark,
    transform: 'scale(1.05)',
  },

  // Dropdown suggerimenti
  suggestionsDropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    background: 'white',
    border: `1px solid ${Theme.colors.borderColor}`,
    borderRadius: `0 0 ${Theme.borderRadius.lg} ${Theme.borderRadius.lg}`,
    boxShadow: Theme.shadows.cardHover,
    zIndex: 1000,
    maxHeight: '300px',
    overflowY: 'auto',
  },

  // Item suggerimento
  suggestionItem: {
    padding: '12px 20px',
    cursor: 'pointer',
    transition: Theme.transitions.fast,
    borderBottom: `1px solid ${Theme.colors.lightBg}`,
    display: 'flex',
    alignItems: 'center',
    gap: Theme.spacing.md,
  },

  suggestionItemHover: {
    background: Theme.colors.lightBg,
  },

  suggestionItemLast: {
    borderBottom: 'none',
  },

  // Icona tipo suggerimento
  suggestionType: {
    fontSize: '18px',
    minWidth: '30px',
    color: Theme.colors.textSecondary,
  },

  // Nome suggerimento
  suggestionName: {
    flex: 1,
    fontWeight: 500,
    color: Theme.colors.textPrimary,
  },

  // Categoria suggerimento
  suggestionCategory: {
    fontSize: '12px',
    color: Theme.colors.textSecondary,
    background: Theme.colors.borderColor,
    padding: '2px 6px',
    borderRadius: Theme.borderRadius.sm,
  },

  // Ristorante suggerimento
  suggestionRestaurant: {
    fontSize: '11px',
    color: Theme.colors.textSecondary,
    fontStyle: 'italic',
  },

  // Ricerche recenti
  recentSearches: {
    marginTop: Theme.spacing.sm,
    background: 'white',
    borderRadius: Theme.borderRadius.lg,
    boxShadow: Theme.shadows.sm,
    border: `1px solid ${Theme.colors.borderColor}`,
  },

  // Header ricerche recenti
  recentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 20px',
    borderBottom: `1px solid ${Theme.colors.borderColor}`,
    fontWeight: 600,
    color: Theme.colors.textPrimary,
  },

  // Pulsante pulisci
  clearButton: {
    background: 'none',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    transition: Theme.transitions.fast,
    color: Theme.colors.textSecondary,
  },

  clearButtonHover: {
    transform: 'scale(1.1)',
    color: Theme.colors.danger,
  },

  // Lista ricerche recenti
  recentList: {
    maxHeight: '200px',
    overflowY: 'auto',
  },

  // Item ricerca recente
  recentItem: {
    padding: '10px 20px',
    cursor: 'pointer',
    transition: Theme.transitions.fast,
    borderBottom: `1px solid ${Theme.colors.lightBg}`,
    display: 'flex',
    alignItems: 'center',
    gap: Theme.spacing.md,
  },

  recentItemHover: {
    background: Theme.colors.lightBg,
  },

  recentItemLast: {
    borderBottom: 'none',
  },

  // Icona tipo recente
  recentType: {
    fontSize: '16px',
    minWidth: '30px',
    color: Theme.colors.textSecondary,
  },

  // Nome recente
  recentName: {
    flex: 1,
    fontWeight: 500,
    color: Theme.colors.textPrimary,
  },

  // Responsive
  responsive: {
    mobile: {
      inputContainer: {
        borderRadius: Theme.borderRadius.lg,
      },
      input: {
        padding: '12px 15px',
        fontSize: '14px',
      },
      searchButton: {
        padding: '12px 15px',
        fontSize: '14px',
      },
      suggestionItem: {
        padding: '10px 15px',
      },
      recentSearches: {
        borderRadius: Theme.borderRadius.md,
      },
      recentHeader: {
        padding: '10px 15px',
      },
    },
  },
};

// 🎯 STILI PER CLASSE CSS
export const smartSearchCSS = {
  '.search-input-container': {
    display: 'flex',
    alignItems: 'center',
    background: 'white',
    borderRadius: '25px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },

  '.search-input-container:focus-within': {
    borderColor: 'var(--primary-color)',
    boxShadow: '0 0 0 4px rgba(255, 107, 0, 0.1)',
  },

  '.search-btn:hover': {
    background: 'var(--primary-dark)',
    transform: 'scale(1.05)',
  },

  '.suggestion-item:hover': {
    background: 'var(--light-bg)',
  },
};

export default smartSearchStyles;
