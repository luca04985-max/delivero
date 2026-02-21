import { StyleSheet } from 'react-native';
import { mobileTheme } from '../../../theme';

export const orderTrackingLiveScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mobileTheme.colors.background,
  },
  
  // INLINE STYLES FROM OrderTrackingLiveScreen.js
  infoBox: {
    position: 'absolute',
    bottom: mobileTheme.spacing[5],
    left: mobileTheme.spacing[5],
    right: mobileTheme.spacing[5],
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[5],
    borderRadius: mobileTheme.borderRadius.lg,
    ...mobileTheme.shadows.medium,
  },
  statusText: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.primary,
    marginBottom: mobileTheme.spacing[3],
  },
  mapLoader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: mobileTheme.colors.background,
  },
  loadingText: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.secondary,
    marginTop: mobileTheme.spacing[3],
  },
  
  // MAP CONTAINER
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  
  // STATUS INFO
  statusContainer: {
    marginBottom: mobileTheme.spacing[3],
  },
  statusLabel: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    marginBottom: mobileTheme.spacing[1],
  },
  statusValue: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.text.primary,
  },
  
  // ETA INFO
  etaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: mobileTheme.spacing[3],
    borderTopWidth: 1,
    borderTopColor: mobileTheme.colors.border,
  },
  etaLabel: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  },
  etaValue: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.primary,
  },
  
  // DELIVERY ADDRESS
  addressContainer: {
    marginBottom: mobileTheme.spacing[3],
  },
  addressLabel: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    marginBottom: mobileTheme.spacing[1],
  },
  addressText: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.primary,
    lineHeight: 20,
  },
  
  // RIDER INFO
  riderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[3],
  },
  riderAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: mobileTheme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: mobileTheme.spacing[3],
  },
  riderAvatarText: {
    color: mobileTheme.colors.white,
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.bold,
  },
  riderInfo: {
    flex: 1,
  },
  riderName: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.text.primary,
  },
  riderStatus: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  },
  
  // ERROR STATE
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: mobileTheme.spacing[5],
  },
  errorText: {
    fontSize: mobileTheme.typography.fontSize.lg,
    color: mobileTheme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: mobileTheme.spacing[3],
  },
  errorSubtext: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.tertiary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  retryButton: {
    backgroundColor: mobileTheme.colors.primary,
    paddingHorizontal: mobileTheme.spacing[6],
    paddingVertical: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.md,
    ...mobileTheme.shadows.sm,
  },
  retryButtonText: {
    color: mobileTheme.colors.white,
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.bold,
  },
});

export default orderTrackingLiveScreenStyles;
