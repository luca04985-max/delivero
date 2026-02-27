import { StyleSheet } from 'react-native';
import { mobileTheme } from '../../../theme';
import { unifiedStyles } from '../../../theme/UnifiedStyles';
import { BASE_SPACE, FONT_FAMILY, FONT_SIZE_BASE } from '../../../theme/StyleConstants.js';


export const createTicketScreenStyles = StyleSheet.create({
  // container: wrapper principale schermo
  container: unifiedStyles.container,

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

  // content: contenuto principale
  content: {
    flex: 1,
    padding: mobileTheme.spacing[5],
  },

  // orderSummary: riepilogo ordine selezionato
  orderSummary: {
    backgroundColor: mobileTheme.colors.background,
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.lg,
    borderLeftWidth: 4,
    borderLeftColor: mobileTheme.colors.secondary,
    marginBottom: mobileTheme.spacing[3],
  },
  // orderTitle: titolo blocco ordine
  orderTitle: {
    fontSize: mobileTheme.typography.fontSize.md,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[2],
  },
  // orderInfo: dettaglio ordine
  orderInfo: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    marginBottom: mobileTheme.spacing[1],
  },
  // orderStatus: stato ordine
  orderStatus: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.secondary,
    fontWeight: mobileTheme.typography.fontWeight.medium,
  },
  // removeOrderButton: rimuovi ordine selezionato
  removeOrderButton: {
    alignSelf: 'flex-start',
    paddingVertical: mobileTheme.spacing[2],
    paddingHorizontal: mobileTheme.spacing[3],
    backgroundColor: mobileTheme.colors.error,
    borderRadius: mobileTheme.borderRadius.sm,
  },
  // removeOrderText: testo rimuovi ordine
  removeOrderText: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.white,
    fontWeight: mobileTheme.typography.fontWeight.medium,
  },
  // selectOrderButton: selezione ordine
  selectOrderButton: {
    backgroundColor: mobileTheme.colors.background,
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.lg,
    borderWidth: 2,
    borderColor: mobileTheme.colors.secondary,
    borderStyle: 'dashed',
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[2],
  },
  // selectOrderText: testo selezione ordine
  selectOrderText: {
    fontSize: mobileTheme.typography.fontSize.md,
    color: mobileTheme.colors.secondary,
    fontWeight: mobileTheme.typography.fontWeight.medium,
  },
  // helperText: testo helper
  helperText: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.tertiary,
    fontStyle: 'italic',
  },

  // formGroup: blocco form
  formGroup: {
    marginBottom: mobileTheme.spacing[6],
  },
  // label: etichetta campo
  label: {
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
  // ticketTypeButtonActive: pill tipo attiva
  ticketTypeButtonActive: {
    backgroundColor: mobileTheme.colors.secondary,
    borderColor: mobileTheme.colors.secondary,
  },
  // ticketTypeText: testo tipo ticket
  ticketTypeText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.primary,
    fontWeight: mobileTheme.typography.fontWeight.medium,
  },
  // ticketTypeTextActive: testo tipo attivo
  ticketTypeTextActive: {
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

  // submitButton: CTA invio ticket
  submitButton: {
    ...unifiedStyles.button,
    marginTop: mobileTheme.spacing[4],
  },
  // submitButtonDisabled: stato disabilitato CTA
  submitButtonDisabled: unifiedStyles.disabledButton,
  // submitButtonText: testo CTA invio
  submitButtonText: unifiedStyles.buttonText,
});
