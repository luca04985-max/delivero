import { StyleSheet, Platform } from 'react-native';
import { mobileTheme } from '../../theme';

export const gradientHeaderStyles = StyleSheet.create({
  headerContainer: {
    // Aumento del padding superiore per gestire notch/dynamic island
    paddingTop: Platform.OS === 'ios' ? 50 : 40,
    paddingBottom: mobileTheme.spacing[5],
    paddingHorizontal: mobileTheme.spacing[5],
    minHeight: 110,
    justifyContent: 'center',
    // Un'ombra leggera per staccare l'header dal contenuto sottostante
    ...mobileTheme.shadows.medium,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    marginRight: mobileTheme.spacing[3],
  },
  title: {
    fontSize: mobileTheme.typography.fontSize.xl,
    fontWeight: mobileTheme.typography.fontWeight.black, // Più marcato per il look 2026
    color: mobileTheme.colors.white,
    letterSpacing: -0.5,
  },
  subtitle: { // Aggiunto per dare profondità se necessario
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: mobileTheme.typography.fontWeight.medium,
  },

  // Stile moderno per i tasti icona nell'header
  iconButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // Effetto vetro
    padding: mobileTheme.spacing[2],
    borderRadius: mobileTheme.borderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  icon: {
    fontSize: mobileTheme.typography.fontSize.xl,
    color: mobileTheme.colors.white,
  },

  // Opzionale: Cerchio di profilo o Badge se presente nell'header
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: mobileTheme.colors.primary,
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: mobileTheme.colors.secondary,
  }
});

export default gradientHeaderStyles;