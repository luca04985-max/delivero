import { StyleSheet, Platform } from 'react-native';
import { mobileTheme, FONT_WEIGHTS } from '../../../theme';
import { unifiedStyles } from '../../../theme/UnifiedStyles';

export const RegisterScreenStyles = StyleSheet.create({
  ...unifiedStyles,

  container: {
    flex: 1,
    backgroundColor: mobileTheme.colors.background,
    padding: mobileTheme.spacing[5],
    justifyContent: 'center',
  },

  header: {
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[6],
  },

  logo: {
    fontSize: mobileTheme.typography.fontSize['4xl'],
    marginBottom: mobileTheme.spacing[3],
    color: mobileTheme.colors.primary,
    fontWeight: FONT_WEIGHTS.black,
  },

  title: {
    fontSize: mobileTheme.typography.fontSize.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[2],
    textAlign: 'center',
  },

  subtitle: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: mobileTheme.spacing[6],
  },

  form: {
    width: '100%',
    maxWidth: 320,
  },

  inputGroup: {
    marginBottom: mobileTheme.spacing[4],
  },

  label: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: FONT_WEIGHTS.medium,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[2],
  },

  inputContainer: {
    marginBottom: mobileTheme.spacing[4],
  },

  input: {
    backgroundColor: mobileTheme.colors.white,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    borderRadius: mobileTheme.borderRadius.md,
    padding: mobileTheme.spacing[4],
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.primary,
    ...mobileTheme.shadows.sm,
  },

  inputFocused: {
    borderColor: mobileTheme.colors.primary,
    ...mobileTheme.shadows.md,
  },

  pickerContainer: {
    backgroundColor: mobileTheme.colors.white,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    borderRadius: mobileTheme.borderRadius.md,
    ...mobileTheme.shadows.sm,
  },

  picker: {
    height: 50,
    color: mobileTheme.colors.text.primary,
  },

  roleSelector: {
    marginBottom: mobileTheme.spacing[4],
  },

  roleButton: {
    backgroundColor: mobileTheme.colors.white,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    borderRadius: mobileTheme.borderRadius.md,
    padding: mobileTheme.spacing[4],
    marginBottom: mobileTheme.spacing[2],
    flexDirection: 'row',
    alignItems: 'center',
    ...mobileTheme.shadows.sm,
  },

  roleButtonSelected: {
    backgroundColor: mobileTheme.colors.primary,
    borderColor: mobileTheme.colors.primary,
  },

  roleButtonText: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.primary,
    fontWeight: FONT_WEIGHTS.medium,
    flex: 1,
  },

  roleButtonSelectedText: {
    color: mobileTheme.colors.white,
    fontWeight: FONT_WEIGHTS.bold,
  },

  button: {
    backgroundColor: mobileTheme.colors.primary,
    paddingVertical: mobileTheme.spacing[4],
    paddingHorizontal: mobileTheme.spacing[6],
    borderRadius: mobileTheme.borderRadius.md,
    alignItems: 'center',
    marginTop: mobileTheme.spacing[4],
    ...mobileTheme.shadows.medium,
  },

  buttonDisabled: {
    backgroundColor: mobileTheme.colors.text.tertiary,
    ...mobileTheme.shadows.none,
  },

  buttonText: {
    color: mobileTheme.colors.white,
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: FONT_WEIGHTS.bold,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  divider: {
    height: 1,
    backgroundColor: mobileTheme.colors.border,
    marginVertical: mobileTheme.spacing[4],
  },

  linkButton: {
    alignItems: 'center',
    marginTop: mobileTheme.spacing[4],
  },

  linkText: {
    color: mobileTheme.colors.text.secondary,
    fontSize: mobileTheme.typography.fontSize.sm,
  },

  linkBold: {
    color: mobileTheme.colors.primary,
    fontWeight: FONT_WEIGHTS.bold,
  },

  info: {
    backgroundColor: mobileTheme.colors.infoBg,
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.md,
    marginTop: mobileTheme.spacing[4],
  },

  infoText: {
    color: mobileTheme.colors.info,
    fontSize: mobileTheme.typography.fontSize.sm,
    marginBottom: mobileTheme.spacing[1],
  },

  toast: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.md,
    ...mobileTheme.shadows.lg,
  },

  toastSuccess: {
    backgroundColor: mobileTheme.colors.success,
  },

  toastWarning: {
    backgroundColor: mobileTheme.colors.warning,
  },

  toastError: {
    backgroundColor: mobileTheme.colors.error,
  },

  toastText: {
    color: mobileTheme.colors.white,
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: FONT_WEIGHTS.medium,
    textAlign: 'center',
  },

  login: {
    alignItems: 'center',
    marginTop: mobileTheme.spacing[6],
  },

  loginText: {
    color: mobileTheme.colors.text.secondary,
    fontSize: mobileTheme.typography.fontSize.sm,
  },

  loginLink: {
    color: mobileTheme.colors.primary,
    fontWeight: FONT_WEIGHTS.bold,
  },
});

export default RegisterScreenStyles;
