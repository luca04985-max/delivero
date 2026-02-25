import { StyleSheet } from 'react-native';
import { mobileTheme, FONT_WEIGHTS } from '../../../theme';
import { unifiedStyles } from '../../../theme/UnifiedStyles';
import { BASE_SPACE, FONT_FAMILY, FONT_SIZE_BASE } from '../../../theme/StyleConstants.js';


export const adminDashboardTicketsStyles = StyleSheet.create({
  ...unifiedStyles,

  // ticketsContainer: wrapper lista ticket
  ticketsContainer: {
    padding: mobileTheme.spacing[4],
  },

  // statusOpen: ticket aperto
  statusOpen: {
    backgroundColor: mobileTheme.colors.successBg,
    color: mobileTheme.colors.success,
  },
  // statusInProgress: ticket in lavorazione
  statusInProgress: {
    backgroundColor: mobileTheme.colors.warningBg,
    color: mobileTheme.colors.warning,
  },
  // statusClosed: ticket chiuso
  statusClosed: {
    backgroundColor: mobileTheme.colors.text.tertiary,
    color: mobileTheme.colors.text.secondary,
  },
  // statusResolved: ticket risolto
  statusResolved: {
    backgroundColor: mobileTheme.colors.primarySoft,
    color: mobileTheme.colors.primary,
  },

  // priorityHigh: priorità alta
  priorityHigh: {
    backgroundColor: mobileTheme.colors.errorBg,
    color: mobileTheme.colors.error,
  },
  // priorityMedium: priorità media
  priorityMedium: {
    backgroundColor: mobileTheme.colors.warningBg,
    color: mobileTheme.colors.warning,
  },
  // priorityLow: priorità bassa
  priorityLow: {
    backgroundColor: mobileTheme.colors.primarySoft,
    color: mobileTheme.colors.primary,
  },

  // ticketMeta: riga meta (tipo/data)
  ticketMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: mobileTheme.spacing[2],
  },
  // ticketType: tipo ticket
  ticketType: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    fontWeight: mobileTheme.typography.fontWeight.medium,
  },
  // ticketDate: data ticket
  ticketDate: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.tertiary,
  },

  // orderInfo: riepilogo ordine nel ticket
  orderInfo: {
    backgroundColor: mobileTheme.colors.primarySoft,
    padding: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.md,
    marginBottom: mobileTheme.spacing[3],
    borderLeftWidth: 3,
    borderLeftColor: mobileTheme.colors.primary,
  },
  // orderLabel: label ordine
  orderLabel: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.primary,
    fontWeight: FONT_WEIGHTS.bold,
    marginBottom: mobileTheme.spacing[1],
  },
  // orderId: id ordine
  orderId: {
    fontSize: mobileTheme.typography.fontSize.md,
    color: mobileTheme.colors.text.primary,
    fontWeight: FONT_WEIGHTS.bold,
  },

  // userInfo: info utente
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: mobileTheme.spacing[3],
    padding: mobileTheme.spacing[3],
    backgroundColor: mobileTheme.colors.background,
    borderRadius: mobileTheme.borderRadius.md,
  },
  // userName: nome utente
  userName: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.text.primary,
  },
  // userEmail: email utente
  userEmail: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  },

  // priorityBadge: badge priorità
  priorityBadge: {
    paddingHorizontal: mobileTheme.spacing[2],
    paddingVertical: mobileTheme.spacing[1],
    borderRadius: mobileTheme.borderRadius.sm,
    alignSelf: 'flex-start',
    marginBottom: mobileTheme.spacing[2],
  },
  // priorityText: testo badge priorità
  priorityText: {
    fontSize: mobileTheme.typography.fontSize.xs,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.white,
    textTransform: 'uppercase',
  },

  // descriptionContainer: contenitore descrizione
  descriptionContainer: {
    marginBottom: mobileTheme.spacing[3],
  },
  // descriptionText: testo descrizione
  descriptionText: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.primary,
    lineHeight: FONT_SIZE_BASE * 1.375,
  },

  // actionsContainer: barra azioni
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: mobileTheme.spacing[3],
  },
  // actionButton: pulsante azione
  actionButton: {
    backgroundColor: mobileTheme.colors.background,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    borderRadius: mobileTheme.borderRadius.md,
    paddingVertical: mobileTheme.spacing[2],
    paddingHorizontal: mobileTheme.spacing[3],
    alignItems: 'center',
    minWidth: 80,
  },
  // actionButtonText: testo azione
  actionButtonText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.medium,
    color: mobileTheme.colors.text.primary,
  },

  // statusIndicator: indicatore stato
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: mobileTheme.spacing[2],
  },
  // statusDot: pallino stato base
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: BASE_SPACE * 0.500,
    marginRight: mobileTheme.spacing[2],
  },
  // statusDotOpen: pallino stato aperto
  statusDotOpen: {
    backgroundColor: mobileTheme.colors.success,
  },
  // statusDotInProgress: pallino stato in corso
  statusDotInProgress: {
    backgroundColor: mobileTheme.colors.warning,
  },
  // statusDotClosed: pallino stato chiuso
  statusDotClosed: {
    backgroundColor: mobileTheme.colors.text.tertiary,
  },
  // statusDotResolved: pallino stato risolto
  statusDotResolved: {
    backgroundColor: mobileTheme.colors.primary,
  },

  // timestampContainer: riga timestamp
  timestampContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: mobileTheme.spacing[2],
    paddingTop: mobileTheme.spacing[2],
    borderTopWidth: 1,
    borderTopColor: mobileTheme.colors.border,
  },
  // timestamp: testo timestamp
  timestamp: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.tertiary,
  },
  // createdTimestamp: timestamp creazione
  createdTimestamp: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.tertiary,
  },

  // emptyContainer: stato vuoto ticket
  emptyContainer: unifiedStyles.emptyContainer,
  // emptyText: testo stato vuoto
  emptyText: unifiedStyles.emptyText,
  // emptySubtext: sottotesto stato vuoto
  emptySubtext: unifiedStyles.emptySubtext,

  // loadingContainer: stato loading
  loadingContainer: unifiedStyles.loadingContainer,
  // loadingText: testo loading
  loadingText: unifiedStyles.loadingText,
});

export default adminDashboardTicketsStyles;
