import { StyleSheet, Platform } from 'react-native';
import { mobileTheme } from '../../../theme';

export const ticketFormScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mobileTheme.colors.background,
  },
  // ScrollView content container
  scrollContent: {
    padding: mobileTheme.spacing[5],
    paddingBottom: mobileTheme.spacing[8],
  },
  title: {
    fontSize: mobileTheme.typography.fontSize['3xl'],
    fontWeight: mobileTheme.typography.fontWeight.black,
    marginBottom: mobileTheme.spacing[2],
    color: mobileTheme.colors.text.primary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.secondary,
    marginBottom: mobileTheme.spacing[6],
  },

  // FORM GROUP (Raggruppamento logico)
  formGroup: {
    marginBottom: mobileTheme.spacing[5],
  },
  label: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[2],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // PICKER CONTAINER (Look personalizzato)
  pickerWrapper: {
    backgroundColor: mobileTheme.colors.white,
    borderRadius: mobileTheme.borderRadius.lg,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    overflow: 'hidden',
    ...mobileTheme.shadows.soft,
  },

  // INPUT (Stile Apple/Moderno)
  input: {
    backgroundColor: mobileTheme.colors.white,
    borderRadius: mobileTheme.borderRadius.lg,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    padding: mobileTheme.spacing[4],
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.primary,
    ...mobileTheme.shadows.soft,
    // Per testi lunghi
    textAlignVertical: 'top',
  },
  inputFocused: {
    borderColor: mobileTheme.colors.primary,
    borderWidth: 2,
  },

  // BUTTON "SUBMIT"
  button: {
    backgroundColor: mobileTheme.colors.primary,
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: mobileTheme.spacing[4],
    ...mobileTheme.shadows.medium,
    shadowColor: mobileTheme.colors.primary,
  },
  buttonText: {
    color: mobileTheme.colors.white,
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // HELPER TEXT
  helperText: {
    fontSize: 12,
    color: mobileTheme.colors.text.tertiary,
    marginTop: 6,
    fontStyle: 'italic',
  }
});

export default ticketFormScreenStyles;