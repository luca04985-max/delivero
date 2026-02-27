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

  // Pannello info espandibile (come nel customer)
  infoContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    paddingHorizontal: mobileTheme.spacing[4],
    paddingVertical: mobileTheme.spacing[3],
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: mobileTheme.borderRadius.lg,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 10,
  },

  // Header cliccabile per espansione
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[2],
  },

  // Titolo del pannello info
  infoTitle: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
  },

  // headerContent: contenuto header con titolo e ETA (ManagerRealTimeMapScreen.js)
  headerContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
  },

  // headerEta: ETA mostrato nell'header quando collassato (ManagerRealTimeMapScreen.js)
  headerEta: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.secondary,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    marginTop: 2,
  },

  // Icona espansione
  expandIcon: {
    fontSize: mobileTheme.typography.fontSize.lg,
    color: mobileTheme.colors.secondary,
    fontWeight: 'bold',
  },

  // Riga dettaglio
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: mobileTheme.spacing[2],
    borderBottomWidth: 1,
    borderBottomColor: mobileTheme.colors.border,
  },

  // Label dettaglio
  infoLabel: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    fontWeight: mobileTheme.typography.fontWeight.medium,
  },

  // Valore dettaglio
  infoValue: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.primary,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
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
    backgroundColor: mobileTheme.colors.secondarySoft,
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
