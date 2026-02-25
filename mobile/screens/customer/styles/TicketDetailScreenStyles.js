import { StyleSheet } from 'react-native';
import { mobileTheme } from '../../../theme';
import { unifiedStyles } from '../../../theme/UnifiedStyles';
import { BASE_SPACE, FONT_FAMILY, FONT_SIZE_BASE } from '../../../theme/StyleConstants.js';


export const ticketDetailScreenStyles = StyleSheet.create({
  // container: wrapper principale schermo
  container: unifiedStyles.container,
  // scrollView: area scroll contenuti
  scrollView: unifiedStyles.scrollView,
  // loadingText: testo loading
  loadingText: unifiedStyles.loadingText,
  // errorText: messaggio errore/assenza dati
  errorText: {
    ...unifiedStyles.emptyText,
    marginTop: mobileTheme.spacing[8],
  },

  // headerCard: header ticket con dati principali
  headerCard: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[5],
    borderBottomWidth: 1,
    borderBottomColor: mobileTheme.colors.border,
    ...mobileTheme.shadows.sm,
  },
  // headerCardTop: riga top header
  headerCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[3],
  },
  // ticketId: id ticket
  ticketId: unifiedStyles.ticketId,
  // statusBadge: badge stato ticket
  statusBadge: unifiedStyles.statusBadge,
  // statusText: testo badge stato
  statusText: {
    ...unifiedStyles.statusText,
    color: mobileTheme.colors.white,
  },
  // titleCard: titolo/oggetto ticket
  titleCard: {
    fontSize: mobileTheme.typography.fontSize.xl,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[3],
    lineHeight: FONT_SIZE_BASE * 1.500,
  },
  // ticketMeta: riga meta (tipo/data)
  ticketMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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

  // section: card sezione contenuti
  section: unifiedStyles.section,
  // sectionTitle: titolo sezione
  sectionTitle: unifiedStyles.sectionTitle,
  // ticketDescription: descrizione ticket
  ticketDescription: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.primary,
    lineHeight: FONT_SIZE_BASE * 1.375,
  },

  // responseCard: card risposta
  responseCard: {
    backgroundColor: mobileTheme.colors.background,
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.md,
    marginBottom: mobileTheme.spacing[3],
    borderLeftWidth: 3,
    borderLeftColor: mobileTheme.colors.primary,
  },
  // responseHeader: header risposta
  responseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: mobileTheme.spacing[2],
  },
  // responseAuthorContainer: contenitore autore
  responseAuthorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  // responseAuthor: nome autore
  responseAuthor: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.text.primary,
    marginRight: mobileTheme.spacing[2],
  },
  // authorBadge: badge ruolo autore
  authorBadge: {
    backgroundColor: mobileTheme.colors.primary,
    paddingHorizontal: mobileTheme.spacing[2],
    paddingVertical: mobileTheme.spacing[1],
    borderRadius: mobileTheme.borderRadius.sm,
  },
  // authorBadgeText: testo badge autore
  authorBadgeText: {
    fontSize: mobileTheme.typography.fontSize.xs,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.white,
  },
  // responseDate: data risposta
  responseDate: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.tertiary,
  },
  // responseContentBox: contenitore testo risposta
  responseContentBox: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.sm,
    marginTop: mobileTheme.spacing[2],
  },
  // responseContent: testo risposta
  responseContent: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.primary,
    lineHeight: FONT_SIZE_BASE * 1.250,
  },
  // noResponsesContainer: wrapper senza risposte
  noResponsesContainer: {
    alignItems: 'center',
    padding: mobileTheme.spacing[6],
  },
  // noResponsesText: testo stato vuoto risposte
  noResponsesText: unifiedStyles.emptyText,
  // noResponsesSubtext: sottotesto stato vuoto
  noResponsesSubtext: unifiedStyles.emptySubtext,

  // descriptionBox: box descrizione evidenziata
  descriptionBox: {
    backgroundColor: mobileTheme.colors.background,
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.md,
    borderLeftWidth: 3,
    borderLeftColor: mobileTheme.colors.primary,
  },

  // responseForm: wrapper form risposta
  responseForm: {
    gap: mobileTheme.spacing[3],
  },
  // responseInput: input risposta
  responseInput: {
    ...unifiedStyles.input,
    minHeight: 100,
    textAlignVertical: 'top',
  },

  // actionsSection: area azioni ticket
  actionsSection: {
    padding: mobileTheme.spacing[4],
    borderTopWidth: 1,
    borderTopColor: mobileTheme.colors.border,
  },
  // actionButton: pulsante azione secondaria
  actionButton: {
    backgroundColor: mobileTheme.colors.background,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    borderRadius: mobileTheme.borderRadius.md,
    paddingVertical: mobileTheme.spacing[3],
    paddingHorizontal: mobileTheme.spacing[5],
    alignItems: 'center',
  },
  // actionButtonText: testo pulsante azione
  actionButtonText: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.medium,
    color: mobileTheme.colors.text.primary,
  },

  // backButton: CTA torna indietro
  backButton: {
    ...unifiedStyles.button,
    paddingHorizontal: mobileTheme.spacing[5],
    marginTop: mobileTheme.spacing[4],
  },
  // backButtonText: testo CTA back
  backButtonText: {
    ...unifiedStyles.buttonText,
    textTransform: 'none',
  },
  // submitButton: CTA invio risposta
  submitButton: {
    ...unifiedStyles.button,
    paddingHorizontal: mobileTheme.spacing[5],
  },
  // submitButtonDisabled: stato disabilitato invio
  submitButtonDisabled: unifiedStyles.disabledButton,
  // submitButtonText: testo CTA invio
  submitButtonText: unifiedStyles.buttonText,
});
