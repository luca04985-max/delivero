import { StyleSheet, Platform } from 'react-native';
import { mobileTheme, FONT_WEIGHTS } from '../../../theme';
import { unifiedStyles } from '../../../theme/UnifiedStyles';
import { sharedHeaderStyles } from './SharedHeaderStyles';

export const shoppingScreenStyles = StyleSheet.create({
  ...unifiedStyles,
  container: {
    flex: 1,
    backgroundColor: mobileTheme.colors.background // Usiamo il nuovo grigio azzurrato pulito
  },

  // HEADER DINAMICO
  header: sharedHeaderStyles.header,
  headerContent: sharedHeaderStyles.headerContent,
  title: sharedHeaderStyles.title,
  subtitle: sharedHeaderStyles.subtitle,

  // SEARCH BAR "FLOATING"
  searchContainer: {
    paddingHorizontal: mobileTheme.spacing[4],
    marginTop: -25, // Fa salire la ricerca sopra l'header
    marginBottom: mobileTheme.spacing[4],
  },
  searchInput: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.lg,
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.primary,
    ...mobileTheme.shadows.medium, // Ombra profonda per l'effetto galleggiamento
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },

  section: {
    marginBottom: mobileTheme.spacing[6]
  },
  sectionTitle: {
    fontSize: mobileTheme.typography.fontSize.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.text.primary,
    paddingHorizontal: mobileTheme.spacing[4],
    marginBottom: mobileTheme.spacing[4],
    letterSpacing: -0.2,
  },

  // CATEGORIE A "PILLOLA" O SQUARE MORBIDI
  categoriesList: {
    paddingLeft: mobileTheme.spacing[4]
  },
  categoryCard: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 110,
    height: 100,
    borderRadius: mobileTheme.borderRadius.lg,
    marginRight: mobileTheme.spacing[3],
    backgroundColor: mobileTheme.colors.white,
    ...mobileTheme.shadows.soft,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  categoryEmoji: {
    fontSize: 32,
    marginBottom: mobileTheme.spacing[2]
  },
  categoryName: {
    color: mobileTheme.colors.text.primary,
    fontSize: mobileTheme.typography.fontSize.xs,
    fontWeight: FONT_WEIGHTS.semibold,
    textAlign: 'center'
  },

  // BRANDS / RISTORANTI (Look Premium)
  brandsList: {
    paddingHorizontal: mobileTheme.spacing[4]
  },
  brandCard: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.lg,
    marginBottom: mobileTheme.spacing[4],
    flexDirection: 'row',
    alignItems: 'center',
    ...mobileTheme.shadows.soft,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  brandEmoji: {
    fontSize: 40,
    marginRight: mobileTheme.spacing[4],
    backgroundColor: mobileTheme.colors.background, // Cerchio di sfondo per l'emoji
    padding: 10,
    borderRadius: 50,
    overflow: 'hidden'
  },
  brandInfo: {
    flex: 1
  },
  brandName: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: 2
  },
  brandDetails: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    lineHeight: 18
  },

  // BADGE DI CONSEGNA (Aggiuntivo se lo usi)
  deliveryBadge: {
    backgroundColor: mobileTheme.colors.primarySoft,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 6
  },
  deliveryText: {
    color: mobileTheme.colors.primary,
    fontSize: 10,
    fontWeight: FONT_WEIGHTS.bold
  }
});

export default shoppingScreenStyles;