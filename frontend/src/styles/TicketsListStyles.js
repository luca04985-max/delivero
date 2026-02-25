// Stili centralizzati per TicketsList - Frontend Web
export const ticketsListStyles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh'
  },

  title: {
    color: '#2c3e50',
    fontSize: '32px',
    fontWeight: '700',
    marginBottom: '32px',
    textAlign: 'center',
    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },

  filterSection: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    marginBottom: '32px',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
  },

  filterLabel: {
    fontWeight: '600',
    color: '#495057',
    fontSize: '14px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },

  filterSelect: {
    padding: '10px 16px',
    borderRadius: '8px',
    border: '2px solid #e9ecef',
    backgroundColor: '#ffffff',
    fontSize: '14px',
    color: '#495057',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      borderColor: '#FF6B00',
      boxShadow: '0 0 0 3px rgba(255, 107, 0, 0.1)'
    },
    ':focus': {
      outline: 'none',
      borderColor: '#FF6B00',
      boxShadow: '0 0 0 3px rgba(255, 107, 0, 0.1)'
    }
  },

  loading: {
    textAlign: 'center',
    padding: '60px',
    fontSize: '18px',
    color: '#6c757d',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px'
  },

  loadingSpinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #FF6B00',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },

  emptyState: {
    textAlign: 'center',
    padding: '80px 20px',
    color: '#6c757d'
  },

  emptyIcon: {
    fontSize: '64px',
    marginBottom: '16px',
    opacity: '0.5'
  },

  emptyTitle: {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#495057'
  },

  emptyText: {
    fontSize: '16px',
    color: '#6c757d'
  },

  ticketsList: {
    display: 'grid',
    gap: '20px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))'
  },

  ticketCard: {
    backgroundColor: '#ffffff',
    padding: '24px',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '1px solid #e9ecef',
    position: 'relative',
    overflow: 'hidden',
    ':hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
      borderColor: '#FF6B00'
    },
    ':before': {
      content: '""',
      position: 'absolute',
      top: '0',
      left: '0',
      width: '4px',
      height: '100%',
      background: 'linear-gradient(135deg, #FF6B00, #FF8C42)'
    }
  },

  headerCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px'
  },

  ticketType: {
    fontSize: '24px',
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
  },

  titleCard: {
    margin: 0,
    flex: 1,
    color: '#2c3e50',
    fontSize: '18px',
    fontWeight: '600',
    lineHeight: '1.4'
  },

  statusBadge: {
    color: 'white',
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
  },

  statusOpen: { backgroundColor: '#28a745' },
  statusInProgress: { backgroundColor: '#ffc107', color: '#212529' },
  statusResolved: { backgroundColor: '#007bff' },
  statusClosed: { backgroundColor: '#6c757d' },

  ticketDescription: {
    margin: '16px 0',
    color: '#6c757d',
    lineHeight: '1.6',
    fontSize: '14px',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  },

  ticketMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#adb5bd',
    fontSize: '12px',
    paddingTop: '16px',
    borderTop: '1px solid #e9ecef',
    marginTop: '16px'
  },

  ticketId: {
    fontWeight: '600',
    color: '#6c757d'
  },

  ticketDate: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },

  detailSection: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
    border: '1px solid #e9ecef'
  },

  detailCard: {
    padding: '32px'
  },

  detailHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    borderBottom: '2px solid #e9ecef',
    paddingBottom: '20px'
  },

  detailTitle: {
    margin: 0,
    color: '#2c3e50',
    fontSize: '24px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },

  adminNotes: {
    backgroundColor: '#fff3cd',
    border: '1px solid #ffc107',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '24px',
    borderLeft: '4px solid #ffc107'
  },

  adminNotesTitle: {
    fontWeight: '600',
    color: '#856404',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },

  detailBody: {
    marginBottom: '32px',
    color: '#495057',
    lineHeight: '1.8',
    fontSize: '16px',
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #e9ecef'
  },

  commentsSection: {
    borderTop: '2px solid #e9ecef',
    paddingTop: '24px'
  },

  commentsTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },

  commentCard: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '16px',
    border: '1px solid #e9ecef',
    borderLeft: '4px solid #007bff'
  },

  commentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px'
  },

  commentRole: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },

  commentRoleAdmin: {
    backgroundColor: '#28a745'
  },

  commentRoleUser: {
    backgroundColor: '#6c757d'
  },

  commentText: {
    color: '#495057',
    lineHeight: '1.6',
    fontSize: '14px'
  },

  commentDate: {
    color: '#6c757d',
    fontSize: '12px',
    marginTop: '8px'
  },

  commentForm: {
    marginTop: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #e9ecef'
  },

  commentInput: {
    padding: '16px',
    borderRadius: '8px',
    border: '2px solid #e9ecef',
    fontSize: '14px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    resize: 'vertical',
    minHeight: '100px',
    transition: 'all 0.3s ease',
    ':focus': {
      outline: 'none',
      borderColor: '#FF6B00',
      boxShadow: '0 0 0 3px rgba(255, 107, 0, 0.1)'
    }
  },

  submitComment: {
    padding: '12px 24px',
    backgroundColor: '#FF6B00',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    alignSelf: 'flex-start',
    ':hover': {
      backgroundColor: '#e55a00',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(255, 107, 0, 0.3)'
    },
    ':disabled': {
      backgroundColor: '#6c757d',
      cursor: 'not-allowed',
      transform: 'none'
    }
  }
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
