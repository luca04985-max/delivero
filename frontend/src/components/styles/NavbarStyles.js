import { Theme } from '../styles/Theme';

// 🧭 NAVBAR STYLES
export const navbarStyles = {
  // Container principale
  navbar: {
    background: 'linear-gradient(135deg, #FF6B00 0%, #E55A00 100%)',
    color: 'white',
    padding: '16px 32px',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: Theme.shadows.md,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: Theme.spacing.lg
  },

  // Brand/logo
  brand: {
    fontSize: '28px',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    gap: Theme.spacing.sm,
    letterSpacing: '-0.5px',
    color: 'white',
    textDecoration: 'none'
  },

  // Menu navigazione
  menu: {
    display: 'flex',
    gap: Theme.spacing.sm,
    flexWrap: 'wrap',
    alignItems: 'center'
  },

  // Pulsanti navigazione
  navButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    padding: '10px 16px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderRadius: Theme.borderRadius.sm,
    cursor: 'pointer',
    transition: Theme.transitions.button,
    fontSize: '15px',
    fontWeight: 500,
    backgroundColor: 'transparent'
  },

  navButtonHover: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderColor: 'rgba(255, 255, 255, 0.5)',
    transform: 'translateY(-2px)'
  },

  navButtonActive: {
    backgroundColor: 'white',
    color: Theme.colors.primary,
    borderColor: 'white',
    fontWeight: 600
  },

  // Sezione utente
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: Theme.spacing.md,
    marginLeft: 'auto'
  },

  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: Theme.spacing.sm,
    fontSize: '15px',
    color: 'white'
  },

  // Pulsante logout
  logoutButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    padding: '10px 16px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderRadius: Theme.borderRadius.sm,
    cursor: 'pointer',
    transition: Theme.transitions.button,
    fontWeight: 500,
    backgroundColor: 'transparent'
  },

  logoutButtonHover: {
    backgroundColor: Theme.colors.danger,
    borderColor: Theme.colors.danger
  },

  // Responsive
  responsive: {
    mobile: {
      navbar: {
        padding: Theme.spacing.md,
        flexDirection: 'column',
        gap: Theme.spacing.md
      },
      brand: {
        fontSize: '24px'
      },
      menu: {
        width: '100%',
        justifyContent: 'center'
      },
      userSection: {
        width: '100%',
        justifyContent: 'space-between',
        marginLeft: 0
      }
    },

    tablet: {
      navbar: {
        padding: '14px 24px'
      }
    }
  }
};

// 🎯 STILI PER CLASSE CSS (se preferiti)
export const navbarCSS = {
  '.navbar': {
    background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)',
    color: 'white',
    padding: '1rem 2rem',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: 'var(--shadow)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1.5rem'
  },

  '.navbar-brand': {
    fontSize: '1.8rem',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    letterSpacing: '-0.5px'
  },

  '.nav-button:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderColor: 'rgba(255, 255, 255, 0.5)',
    transform: 'translateY(-2px)'
  },

  '.nav-button.active': {
    backgroundColor: 'white',
    color: 'var(--primary-color)',
    borderColor: 'white',
    fontWeight: 600
  }
};

export default navbarStyles;
