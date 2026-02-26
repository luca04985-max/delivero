export const mobileTheme = {
  colors: {
    primary: '#FF6B00',
    secondary: '#0B5FFF',
    background: '#F7F9FC',
    white: '#ffffff',
    text: {
      primary: '#0F172A',
      secondary: '#6B7280',
      tertiary: '#9CA3AF',
    },
    border: '#E5E7EB',
    success: '#10B981',
    warning: '#F59E0B',
    primarySoft: '#FFF7EE',
  },
  spacing: [0, 4, 8, 12, 16, 20, 24, 28, 32],
  borderRadius: {
    sm: 6,
    md: 10,
    lg: 14,
    xl: 20,
    full: 999,
  },
  typography: {
    fontSize: { xs: 12, sm: 14, base: 16, md: 18, lg: 20, xl: 24, '2xl': 28 },
    fontWeight: { normal: '400', semibold: '600', bold: '700', black: '900' },
  },
  shadows: {
    sm: { shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 6, elevation: 1 },
    medium: { shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 12, elevation: 3 },
    soft: { shadowColor: '#000', shadowOpacity: 0.02, shadowRadius: 8, elevation: 1 },
  },
};

export default mobileTheme;
