import { StyleSheet } from 'react-native';
import { mobileTheme } from '../../../theme';
import { unifiedStyles } from '../../../theme/UnifiedStyles';
import { BASE_SPACE, FONT_FAMILY, FONT_SIZE_BASE } from '../../../theme/StyleConstants.js';


export const medicalTransportScreenStyles = StyleSheet.create({
  // container: wrapper principale della schermata
  container: unifiedStyles.container,

  // input: campo testo base del form
  input: {
    ...unifiedStyles.input,
    marginBottom: mobileTheme.spacing[4],
    backgroundColor: mobileTheme.colors.white,
  },
  // btn: bottone generico (azioni rapide)
  btn: {
    ...unifiedStyles.button,
    borderRadius: mobileTheme.borderRadius.lg,
  },
  // btnText: etichetta bottone generico
  btnText: {
    ...unifiedStyles.buttonText,
    textTransform: 'none',
  },

  // header: header principale della schermata
  header: unifiedStyles.header,
  // headerContent: layout contenuti header
  headerContent: unifiedStyles.headerContent,
  // title: titolo principale header
  title: unifiedStyles.title,

  // emergencyCard: card dedicata alle urgenze
  emergencyCard: {
    backgroundColor: mobileTheme.colors.errorBg,
    borderRadius: mobileTheme.borderRadius.xl,
    padding: mobileTheme.spacing[5],
    margin: mobileTheme.spacing[5],
    ...mobileTheme.shadows.medium,
    borderWidth: 2,
    borderColor: mobileTheme.colors.error,
  },
  // emergencyHeader: riga header della card emergenza
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[4],
  },
  // emergencyIcon: icona/emoticon emergenza
  emergencyIcon: {
    fontSize: FONT_SIZE_BASE * 2,
    marginRight: mobileTheme.spacing[3],
  },
  // emergencyTitle: titolo card emergenza
  emergencyTitle: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.error,
    flex: 1,
  },
  // emergencyDescription: descrizione card emergenza
  emergencyDescription: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: FONT_SIZE_BASE * 1.250,
  },

  // bookingCard: contenitore form prenotazione
  bookingCard: {
    backgroundColor: mobileTheme.colors.white,
    borderRadius: mobileTheme.borderRadius.xl,
    padding: mobileTheme.spacing[5],
    margin: mobileTheme.spacing[5],
    ...mobileTheme.shadows.medium,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  // bookingTitle: titolo sezione prenotazione
  bookingTitle: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[4],
  },
  // formGroup: wrapper singolo campo
  formGroup: {
    marginBottom: mobileTheme.spacing[4],
  },
  // formLabel: label campo form
  formLabel: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[2],
  },
  // textInput: input elevato per campi descrittivi
  textInput: unifiedStyles.textInput,

  // optionsContainer: wrapper elenco opzioni trasporto
  optionsContainer: {
    marginTop: mobileTheme.spacing[4],
  },
  // optionCard: card singola opzione trasporto
  optionCard: {
    backgroundColor: mobileTheme.colors.white,
    borderRadius: mobileTheme.borderRadius.lg,
    padding: mobileTheme.spacing[4],
    marginBottom: mobileTheme.spacing[3],
    flexDirection: 'row',
    alignItems: 'center',
    ...mobileTheme.shadows.soft,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  // optionIcon: icona/emoji opzione
  optionIcon: {
    fontSize: FONT_SIZE_BASE * 1.500,
    marginRight: mobileTheme.spacing[3],
  },
  // optionInfo: contenitore info opzione
  optionInfo: {
    flex: 1,
  },
  // optionName: nome opzione
  optionName: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.text.primary,
    marginBottom: BASE_SPACE * 0.250,
  },
  // optionDescription: descrizione opzione
  optionDescription: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    lineHeight: FONT_SIZE_BASE * 1,
  },
  // optionPrice: prezzo opzione
  optionPrice: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.primary,
  },

  // bookButton: CTA prenotazione
  bookButton: {
    ...unifiedStyles.button,
    marginTop: mobileTheme.spacing[4],
    shadowColor: mobileTheme.colors.primary,
  },
  // bookButtonText: label CTA prenotazione
  bookButtonText: unifiedStyles.buttonText,
  // emergencyButton: CTA emergenza
  emergencyButton: {
    backgroundColor: mobileTheme.colors.error,
    paddingVertical: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.md,
    alignItems: 'center',
    marginTop: mobileTheme.spacing[4],
    ...mobileTheme.shadows.medium,
    shadowColor: mobileTheme.colors.error,
  },
  // emergencyButtonText: label CTA emergenza
  emergencyButtonText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.white,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // switchRow: layout for the return trip toggle row
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: mobileTheme.spacing[3],
  },

  // loadingContainer: wrapper stato loading
  loadingContainer: unifiedStyles.loadingContainer,
  // loadingText: testo stato loading
  loadingText: unifiedStyles.loadingText,
});

export default medicalTransportScreenStyles;
