import { Theme } from '../../styles/Theme';

// 🍽 RESTAURANT CARD STYLES
export const restaurantCardStyles = {
  // Card container
  card: {
    background: 'white',
    borderRadius: Theme.borderRadius.lg,
    boxShadow: Theme.shadows.card,
    transition: Theme.transitions.card,
    overflow: 'hidden',
    marginBottom: Theme.spacing.lg,
    border: `1px solid ${Theme.colors.borderColor}`
  },

  cardHover: {
    transform: 'translateY(-5px)',
    boxShadow: Theme.shadows.cardHover
  },

  // Sezione immagine
  imageContainer: {
    width: '100%',
    height: '200px',
    position: 'relative',
    overflow: 'hidden'
  },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: Theme.transitions.image
  },

  imageHover: {
    transform: 'scale(1.08)'
  },

  // Placeholder per immagini mancanti
  placeholder: {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, #FF6B00, #FF8C00)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '48px',
    color: 'white'
  },

  // Contenuto card
  content: {
    padding: Theme.spacing.lg
  },

  // Header con nome e preferiti
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Theme.spacing.md
  },

  name: {
    margin: 0,
    color: Theme.colors.textPrimary,
    fontSize: '20px',
    fontWeight: 700,
    flex: 1
  },

  // Pulsante preferiti
  favoriteButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    transition: Theme.transitions.fast,
    padding: Theme.spacing.xs,
    color: Theme.colors.textSecondary
  },

  favoriteButtonHover: {
    transform: 'scale(1.2)',
    color: Theme.colors.primary
  },

  // Meta informazioni
  meta: {
    display: 'flex',
    flexDirection: 'column',
    gap: Theme.spacing.sm
  },

  rating: {
    display: 'flex',
    alignItems: 'center',
    gap: Theme.spacing.xs
  },

  stars: {
    color: Theme.colors.primary,
    fontSize: '16px'
  },

  ratingValue: {
    color: Theme.colors.textPrimary,
    fontWeight: 600,
    fontSize: '14px'
  },

  // Info delivery
  deliveryInfo: {
    display: 'flex',
    gap: Theme.spacing.md
  },

  deliveryBadge: {
    background: Theme.colors.lightBg,
    padding: '5px 10px',
    borderRadius: Theme.borderRadius.sm,
    fontSize: '12px',
    fontWeight: 500,
    border: `1px solid ${Theme.colors.borderColor}`
  },

  timeBadge: {
    ...Theme.deliveryBadge,
    color: Theme.colors.success
  },

  priceBadge: {
    ...Theme.deliveryBadge,
    color: Theme.colors.textPrimary
  },

  distance: {
    color: Theme.colors.textSecondary,
    fontSize: '12px'
  },

  // Descrizione
  description: {
    marginBottom: Theme.spacing.lg
  },

  descriptionText: {
    color: Theme.colors.textSecondary,
    lineHeight: 1.4,
    fontSize: '14px',
    margin: 0
  },

  // Azioni
  actions: {
    display: 'flex',
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.md
  },

  actionButton: {
    flex: 1,
    padding: '12px 20px',
    border: 'none',
    borderRadius: Theme.borderRadius.sm,
    fontWeight: 600,
    cursor: 'pointer',
    transition: Theme.transitions.button
  },

  quickOrderButton: {
    ...Theme.actionButton,
    background: Theme.colors.primary,
    color: 'white',
    boxShadow: Theme.shadows.button
  },

  quickOrderButtonHover: {
    background: Theme.colors.primaryDark,
    transform: 'translateY(-2px)',
    boxShadow: Theme.shadows.buttonHover
  },

  menuButton: {
    ...Theme.actionButton,
    background: '#6c757d',
    color: 'white'
  },

  menuButtonHover: {
    background: '#5a6268',
    transform: 'translateY(-2px)'
  },

  // Footer card
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Theme.spacing.md,
    borderTop: `1px solid ${Theme.colors.borderColor}`
  },

  // Status ristorante
  status: {
    display: 'flex',
    alignItems: 'center',
    gap: Theme.spacing.sm
  },

  statusBadge: {
    padding: '5px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 500,
    color: 'white'
  },

  openStatus: {
    ...Theme.statusBadge,
    background: Theme.colors.success
  },

  closedStatus: {
    ...Theme.statusBadge,
    background: Theme.colors.danger
  },

  // Tags
  tags: {
    display: 'flex',
    gap: Theme.spacing.sm,
    flexWrap: 'wrap'
  },

  tag: {
    background: Theme.colors.borderColor,
    color: Theme.colors.textSecondary,
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: 500
  },

  // Responsive
  responsive: {
    mobile: {
      card: {
        marginBottom: Theme.spacing.md
      },
      content: {
        padding: Theme.spacing.md
      },
      name: {
        fontSize: '18px'
      },
      actions: {
        flexDirection: 'column'
      },
      footer: {
        flexDirection: 'column',
        gap: Theme.spacing.sm
      }
    }
  }
};

// 🎯 STILI PER CLASSE CSS
export const restaurantCardCSS = {
  '.restaurant-card': {
    background: 'white',
    borderRadius: '15px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    overflow: 'hidden',
    marginBottom: '20px'
  },

  '.restaurant-card:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)'
  },

  '.restaurant-image img': {
    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
  },

  '.restaurant-card:hover .restaurant-image img': {
    transform: 'scale(1.08)'
  },

  '.quick-order-btn:hover': {
    background: '#E55A00',
    transform: 'translateY(-2px)'
  }
};

export default restaurantCardStyles;
