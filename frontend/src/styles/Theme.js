// 🎨 DELIVERO THEME CONSTANTS
// Sourcing canonical colors from `frontend/src/theme/theme.js` to avoid duplicates
import { theme as canonicalTheme } from '../theme/theme';

export const Theme = {
  // 🎨 COLORI (sourced)
  colors: {
    primary: canonicaltheme.colors.secondary,
    primaryDark: '#E55A00', // specific darker accent (kept as fallback)
    secondary: canonicalTheme.colors.secondary,
    success: canonicalTheme.colors.success,
    danger: canonicalTheme.colors.error,
    warning: canonicalTheme.colors.warning,
    lightBg: canonicalTheme.colors.background,
    borderColor: canonicalTheme.colors.border,
    textPrimary: canonicalTheme.colors.text.primary,
    textSecondary: canonicalTheme.colors.text.secondary,
  },

  // 🔄 BORDER RADIUS
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    full: '50%',
    default: '12px',
  },

  // 🌑 OMBRE
  shadows: {
    sm: '0 2px 8px rgba(0, 0, 0, 0.05)',
    md: '0 4px 15px rgba(0, 0, 0, 0.1)',
    lg: '0 8px 30px rgba(0, 0, 0, 0.15)',
    button: '0 4px 12px rgba(255, 107, 0, 0.25)',
    buttonHover: '0 6px 16px rgba(255, 107, 0, 0.35)',
    card: '0 4px 20px rgba(0, 0, 0, 0.1)',
    cardHover: '0 8px 30px rgba(0, 0, 0, 0.15)',
  },

  // ⚡ TRANSIZIONI
  transitions: {
    default: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fast: 'all 0.2s ease',
    slow: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    button: 'all 0.3s ease',
    card: 'all 0.3s ease',
    image: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
  },

  // 📏 SPACING
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },

  // 📱 BREAKPOINTS
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1200px',
  },
};

// 🎯 UTILITIES PER STILI INLINE
export const createStyle = styles => styles;

// 🎨 HELPER PER COLORI
export const getColor = (colorName, opacity = 1) => {
  const color = Theme.colors[colorName];
  if (opacity < 1) {
    // Converte hex in rgba con opacity
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return color;
};

// 🔄 HELPER PER TRANSIZIONI
export const getTransition = (properties, duration = 'default') => {
  const timing = Theme.transitions[duration] || Theme.transitions.default;
  return properties.map(prop => `${prop} ${timing.replace('all ', '')}`).join(', ');
};

export default Theme;
