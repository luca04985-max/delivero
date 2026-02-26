// Stili centralizzati per TicketsList - Frontend Web
import { theme } from '../theme/theme';

export const ticketsListStyles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: theme.colors.background,
    minHeight: '100vh',
  },

  title: {
    color: theme.colors.text.primary,
    fontSize: '32px',
    fontWeight: '700',
    marginBottom: '32px',
    textAlign: 'center',
    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },

  filterSection: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    marginBottom: '32px',
    padding: '20px',
    backgroundColor: theme.colors.white,
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },

  filterLabel: {
    fontWeight: '600',
    color: theme.colors.text.secondary,
    fontSize: '14px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },

  filterSelect: {
    padding: '10px 16px',
    borderRadius: '8px',
    border: `2px solid ${theme.colors.border}`,
    backgroundColor: theme.colors.white,
    fontSize: '14px',
    color: theme.colors.text.primary,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      borderColor: theme.colors.primary,
      boxShadow: `0 0 0 3px ${theme.colors.primary}1A`,
    },
    ':focus': {
      outline: 'none',
      borderColor: theme.colors.primary,
      boxShadow: `0 0 0 3px ${theme.colors.primary}1A`,
    },
  },

  loading: {
    textAlign: 'center',
    padding: '60px',
    fontSize: '18px',
    color: theme.colors.text.secondary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
  },

  loadingSpinner: {
    width: '40px',
    height: '40px',
    border: `4px solid ${theme.colors.surface}`,
    borderTop: `4px solid ${theme.colors.primary}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },

  emptyState: {
    textAlign: 'center',
    padding: '80px 20px',
    color: theme.colors.text.secondary,
  },

  emptyIcon: {
    fontSize: '64px',
    marginBottom: '16px',
    opacity: '0.5',
  },

  emptyTitle: {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '8px',
    color: theme.colors.text.primary,
  },

  emptyText: {
    fontSize: '16px',
    color: theme.colors.text.secondary,
  },

  ticketsList: {
    display: 'grid',
    gap: '20px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
  },

  ticketCard: {
    backgroundColor: theme.colors.white,
    padding: '24px',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: `1px solid ${theme.colors.border}`,
    position: 'relative',
    overflow: 'hidden',
    ':hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
      borderColor: theme.colors.primary,
    },
    ':before': {
      content: '""',
      position: 'absolute',
      top: '0',
      left: '0',
      width: '4px',
      height: '100%',
      background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primary})`,
    },
  },

  headerCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  },

  ticketType: {
    fontSize: '24px',
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
  },

  titleCard: {
    margin: 0,
    flex: 1,
    color: theme.colors.text.primary,
    fontSize: '18px',
    fontWeight: '600',
    lineHeight: '1.4',
  },

  statusBadge: {
    color: 'white',
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  },

  statusOpen: { backgroundColor: theme.colors.success },
  statusInProgress: { backgroundColor: theme.colors.warning, color: theme.colors.text.primary },
  statusResolved: { backgroundColor: theme.colors.secondary },
  statusClosed: { backgroundColor: theme.colors.closed },

  ticketDescription: {
    margin: '16px 0',
    color: theme.colors.text.secondary,
    lineHeight: '1.6',
    fontSize: '14px',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },

  ticketMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.colors.divider,
    fontSize: '12px',
    paddingTop: '16px',
    borderTop: `1px solid ${theme.colors.border}`,
    marginTop: '16px',
  },

  ticketId: {
    fontWeight: '600',
    color: theme.colors.text.secondary,
  },

  ticketDate: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },

  detailSection: {
    backgroundColor: theme.colors.white,
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
    border: `1px solid ${theme.colors.border}`,
  },

  detailCard: {
    padding: '32px',
  },

  detailHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    borderBottom: `2px solid ${theme.colors.border}`,
    paddingBottom: '20px',
  },

  detailTitle: {
    margin: 0,
    color: theme.colors.text.primary,
    fontSize: '24px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },

  adminNotes: {
    backgroundColor: 'var(--admin-warning-100, #fff3cd)',
    border: `1px solid ${theme.colors.warning}`,
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '24px',
    borderLeft: `4px solid ${theme.colors.warning}`,
  },

  adminNotesTitle: {
    fontWeight: '600',
    color: theme.colors.warning,
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },

  detailBody: {
    marginBottom: '32px',
    color: theme.colors.text.primary,
    lineHeight: '1.8',
    fontSize: '16px',
    backgroundColor: theme.colors.background,
    padding: '20px',
    borderRadius: '8px',
    border: `1px solid ${theme.colors.border}`,
  },

  commentsSection: {
    borderTop: `2px solid ${theme.colors.border}`,
    paddingTop: '24px',
  },

  commentsTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },

  commentCard: {
    backgroundColor: theme.colors.surface,
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '16px',
    border: `1px solid ${theme.colors.border}`,
    borderLeft: `4px solid ${theme.colors.secondary}`,
  },

  commentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },

  commentRole: {
    backgroundColor: theme.colors.secondary,
    color: 'white',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },

  commentRoleAdmin: {
    backgroundColor: theme.colors.success,
  },

  commentRoleUser: {
    backgroundColor: theme.colors.closed,
  },

  commentText: {
    color: theme.colors.text.primary,
    lineHeight: '1.6',
    fontSize: '14px',
  },

  commentDate: {
    color: theme.colors.text.secondary,
    fontSize: '12px',
    marginTop: '8px',
  },

  commentForm: {
    marginTop: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    backgroundColor: theme.colors.surface,
    padding: '20px',
    borderRadius: '12px',
    border: `1px solid ${theme.colors.border}`,
  },

  commentInput: {
    padding: '16px',
    borderRadius: '8px',
    border: `2px solid ${theme.colors.border}`,
    fontSize: '14px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    resize: 'vertical',
    minHeight: '100px',
    transition: 'all 0.3s ease',
    ':focus': {
      outline: 'none',
      borderColor: theme.colors.primary,
      boxShadow: '0 0 0 3px rgba(255, 107, 0, 0.1)',
    },
  },

  submitComment: {
    padding: '12px 24px',
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    alignSelf: 'flex-start',
    ':hover': {
      backgroundColor: theme.colors.primaryDark,
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(255, 107, 0, 0.3)',
    },
    ':disabled': {
      backgroundColor: theme.colors.closed,
      cursor: 'not-allowed',
      transform: 'none',
    },
  },
};

// Animazione per lo spinner
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);
