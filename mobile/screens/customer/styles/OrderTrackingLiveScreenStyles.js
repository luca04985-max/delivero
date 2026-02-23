import { StyleSheet, Platform } from 'react-native';
import { mobileTheme, FONT_WEIGHTS } from '../../../theme';

export const orderTrackingLiveScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mobileTheme.colors.secondary, // Navy profondo per il caricamento
  },
  map: {
    width: '100%',
    height: '100%',
  },

  // OVERLAY CONTROLS (Pulsanti che galleggiano sulla mappa)
  overlayContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    right: mobileTheme.spacing[4],
    gap: mobileTheme.spacing[3],
  },
  mapButton: {
    backgroundColor: mobileTheme.colors.white,
    width: 45,
    height: 45,
    borderRadius: mobileTheme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    ...mobileTheme.shadows.medium,
  },

  // RIDER INFO CARD (La scheda che appare in basso quando selezioni un rider)
  riderCard: {
    position: 'absolute',
    bottom: 30,
    left: mobileTheme.spacing[4],
    right: mobileTheme.spacing[4],
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.xl,
    flexDirection: 'row',
    alignItems: 'center',
    ...mobileTheme.shadows.xxl, // Ombra molto profonda per distacco netto
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  riderAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: mobileTheme.colors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: mobileTheme.spacing[4],
  },
  riderName: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.text.primary,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: mobileTheme.colors.success,
    marginRight: 6,
  },

  // LOADING STATE
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: mobileTheme.colors.background,
  },
  loadingText: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: '600',
    color: mobileTheme.colors.text.secondary,
    marginTop: mobileTheme.spacing[4],
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: mobileTheme.colors.secondary,
  },

  // ETA INFO BOX
  etaInfoBox: {
    position: 'absolute',
    bottom: mobileTheme.spacing[4],
    left: mobileTheme.spacing[4],
    right: mobileTheme.spacing[4],
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.xl,
    ...mobileTheme.shadows.xxl,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  etaHeader: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.primary,
    marginBottom: mobileTheme.spacing[2],
  },
  etaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[2],
  },
  etaLabel: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  },
  etaValue: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: FONT_WEIGHTS.semibold,
    color: mobileTheme.colors.text.primary,
  },
  etaStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: mobileTheme.spacing[2],
    borderTopWidth: 1,
    borderTopColor: mobileTheme.colors.border,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: mobileTheme.colors.success,
    marginRight: mobileTheme.spacing[2],
  },
  statusText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  }
});

export default orderTrackingLiveScreenStyles;