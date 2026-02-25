import { StyleSheet } from 'react-native';
import { mobileTheme } from '../../../theme';
import { unifiedStyles } from '../../../theme/UnifiedStyles';

export const createTicketScreenStyles = StyleSheet.create({
  // container: wrapper principale schermata
  container: unifiedStyles.container,

  // toast: contenitore toast di feedback
  toast: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    padding: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.md,
    zIndex: 1000,
    ...mobileTheme.shadows.medium,
  },
  // toastText: testo toast
  toastText: {
    color: mobileTheme.colors.white,
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.medium,
    textAlign: 'center',
  },

  // header: barra superiore
  header: {
    ...unifiedStyles.header,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  // backButton: touch area back
  backButton: {
    paddingVertical: mobileTheme.spacing[2],
    paddingHorizontal: mobileTheme.spacing[3],
  },
  // backButtonText: testo back
  backButtonText: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.medium,
    color: mobileTheme.colors.white,
  },
  // title: titolo header centrato
  title: {
    ...unifiedStyles.title,
    flex: 1,
    textAlign: 'center',
    marginRight: mobileTheme.spacing[8], // Compensa il pulsante indietro
  },

  // content: wrapper contenuto scroll
  content: {
    flex: 1,
  },
  // contentContainer: padding interno contenuti
  contentContainer: {
    padding: mobileTheme.spacing[5],
  },

  // orderInfo: riepilogo ordine
  orderInfo: {
    backgroundColor: mobileTheme.colors.background,
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.lg,
    borderLeftWidth: 4,
    borderLeftColor: mobileTheme.colors.primary,
    marginBottom: mobileTheme.spacing[4],
    ...mobileTheme.shadows.sm,
  },
  // orderInfoTitle: titolo riepilogo
  orderInfoTitle: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.primary,
    marginBottom: mobileTheme.spacing[2],
  },
  // orderInfoText: testo riepilogo
  orderInfoText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.primary,
    fontWeight: mobileTheme.typography.fontWeight.medium,
    marginBottom: mobileTheme.spacing[1],
  },
  // orderInfoSubtext: sottotesto riepilogo
  orderInfoSubtext: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.tertiary,
  },

  // section: blocco sezione
  section: {
    marginBottom: mobileTheme.spacing[6],
  },
  // sectionTitle: titolo sezione
  sectionTitle: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[3],
  },

  // ticketTypesContainer: contenitore tipi ticket
  ticketTypesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: mobileTheme.spacing[3],
  },
  // ticketTypeButton: pill tipo ticket
  ticketTypeButton: {
    backgroundColor: mobileTheme.colors.white,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    borderRadius: mobileTheme.borderRadius.md,
    paddingVertical: mobileTheme.spacing[3],
    paddingHorizontal: mobileTheme.spacing[4],
    ...mobileTheme.shadows.sm,
  },
  // ticketTypeButtonSelected: pill tipo selezionato
  ticketTypeButtonSelected: {
    backgroundColor: mobileTheme.colors.primary,
    borderColor: mobileTheme.colors.primary,
  },
  // ticketTypeButtonText: testo tipo ticket
  ticketTypeButtonText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.primary,
    fontWeight: mobileTheme.typography.fontWeight.medium,
  },
  // ticketTypeButtonTextSelected: testo tipo selezionato
  ticketTypeButtonTextSelected: {
    color: mobileTheme.colors.white,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
  },

  // input: campo testo base
  input: unifiedStyles.textInput,
  // textArea: textarea descrizione
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  // charCount: contatore caratteri
  charCount: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.tertiary,
    textAlign: 'right',
    marginTop: mobileTheme.spacing[2],
    fontStyle: 'italic',
  },

  // orderSummary: riepilogo ordine legacy
  orderSummary: {
    backgroundColor: mobileTheme.colors.background,
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.lg,
    borderLeftWidth: 4,
    borderLeftColor: mobileTheme.colors.primary,
    marginBottom: mobileTheme.spacing[3],
  },
  // orderTitle: titolo ordine legacy
  orderTitle: {
    fontSize: mobileTheme.typography.fontSize.md,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[2],
  },
  // orderStatus: stato ordine legacy
  orderStatus: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.primary,
    fontWeight: mobileTheme.typography.fontWeight.medium,
  },
  // removeOrderButton: rimuovi ordine legacy
  removeOrderButton: {
    alignSelf: 'flex-start',
    paddingVertical: mobileTheme.spacing[2],
    paddingHorizontal: mobileTheme.spacing[3],
    backgroundColor: mobileTheme.colors.error,
    borderRadius: mobileTheme.borderRadius.sm,
  },
  // removeOrderText: testo rimuovi legacy
  removeOrderText: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.white,
    fontWeight: mobileTheme.typography.fontWeight.medium,
  },
  // selectOrderButton: selezione ordine legacy
  selectOrderButton: {
    backgroundColor: mobileTheme.colors.background,
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.lg,
    borderWidth: 2,
    borderColor: mobileTheme.colors.primary,
    borderStyle: 'dashed',
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[2],
  },
  // selectOrderText: testo selezione legacy
  selectOrderText: {
    fontSize: mobileTheme.typography.fontSize.md,
    color: mobileTheme.colors.primary,
    fontWeight: mobileTheme.typography.fontWeight.medium,
  },
  // helperText: testo helper legacy
  helperText: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.tertiary,
    fontStyle: 'italic',
  },

  // formGroup: blocco form legacy
  formGroup: {
    marginBottom: mobileTheme.spacing[6],
  },
  // label: etichetta campo legacy
  label: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[3],
  },

  // submitButton: CTA invio ticket
  submitButton: {
    ...unifiedStyles.button,
    marginTop: mobileTheme.spacing[4],
  },
  // submitButtonDisabled: stato disabilitato CTA
  submitButtonDisabled: unifiedStyles.disabledButton,
  // submitButtonText: testo CTA invio
  submitButtonText: unifiedStyles.buttonText,

  // modalContainer: wrapper modale ordini
  modalContainer: unifiedStyles.container,
  // modalHeader: header modale
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: mobileTheme.spacing[5],
    backgroundColor: mobileTheme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: mobileTheme.colors.border,
    ...mobileTheme.shadows.md,
    elevation: 4,
  },
  // modalTitle: titolo modale
  modalTitle: {
    fontSize: mobileTheme.typography.fontSize.xl,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    flex: 1,
  },
  // closeButton: bottone chiusura modale
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: mobileTheme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    ...mobileTheme.shadows.sm,
  },
  // closeButtonText: testo bottone chiusura
  closeButtonText: {
    fontSize: mobileTheme.typography.fontSize.lg,
    color: mobileTheme.colors.text.tertiary,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    lineHeight: 20,
  },
  // emptyState: stato vuoto modale
  emptyState: unifiedStyles.emptyContainer,
  // emptyStateText: testo stato vuoto modale
  emptyStateText: unifiedStyles.emptySubtext,
  // orderList: lista ordini
  orderList: {
    padding: mobileTheme.spacing[4],
    flexGrow: 1,
  },
  // orderItem: card ordine selezionabile
  orderItem: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[4],
    marginBottom: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...mobileTheme.shadows.md,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: mobileTheme.colors.primary,
  },
  // orderItemContent: contenuto ordine
  orderItemContent: {
    flex: 1,
    marginRight: mobileTheme.spacing[3],
  },
  // orderItemTitle: titolo ordine
  orderItemTitle: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[2],
    lineHeight: 20,
  },
  // orderItemDate: data ordine
  orderItemDate: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.tertiary,
    marginBottom: mobileTheme.spacing[1],
  },
  // orderItemStatus: badge stato ordine
  orderItemStatus: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.primary,
    fontWeight: mobileTheme.typography.fontWeight.medium,
    backgroundColor: mobileTheme.colors.background,
    paddingHorizontal: mobileTheme.spacing[2],
    paddingVertical: mobileTheme.spacing[1],
    borderRadius: mobileTheme.borderRadius.sm,
    alignSelf: 'flex-start',
  },
  // orderItemPrice: prezzo ordine
  orderItemPrice: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.primary,
    backgroundColor: mobileTheme.colors.background,
    paddingHorizontal: mobileTheme.spacing[3],
    paddingVertical: mobileTheme.spacing[2],
    borderRadius: mobileTheme.borderRadius.md,
    minWidth: 80,
    textAlign: 'center',
  },
});

export default createTicketScreenStyles;
