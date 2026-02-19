import { StyleSheet, Platform } from 'react-native';
import { mobileTheme } from '../../../theme';

export const adminDashboardScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mobileTheme.colors.background // Grigio azzurrato più pulito
  },

  // NAVBAR / TABBAR MODERNA
  tabBar: {
    backgroundColor: mobileTheme.colors.secondary, // Blu Navy profondo
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: mobileTheme.spacing[2],
    ...mobileTheme.shadows.medium,
  },
  tabBarContent: {
    paddingHorizontal: mobileTheme.spacing[4]
  },
  tab: {
    alignItems: 'center',
    paddingVertical: mobileTheme.spacing[3],
    paddingHorizontal: mobileTheme.spacing[4],
    marginHorizontal: 4,
    borderRadius: mobileTheme.borderRadius.md,
  },
  activeTab: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Effetto selezione soft
    borderBottomWidth: 0, // Rimuoviamo la linea per un look più "pill"
  },
  tabText: {
    color: mobileTheme.colors.text.tertiary,
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.semibold
  },
  activeTabText: {
    color: mobileTheme.colors.primary, // L'arancione risalta sul navy
    fontWeight: mobileTheme.typography.fontWeight.bold
  },

  content: {
    flex: 1,
    padding: mobileTheme.spacing[4]
  },
  welcome: {
    fontSize: mobileTheme.typography.fontSize['3xl'],
    fontWeight: mobileTheme.typography.fontWeight.black,
    marginBottom: mobileTheme.spacing[4],
    color: mobileTheme.colors.text.primary,
    letterSpacing: -1,
  },

  // CARD MODERNE (Senza bordi laterali spessi, ma con ombre)
  card: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.lg,
    marginBottom: mobileTheme.spacing[4],
    ...mobileTheme.shadows.soft,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },

  // STAT CARDS (Look a griglia moderna)
  statCard: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[5],
    borderRadius: mobileTheme.borderRadius.lg,
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[4],
    ...mobileTheme.shadows.medium,
    borderTopWidth: 4, // Spostiamo il colore sopra per un look più dashboard
    borderTopColor: mobileTheme.colors.primary
  },
  statValue: {
    fontSize: 28,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.secondary
  },
  statLabel: {
    color: mobileTheme.colors.text.secondary,
    textTransform: 'uppercase',
    fontSize: 10,
    letterSpacing: 1,
    marginTop: 4
  },

  // BUTTONS (Stile "Apple" morbido)
  btnEdit: {
    backgroundColor: mobileTheme.colors.primarySoft, // Sfondo arancio light
    paddingVertical: mobileTheme.spacing[2],
    paddingHorizontal: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.md,
    marginRight: mobileTheme.spacing[3],
    borderWidth: 1,
    borderColor: mobileTheme.colors.primary,
  },
  btnText: {
    color: mobileTheme.colors.primary, // Testo arancio su fondo light arancio
    fontWeight: mobileTheme.typography.fontWeight.bold,
    fontSize: mobileTheme.typography.fontSize.sm
  },
  btnDelete: {
    backgroundColor: mobileTheme.colors.errorBg,
    paddingVertical: mobileTheme.spacing[2],
    paddingHorizontal: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.md,
  },

  // BANNERS (Colori pastello moderni)
  errorBanner: {
    backgroundColor: mobileTheme.colors.errorBg,
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.md,
    borderLeftWidth: 4,
    borderLeftColor: mobileTheme.colors.error,
    marginBottom: mobileTheme.spacing[3]
  },
  successBanner: {
    backgroundColor: mobileTheme.colors.successBg,
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.md,
    borderLeftWidth: 4,
    borderLeftColor: mobileTheme.colors.success,
    marginBottom: mobileTheme.spacing[3]
  },

  // INPUTS (Puliti e spaziosi)
  textInput: {
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    borderRadius: mobileTheme.borderRadius.md,
    padding: mobileTheme.spacing[4],
    fontSize: mobileTheme.typography.fontSize.base,
    backgroundColor: '#FFF',
    color: mobileTheme.colors.text.primary,
    ...mobileTheme.shadows.soft,
  },

  // MODAL (Glassmorphism overlay)
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.7)', // Navy trasparente invece del nero
    justifyContent: 'center',
    padding: mobileTheme.spacing[4],
  },
  modalCard: {
    backgroundColor: mobileTheme.colors.white,
    borderRadius: mobileTheme.borderRadius.xl,
    padding: mobileTheme.spacing[6],
    ...mobileTheme.shadows.medium,
  },

  // STATUS SPECIFICI
  deliveredCard: {
    backgroundColor: '#F1F5F9', // Colore spento
    borderColor: mobileTheme.colors.border,
    opacity: 0.7,
  }
});

export default adminDashboardScreenStyles;