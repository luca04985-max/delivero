import { StyleSheet, Platform } from 'react-native';
import { mobileTheme, FONT_WEIGHTS } from '../../../theme';
import { unifiedStyles } from '../../../theme/UnifiedStyles';
import { BASE_SPACE, FONT_FAMILY, FONT_SIZE_BASE } from '../../../theme/StyleConstants.js';


export const managerRealTimeMapScreenStyles = StyleSheet.create({
  // container: wrapper principale (sfondo mappa)
  container: {
    flex: 1,
    backgroundColor: mobileTheme.colors.secondary, // Navy profondo per il caricamento
  },
  // map: mappa full screen
  map: {
    width: '100%',
    height: '100%',
  },

  // OVERLAY CONTROLS (Pulsanti che galleggiano sulla mappa)
  // overlayContainer: area pulsanti flottanti
  overlayContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    right: mobileTheme.spacing[4],
    gap: mobileTheme.spacing[3],
  },
  // mapButton: pulsante overlay
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
  // riderCard: card info rider in basso
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
  // riderAvatar: avatar rider
  riderAvatar: {
    width: 50,
    height: 50,
    borderRadius: BASE_SPACE * 3.125,
    backgroundColor: mobileTheme.colors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: mobileTheme.spacing[4],
  },
  // riderName: nome rider
  riderName: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.text.primary,
  },
  // statusIndicator: stato rider
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: BASE_SPACE * 0.250,
  },
  // statusDot: pallino stato
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: BASE_SPACE * 0.500,
    backgroundColor: mobileTheme.colors.success,
    marginRight: BASE_SPACE * 0.750,
  },

  // center: stato loading su fondo chiaro
  center: {
    ...unifiedStyles.loadingContainer,
    backgroundColor: mobileTheme.colors.background,
  },
  // loadingText: testo loading
  loadingText: {
    ...unifiedStyles.loadingText,
    fontWeight: FONT_WEIGHTS.semibold,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});

export default managerRealTimeMapScreenStyles;
