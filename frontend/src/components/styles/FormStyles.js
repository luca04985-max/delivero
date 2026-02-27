import { Theme } from '../../styles/Theme';

// 📝 FORM STYLES
export const formStyles = {
  // Container form
  container: {
    maxWidth: '500px',
    margin: '2rem auto',
  },

  // Gruppo form
  formGroup: {
    marginBottom: Theme.spacing.lg,
  },

  // Label
  label: {
    display: 'block',
    marginBottom: Theme.spacing.sm,
    fontWeight: 500,
    color: Theme.colors.textPrimary,
  },

  // Input fields
  input: {
    width: '100%',
    padding: '12px',
    border: `2px solid ${Theme.colors.borderColor}`,
    borderRadius: Theme.borderRadius.md,
    fontSize: '16px',
    fontFamily: 'inherit',
    transition: Theme.transitions.default,
    backgroundColor: 'white',
    color: Theme.colors.textPrimary,
    outline: 'none',
  },

  inputFocus: {
    borderColor: theme.colors.secondary,
    boxShadow: `0 0 0 3px ${Theme.getColor('primary', 0.1)}`,
  },

  inputError: {
    borderColor: Theme.colors.danger,
    boxShadow: `0 0 0 3px ${Theme.getColor('danger', 0.1)}`,
  },

  // Textarea
  textarea: {
    ...Theme.input,
    resize: 'vertical',
    minHeight: '100px',
  },

  // Select
  select: {
    ...Theme.input,
    cursor: 'pointer',
  },

  // Messaggi di errore
  errorMessage: {
    color: Theme.colors.danger,
    fontSize: '14px',
    marginTop: Theme.spacing.sm,
    display: 'flex',
    alignItems: 'center',
    gap: Theme.spacing.xs,
  },

  // Messaggi di successo
  successMessage: {
    color: Theme.colors.success,
    fontSize: '14px',
    marginTop: Theme.spacing.sm,
    display: 'flex',
    alignItems: 'center',
    gap: Theme.spacing.xs,
  },

  // Bottoni form
  submitButton: {
    width: '100%',
    padding: '14px 24px',
    background: theme.colors.secondary,
    color: 'white',
    border: 'none',
    borderRadius: Theme.borderRadius.md,
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: Theme.transitions.button,
    boxShadow: Theme.shadows.button,
  },

  submitButtonHover: {
    background: theme.colors.secondaryDark,
    transform: 'translateY(-2px)',
    boxShadow: Theme.shadows.buttonHover,
  },

  submitButtonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
    transform: 'none',
  },

  // Pulsanti secondari
  secondaryButton: {
    width: '100%',
    padding: '14px 24px',
    background: 'transparent',
    color: theme.colors.secondary,
    border: `2px solid ${theme.colors.secondary}`,
    borderRadius: Theme.borderRadius.md,
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: Theme.transitions.button,
  },

  secondaryButtonHover: {
    background: Theme.getColor('primary', 0.1),
    transform: 'translateY(-2px)',
  },

  // Card form
  formCard: {
    background: 'white',
    borderRadius: Theme.borderRadius.lg,
    boxShadow: Theme.shadows.md,
    padding: Theme.spacing.xl,
    border: `1px solid ${Theme.colors.borderColor}`,
  },

  // Header form
  formHeader: {
    textAlign: 'center',
    marginBottom: Theme.spacing.lg,
  },

  formTitle: {
    fontSize: '24px',
    fontWeight: 700,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.sm,
  },

  formSubtitle: {
    color: Theme.colors.textSecondary,
    fontSize: '16px',
  },

  // Footer form
  formFooter: {
    display: 'flex',
    flexDirection: 'column',
    gap: Theme.spacing.md,
    marginTop: Theme.spacing.lg,
  },

  // Link form
  formLink: {
    color: theme.colors.secondary,
    textDecoration: 'none',
    fontWeight: 500,
    transition: Theme.transitions.fast,
  },

  formLinkHover: {
    textDecoration: 'underline',
  },

  // Divider
  divider: {
    display: 'flex',
    alignItems: 'center',
    margin: `${Theme.spacing.lg} 0`,
    color: Theme.colors.textSecondary,
  },

  dividerLine: {
    flex: 1,
    height: '1px',
    background: Theme.colors.borderColor,
  },

  dividerText: {
    padding: `0 ${Theme.spacing.md}`,
    fontSize: '14px',
  },

  // Checkbox
  checkbox: {
    display: 'flex',
    alignItems: 'center',
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.md,
  },

  checkboxInput: {
    width: '18px',
    height: '18px',
    accentColor: theme.colors.secondary,
  },

  checkboxLabel: {
    fontSize: '14px',
    color: Theme.colors.textSecondary,
  },

  // Loading state
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(255, 255, 255, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Theme.borderRadius.md,
  },

  // Responsive
  responsive: {
    mobile: {
      container: {
        margin: '1rem',
        maxWidth: 'none',
      },
      formCard: {
        padding: Theme.spacing.lg,
      },
      input: {
        fontSize: '16px', // Previeni zoom su iOS
      },
    },
  },
};

// 🎯 STILI PER CLASSE CSS
export const formCSS = {
  '.form-group': {
    marginBottom: '1.5rem',
  },

  'input:focus, select:focus, textarea:focus': {
    outline: 'none',
    borderColor: 'var(--primary-color)',
    boxShadow: '0 0 0 3px rgba(255, 107, 0, 0.1)',
  },

  '.form-error': {
    color: 'var(--danger-color)',
    fontSize: '0.9rem',
    marginTop: '0.5rem',
  },

  '.btn-primary:hover': {
    background: 'var(--primary-dark)',
    transform: 'translateY(-2px)',
  },
};

export default formStyles;
