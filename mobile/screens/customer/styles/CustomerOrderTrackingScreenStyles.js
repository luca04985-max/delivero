import { StyleSheet } from 'react-native';
import { mobileTheme } from '../../../theme';
import { unifiedStyles } from '../../../theme/UnifiedStyles';
import { BASE_SPACE, FONT_FAMILY, FONT_SIZE_BASE } from '../../../theme/StyleConstants.js';


export const customerOrderTrackingScreenStyles = StyleSheet.create({
  // shared: base styles from unifiedStyles
  ...unifiedStyles,

  // header: header standard (CustomerOrderTrackingScreen.js)
  header: unifiedStyles.header,
  // headerContent: contenuto header (CustomerOrderTrackingScreen.js)
  headerContent: unifiedStyles.headerContent,
  // title: titolo header (CustomerOrderTrackingScreen.js)
  title: unifiedStyles.title,
  // statusBadge: badge stato ordine (CustomerOrderTrackingScreen.js)
  statusBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: mobileTheme.spacing[2],
    paddingHorizontal: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.xl,
  },
  // statusText: testo badge stato (CustomerOrderTrackingScreen.js)
  statusText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.white,
  },

  // Layout a schermo intero
  container: {
    flex: 1,
    position: 'relative',
  },

  // Mappa a schermo intero
  fullMapContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },

  fullMap: {
    flex: 1,
  },

  // Overlay flottante
  floatingDetailsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    elevation: 8,
    zIndex: 10,
  },

  floatingHeader: {
    marginBottom: mobileTheme.spacing[3],
  },

  // Container mappa esistente (per compatibilità)
  mapContainer: {
    height: 300,
    marginBottom: mobileTheme.spacing[4],
  },

  map: {
    flex: 1,
  },

  // mapLoader: overlay loader mappa (CustomerOrderTrackingScreen.js)
  mapLoader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // detailsContainer: box dettagli ordine (CustomerOrderTrackingScreen.js)
  detailsContainer: {
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

  // detailsHeader: header cliccabile per espansione (CustomerOrderTrackingScreen.js)
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[2],
  },

  // headerContent: contenuto header con titolo e ETA (CustomerOrderTrackingScreen.js)
  headerContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
  },

  // headerEta: ETA mostrato nell'header quando collassato (CustomerOrderTrackingScreen.js)
  headerEta: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.primary,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    marginTop: 2,
  },

  // expandIcon: icona freccia per espandere/collassare (CustomerOrderTrackingScreen.js)
  expandIcon: {
    fontSize: mobileTheme.typography.fontSize.lg,
    color: mobileTheme.colors.primary,
    fontWeight: 'bold',
  },
  // sectionTitle: titolo sezione (CustomerOrderTrackingScreen.js)
  sectionTitle: unifiedStyles.sectionTitle,
  // detailRow: riga dettaglio (CustomerOrderTrackingScreen.js)
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: mobileTheme.spacing[2],
    borderBottomWidth: 1,
    borderBottomColor: mobileTheme.colors.border,
  },
  // detailLabel: label dettaglio (CustomerOrderTrackingScreen.js)
  detailLabel: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.secondary,
    fontWeight: mobileTheme.typography.fontWeight.medium,
  },
  // detailValue: valore dettaglio (CustomerOrderTrackingScreen.js)
  detailValue: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.primary,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
  },

  // etaBox: box ETA (CustomerOrderTrackingScreen.js)
  etaBox: {
    backgroundColor: mobileTheme.colors.warning,
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.lg,
    marginTop: mobileTheme.spacing[3],
    borderLeftWidth: 4,
    borderLeftColor: mobileTheme.colors.warning,
  },
  // etaBoxTitle: titolo ETA (CustomerOrderTrackingScreen.js)
  etaBoxTitle: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.primary,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    marginBottom: mobileTheme.spacing[1],
  },
  // etaBoxValue: valore ETA (CustomerOrderTrackingScreen.js)
  etaBoxValue: {
    fontSize: mobileTheme.typography.fontSize['2xl'],
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
  },

  // refreshButton: bottone refresh (CustomerOrderTrackingScreen.js)
  refreshButton: {
    marginHorizontal: mobileTheme.spacing[5],
    marginVertical: mobileTheme.spacing[3],
    paddingVertical: mobileTheme.spacing[4],
    backgroundColor: mobileTheme.colors.primary,
    borderRadius: mobileTheme.borderRadius.lg,
    alignItems: 'center',
    ...mobileTheme.shadows.soft,
  },
  // refreshButtonText: testo bottone refresh (CustomerOrderTrackingScreen.js)
  refreshButtonText: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.white,
  },

  // loadingContainer/loadingText: usa unifiedStyles (CustomerOrderTrackingScreen.js)

  // errorContainer: wrapper errore (CustomerOrderTrackingScreen.js)
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: mobileTheme.spacing[5],
  },
  // errorText: testo errore (CustomerOrderTrackingScreen.js)
  errorText: {
    fontSize: mobileTheme.typography.fontSize.lg,
    color: mobileTheme.colors.error,
    textAlign: 'center',
    marginBottom: mobileTheme.spacing[4],
  },

  // riderInfoContainer: box info rider (CustomerOrderTrackingScreen.js)
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
  // riderName: nome rider (CustomerOrderTrackingScreen.js)
  riderName: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[2],
  },
  // riderPhone: telefono rider (CustomerOrderTrackingScreen.js)
  riderPhone: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.secondary,
  },
  // contactButton: bottone contatta rider (CustomerOrderTrackingScreen.js)
  contactButton: {
    backgroundColor: mobileTheme.colors.success,
    paddingVertical: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.md,
    alignItems: 'center',
    marginTop: mobileTheme.spacing[3],
  },
  // contactButtonText: testo bottone contatto (CustomerOrderTrackingScreen.js)
  contactButtonText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.white,
  },
});

export default customerOrderTrackingScreenStyles;

// Web-specific styles (plain JS objects) used by the leaflet web renderer
export const customerOrderTrackingWebStyles = {
  leafletDiv: {
    width: '100%',
    height: 400,
    borderRadius: 12,
    overflow: 'hidden',
  },
};
