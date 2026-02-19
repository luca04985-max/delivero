import { StyleSheet, Platform } from 'react-native';
import { mobileTheme } from '../../../theme';

export const customerHomeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mobileTheme.colors.background,
  },

  // HEADER CON TOGGLE MAPPA
  header: {
    backgroundColor: mobileTheme.colors.secondary, // Navy profondo
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: mobileTheme.spacing[4],
    paddingHorizontal: mobileTheme.spacing[5],
    borderBottomLeftRadius: mobileTheme.borderRadius.xl,
    borderBottomRightRadius: mobileTheme.borderRadius.xl,
    ...mobileTheme.shadows.medium,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: mobileTheme.typography.fontSize['2xl'],
    fontWeight: mobileTheme.typography.fontWeight.black,
    color: mobileTheme.colors.white,
    marginBottom: mobileTheme.spacing[2],
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.tertiary,
    opacity: 0.9,
  },
  mapToggleBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: mobileTheme.spacing[2],
    paddingHorizontal: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.xl,
  },

  // SEZIONI
  whiteSection: {
    backgroundColor: mobileTheme.colors.white,
    paddingVertical: mobileTheme.spacing[4],
    marginBottom: mobileTheme.spacing[3],
  },
  section: {
    marginBottom: mobileTheme.spacing[5],
  },
  sectionTitle: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    marginHorizontal: mobileTheme.spacing[5],
    marginBottom: mobileTheme.spacing[4],
  },

  // SERVIZI CIRCLE
  serviceCircle: {
    alignItems: 'center',
    marginRight: mobileTheme.spacing[5],
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: mobileTheme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[2],
    borderWidth: 2,
    borderColor: mobileTheme.colors.border,
  },
  serviceText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.medium,
    color: mobileTheme.colors.text.secondary,
  },

  // SEARCH BAR
  searchSection: {
    paddingHorizontal: mobileTheme.spacing[5],
    paddingVertical: mobileTheme.spacing[4],
    backgroundColor: mobileTheme.colors.background,
  },
  searchInput: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.lg,
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.primary,
    ...mobileTheme.shadows.soft,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },

  // CATEGORIE PILLS
  categoryPill: {
    backgroundColor: mobileTheme.colors.primary,
    paddingHorizontal: mobileTheme.spacing[5],
    paddingVertical: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.full,
    marginRight: mobileTheme.spacing[3],
  },
  categoryText: {
    color: mobileTheme.colors.white,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    fontSize: mobileTheme.typography.fontSize.sm,
  },

  // RESTAURANT CARDS
  restCard: {
    backgroundColor: mobileTheme.colors.white,
    marginHorizontal: mobileTheme.spacing[5],
    marginBottom: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.lg,
    padding: mobileTheme.spacing[4],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...mobileTheme.shadows.soft,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  restInfo: {
    flex: 1,
  },
  restName: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[1],
  },
  restSub: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    marginTop: mobileTheme.spacing[1],
  },
  restBadge: {
    backgroundColor: mobileTheme.colors.surface,
    padding: mobileTheme.spacing[2],
    borderRadius: mobileTheme.borderRadius.md,
  },
  badgeText: {
    color: mobileTheme.colors.primary,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    fontSize: mobileTheme.typography.fontSize.sm,
  },

  // MAPPA
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  mapLoader: {
    position: 'absolute',
    top: mobileTheme.spacing[5],
    right: mobileTheme.spacing[5],
  },
});

export default customerHomeScreenStyles;
