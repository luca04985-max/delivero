import { StyleSheet, Platform } from 'react-native';
import { mobileTheme } from '../../../theme';

export const customerOrderTrackingScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mobileTheme.colors.background,
  },

  // HEADER
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
    letterSpacing: -0.5,
  },
  statusBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: mobileTheme.spacing[2],
    paddingHorizontal: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.xl,
  },
  statusText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.white,
  },

  // MAP CONTAINER
  mapContainer: {
    flex: 1,
    marginHorizontal: mobileTheme.spacing[5],
    marginVertical: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: mobileTheme.colors.surface,
    ...mobileTheme.shadows.soft,
  },
  map: {
    flex: 1,
  },
  mapLoader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // DETAILS CONTAINER
  detailsContainer: {
    paddingHorizontal: mobileTheme.spacing[5],
    paddingVertical: mobileTheme.spacing[4],
    backgroundColor: mobileTheme.colors.white,
    marginHorizontal: mobileTheme.spacing[5],
    marginVertical: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.lg,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    ...mobileTheme.shadows.soft,
  },
  sectionTitle: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[3],
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: mobileTheme.spacing[2],
    borderBottomWidth: 1,
    borderBottomColor: mobileTheme.colors.border,
  },
  detailLabel: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.secondary,
    fontWeight: mobileTheme.typography.fontWeight.medium,
  },
  detailValue: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.primary,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
  },

  // ETA BOX
  etaBox: {
    backgroundColor: mobileTheme.colors.warning,
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.lg,
    marginTop: mobileTheme.spacing[3],
    borderLeftWidth: 4,
    borderLeftColor: mobileTheme.colors.warning,
  },
  etaBoxTitle: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.primary,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    marginBottom: mobileTheme.spacing[1],
  },
  etaBoxValue: {
    fontSize: mobileTheme.typography.fontSize['2xl'],
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
  },

  // REFRESH BUTTON
  refreshButton: {
    marginHorizontal: mobileTheme.spacing[5],
    marginVertical: mobileTheme.spacing[3],
    paddingVertical: mobileTheme.spacing[4],
    backgroundColor: mobileTheme.colors.primary,
    borderRadius: mobileTheme.borderRadius.lg,
    alignItems: 'center',
    ...mobileTheme.shadows.soft,
  },
  refreshButtonText: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.white,
  },

  // LOADING STATES
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.secondary,
    marginTop: mobileTheme.spacing[4],
  },

  // ERROR STATE
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: mobileTheme.spacing[5],
  },
  errorText: {
    fontSize: mobileTheme.typography.fontSize.lg,
    color: mobileTheme.colors.error,
    textAlign: 'center',
    marginBottom: mobileTheme.spacing[4],
  },

  // RIDER INFO
  riderInfoContainer: {
    backgroundColor: mobileTheme.colors.white,
    marginHorizontal: mobileTheme.spacing[5],
    marginVertical: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.lg,
    padding: mobileTheme.spacing[5],
    ...mobileTheme.shadows.soft,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  riderName: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[2],
  },
  riderPhone: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.secondary,
  },
  contactButton: {
    backgroundColor: mobileTheme.colors.success,
    paddingVertical: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.md,
    alignItems: 'center',
    marginTop: mobileTheme.spacing[3],
  },
  contactButtonText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.white,
  },
});

export default customerOrderTrackingScreenStyles;
