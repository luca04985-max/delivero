import { theme } from '../theme/theme';

const adminStyles = {
  // Layout
  container: {
    padding: '28px',
    maxWidth: '1300px',
    margin: '0 auto',
    backgroundColor: theme.colors.background,
    minHeight: '100vh',
  },
  card: {
    backgroundColor: theme.colors.white,
    padding: '18px',
    borderRadius: '10px',
    boxShadow: `0 6px 18px ${theme.colors.shadow || 'rgba(16,24,40,0.04)'}`,
  },
  gridCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '18px',
    marginBottom: '28px',
  },

  // Typography
  title: { color: theme.colors.text.primary, margin: 0 },
  subtitle: { color: theme.colors.text.secondary },

  // Table
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '18px',
    backgroundColor: theme.colors.white,
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: `0 6px 18px ${theme.colors.shadow || 'rgba(16,24,40,0.04)'}`,
  },

  // Controls
  input: { padding: '10px', borderRadius: '8px', border: `1px solid ${theme.colors.border}` },
  select: { padding: '10px', borderRadius: '8px', border: `1px solid ${theme.colors.border}` },
  button: {
    padding: '10px 16px',
    backgroundColor: theme.colors.secondary,
    color: theme.colors.white,
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  dangerButton: {
    padding: '8px 12px',
    backgroundColor: theme.colors.error,
    color: theme.colors.white,
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },

  // Small helpers
  muted: { color: theme.colors.text.secondary },
  successCard: { backgroundColor: theme.colors.success, color: theme.colors.text.primary },
};

export default adminStyles;
