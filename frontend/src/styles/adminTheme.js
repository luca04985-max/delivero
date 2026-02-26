const adminStyles = {
  // Layout
  container: {
    padding: '28px',
    maxWidth: '1300px',
    margin: '0 auto',
    backgroundColor: '#F6F9FF',
    minHeight: '100vh',
  },
  card: {
    backgroundColor: 'white',
    padding: '18px',
    borderRadius: '10px',
    boxShadow: '0 6px 18px rgba(16,24,40,0.04)',
  },
  gridCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '18px',
    marginBottom: '28px',
  },

  // Typography
  title: { color: '#0F172A', margin: 0 },
  subtitle: { color: '#6B7280' },

  // Table
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '18px',
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 6px 18px rgba(16,24,40,0.04)',
  },

  // Controls
  input: { padding: '10px', borderRadius: '8px', border: '1px solid #E6EEF8' },
  select: { padding: '10px', borderRadius: '8px', border: '1px solid #E6EEF8' },
  button: {
    padding: '10px 16px',
    backgroundColor: '#0B5FFF',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  dangerButton: {
    padding: '8px 12px',
    backgroundColor: '#DC2626',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },

  // Small helpers
  muted: { color: '#6B7280' },
  successCard: { backgroundColor: '#ECFDF5', color: '#065F46' },
};

export default adminStyles;
