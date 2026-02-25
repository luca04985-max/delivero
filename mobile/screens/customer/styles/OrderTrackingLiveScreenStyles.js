import { StyleSheet, Platform } from 'react-native';
import { mobileTheme, FONT_WEIGHTS } from '../../../theme';
import { unifiedStyles } from '../../../theme/UnifiedStyles';
import { BASE_SPACE, FONT_FAMILY, FONT_SIZE_BASE } from '../../../theme/StyleConstants.js';


export const orderTrackingLiveScreenStyles = StyleSheet.create({
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
  // overlayContainer: area pulsanti flottanti sulla mappa
  overlayContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    right: mobileTheme.spacing[4],
    gap: mobileTheme.spacing[3],
  },
  // mapButton: pulsante singolo overlay
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
  // riderAvatar: avatar cerchio iniziali
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
  // statusIndicator: riga stato rider
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: BASE_SPACE * 0.250,
  },
  // statusDot: pallino stato attivo
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: BASE_SPACE * 0.500,
    backgroundColor: mobileTheme.colors.success,
    marginRight: BASE_SPACE * 0.750,
  },

  // LOADING STATE
  // center: stato loading su fondo chiaro
  center: {
    ...unifiedStyles.loadingContainer,
    backgroundColor: mobileTheme.colors.background,
  },
  // loadingText: testo loading principale
  loadingText: {
    ...unifiedStyles.loadingText,
    fontWeight: FONT_WEIGHTS.semibold,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  // loader: stato loading su fondo scuro
  loader: {
    ...unifiedStyles.loadingContainer,
    backgroundColor: mobileTheme.colors.secondary,
  },

  // ETA INFO BOX
  // etaInfoBox: box informazioni ETA
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
  // etaHeader: titolo box ETA
  etaHeader: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.primary,
    marginBottom: mobileTheme.spacing[2],
  },
  // etaRow: riga dettaglio ETA
  etaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[2],
  },
  // etaLabel: label dettaglio ETA
  etaLabel: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  },
  // etaValue: valore dettaglio ETA
  etaValue: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: FONT_WEIGHTS.semibold,
    color: mobileTheme.colors.text.primary,
  },
  // etaStatus: footer stato ETA
  etaStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: mobileTheme.spacing[2],
    borderTopWidth: 1,
    borderTopColor: mobileTheme.colors.border,
  },
  // statusText: testo stato ETA
  statusText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  },
});

export default orderTrackingLiveScreenStyles;
