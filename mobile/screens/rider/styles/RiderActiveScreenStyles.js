import { StyleSheet, Platform } from 'react-native';
import { mobileTheme } from '../../../theme';

export const riderActiveScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mobileTheme.colors.background,
  },
  content: {
    padding: mobileTheme.spacing[4],
  },
  // CARD PRINCIPALE (Focus sull'ordine corrente)
  activeCard: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[5],
    borderRadius: mobileTheme.borderRadius.xl,
    marginBottom: mobileTheme.spacing[4],
    // Rimuoviamo il bordo laterale sottile per un'ombra più marcata che dà profondità
    ...mobileTheme.shadows.medium,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },

  // STATUS CON COLORE DINAMICO
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: mobileTheme.spacing[3],
    paddingVertical: mobileTheme.spacing[1],
    borderRadius: mobileTheme.borderRadius.full,
    marginBottom: mobileTheme.spacing[3],
    backgroundColor: mobileTheme.colors.primarySoft,
  },
  statusText: {
    fontSize: 10,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.primary,
    textTransform: 'uppercase',
  },

  // INFO ORDINE
  orderTitle: {
    fontSize: mobileTheme.typography.fontSize.xl,
    fontWeight: mobileTheme.typography.fontWeight.black,
    color: mobileTheme.colors.text.primary,
    marginBottom: 2,
  },
  addressBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: mobileTheme.spacing[2],
  },
  addressText: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.secondary,
    marginLeft: 8,
  },

  // PULSANTI AZIONE (Grandi e facili da premere)
  actionGrid: {
    flexDirection: 'row',
    marginTop: mobileTheme.spacing[5],
    gap: mobileTheme.spacing[2], // Uso di gap per spaziatura uniforme (RN 0.71+)
  },
  btnAction: {
    paddingVertical: mobileTheme.spacing[4], // Più alto per facilitare il tocco con i guanti/all'aperto
    borderRadius: mobileTheme.borderRadius.lg,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    ...mobileTheme.shadows.soft,
  },
  btnPickup: { backgroundColor: mobileTheme.colors.warning },
  btnTransit: { backgroundColor: mobileTheme.colors.secondary },
  btnComplete: {
    backgroundColor: mobileTheme.colors.success,
    flex: 1.5, // Più importanza all'azione finale
  },
  btnText: {
    color: mobileTheme.colors.white,
    fontWeight: mobileTheme.typography.fontWeight.black,
    fontSize: 13,
    textTransform: 'uppercase',
  },

  // ELEMENTO MAPPA RAPIDA (Mini preview)
  miniMap: {
    height: 150,
    backgroundColor: mobileTheme.colors.border,
    borderRadius: mobileTheme.borderRadius.lg,
    marginTop: mobileTheme.spacing[4],
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default riderActiveScreenStyles;