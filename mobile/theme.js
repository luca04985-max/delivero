export const mobileTheme = {
  colors: {
    // Primary - Più vibranti
    primary: '#FF6B00',
    primaryDark: '#E55A00',
    primarySoft: 'rgba(255, 107, 0, 0.1)', // Per i background dei badge

    // Secondary - Un blu navy più "SaaS"
    secondary: '#0F172A',
    accent: '#0066FF',

    // Status con tinte pastello per i background
    success: '#10B981',
    successBg: '#DCFCE7',
    error: '#EF4444',
    errorBg: '#FEE2E2',
    warning: '#F59E0B',
    warningBg: '#FEF3C7',

    // Neutrali puliti
    white: '#FFFFFF',
    background: '#F8FAFC', // Grigio azzurrato molto leggero (più moderno del grigio puro)
    border: '#E2E8F0',
    text: {
      primary: '#1E293B',   // Quasi nero, ma più morbido
      secondary: '#64748B', // Grigio ardesia per sottotitoli
      tertiary: '#94A3B8',
      inverse: '#FFFFFF'
    },

    // Ruoli
    customer: '#3B82F6',
    rider: '#FF6B00',
    manager: '#8B5CF6',
    admin: '#0F172A',
  },

  // Ombre stratificate (fondamentali per il look moderno)
  shadows: {
    none: { elevation: 0 },
    soft: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowColor: "#0F172A", // Ombra leggermente colorata per profondità
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.08,
      shadowRadius: 15,
      elevation: 5,
    },
  },

  borderRadius: {
    xs: 6,
    sm: 8,
    md: 12, // Standard per bottoni e input
    lg: 16, // Standard per card
    xl: 24, // Per sezioni arrotondate
    full: 9999
  },

  spacing: {
    0: 0, 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32, 10: 40
  },

  typography: {
    fontSize: {
      xs: 12, sm: 14, base: 16, lg: 18, xl: 20, '2xl': 24
    },
    fontWeight: {
      normal: '400', medium: '500', semibold: '600', bold: '700', black: '900'
    }
  }
};

// Mapping diretto per compatibilità React Native
export const FONT_WEIGHTS = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  black: '900'
};

export default mobileTheme;