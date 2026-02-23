import { StyleSheet, Platform } from 'react-native';
import { mobileTheme } from '../theme';

// STILI UNIFICATI PER TUTTI GLI SCHERMI
// Basati su: CustomerOrdersScreen, CustomerHomeScreen, TicketDetailScreen, RiderActiveScreen

// Mapping diretto per evitare problemi con React Native
const FONT_WEIGHTS = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  black: '900'
};

export const unifiedStyles = StyleSheet.create({
  // CONTAINER BASE
  container: {
    flex: 1,
    backgroundColor: mobileTheme.colors.background,
  },

  // HEADER UNIFICATO (come CustomerHomeScreen)
  header: {
    backgroundColor: mobileTheme.colors.secondary,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: mobileTheme.spacing[4],
    paddingHorizontal: mobileTheme.spacing[5],
    borderBottomLeftRadius: mobileTheme.borderRadius.xl,
    borderBottomRightRadius: mobileTheme.borderRadius.xl,
    ...mobileTheme.shadows.medium,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: mobileTheme.typography.fontSize['2xl'],
    fontWeight: mobileTheme.typography.fontWeight.black,
    color: mobileTheme.colors.white,
    marginBottom: mobileTheme.spacing[2],
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.tertiary,
    opacity: 0.9,
  },

  // TABBAR (come AdminDashboardScreen)
  tabBar: {
    backgroundColor: mobileTheme.colors.secondary,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: mobileTheme.spacing[2],
    ...mobileTheme.shadows.medium,
  },
  tabBarContent: {
    paddingHorizontal: mobileTheme.spacing[4],
  },
  tab: {
    alignItems: 'center',
    paddingVertical: mobileTheme.spacing[3],
    paddingHorizontal: mobileTheme.spacing[4],
    marginHorizontal: 4,
    borderRadius: mobileTheme.borderRadius.md,
  },
  activeTab: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  tabText: {
    color: mobileTheme.colors.text.tertiary,
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
  },
  activeTabText: {
    color: mobileTheme.colors.primary,
    fontWeight: FONT_WEIGHTS.bold,
  },

  // CONTENT BASE
  content: {
    flex: 1,
    padding: mobileTheme.spacing[4],
  },
  scrollView: {
    flex: 1,
  },

  // CARD UNIFICATE (come CustomerOrdersScreen)
  card: {
    backgroundColor: mobileTheme.colors.white,
    borderRadius: mobileTheme.borderRadius.lg,
    padding: mobileTheme.spacing[4],
    marginBottom: mobileTheme.spacing[4],
    ...mobileTheme.shadows.soft,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  activeCard: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[5],
    borderRadius: mobileTheme.borderRadius.lg,
    marginBottom: mobileTheme.spacing[4],
    borderLeftWidth: 5,
    borderLeftColor: mobileTheme.colors.primary,
    ...mobileTheme.shadows.sm,
  },

  // ORDER/TICKET HEADER (come CustomerOrdersScreen)
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: mobileTheme.spacing[3],
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: mobileTheme.spacing[3],
  },
  orderId: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.text.secondary,
  },
  ticketId: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.text.primary,
  },

  // STATUS BADGE (come tutti gli schermi)
  statusBadge: {
    paddingHorizontal: mobileTheme.spacing[2],
    paddingVertical: 4,
    borderRadius: mobileTheme.borderRadius.full,
    backgroundColor: mobileTheme.colors.warningBg,
  },
  orderStatus: {
    paddingHorizontal: mobileTheme.spacing[2],
    paddingVertical: 4,
    borderRadius: mobileTheme.borderRadius.full,
    backgroundColor: mobileTheme.colors.successBg,
  },
  statusText: {
    fontSize: mobileTheme.typography.fontSize.xs,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.warning,
    textTransform: 'uppercase',
  },
  orderStatusText: {
    fontSize: mobileTheme.typography.fontSize.xs,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.success,
    textTransform: 'uppercase',
  },

  // TEXT ELEMENTS
  orderInfo: {
    flex: 1,
  },
  orderDate: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    marginBottom: mobileTheme.spacing[2],
  },
  orderTotal: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.primary,
  },
  ticketTitle: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[2],
    flex: 1,
  },
  ticketDescription: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.secondary,
    lineHeight: 20,
    marginBottom: mobileTheme.spacing[3],
  },
  ticketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ticketDate: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  },

  // STATUS SEPARATORS (come CustomerOrdersScreen)
  statusSeparator: {
    backgroundColor: mobileTheme.colors.white,
    marginHorizontal: mobileTheme.spacing[4],
    marginVertical: mobileTheme.spacing[2],
    borderRadius: mobileTheme.borderRadius.lg,
    borderLeftWidth: 4,
    borderLeftColor: mobileTheme.colors.primary,
    ...mobileTheme.shadows.soft,
  },
  statusSeparatorContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: mobileTheme.spacing[4],
  },
  statusSeparatorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusSeparatorIcon: {
    fontSize: mobileTheme.typography.fontSize.lg,
    marginRight: mobileTheme.spacing[3],
  },
  statusSeparatorTitle: {
    fontSize: mobileTheme.typography.fontSize.md,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.text.primary,
  },
  statusSeparatorRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusSeparatorCount: {
    fontSize: mobileTheme.typography.fontSize.md,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.primary,
    marginRight: mobileTheme.spacing[2],
    backgroundColor: mobileTheme.colors.background,
    paddingHorizontal: mobileTheme.spacing[2],
    paddingVertical: mobileTheme.spacing[1],
    borderRadius: mobileTheme.borderRadius.sm,
    minWidth: 24,
    textAlign: 'center',
  },
  statusSeparatorToggle: {
    fontSize: mobileTheme.typography.fontSize.md,
    color: mobileTheme.colors.white,
    fontWeight: FONT_WEIGHTS.bold,
  },

  // BUTTONS UNIFICATI
  button: {
    backgroundColor: mobileTheme.colors.primary,
    paddingVertical: mobileTheme.spacing[3],
    paddingHorizontal: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.md,
    alignItems: 'center',
    ...mobileTheme.shadows.medium,
  },
  buttonText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.white,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  trackButton: {
    backgroundColor: mobileTheme.colors.primary,
    paddingVertical: mobileTheme.spacing[3],
    paddingHorizontal: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.md,
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[3],
    ...mobileTheme.shadows.medium,
  },
  trackButtonText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.white,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  editButton: {
    backgroundColor: mobileTheme.colors.primarySoft,
    paddingVertical: mobileTheme.spacing[3],
    paddingHorizontal: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.md,
    marginRight: mobileTheme.spacing[3],
  },
  deleteButton: {
    backgroundColor: mobileTheme.colors.error,
    paddingVertical: mobileTheme.spacing[3],
    paddingHorizontal: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.md,
  },
  disabledButton: {
    backgroundColor: mobileTheme.colors.text.tertiary,
    opacity: 0.5,
  },

  // BUTTON ROW (come RiderActiveScreen)
  buttonRow: {
    flexDirection: 'row',
    marginTop: mobileTheme.spacing[4],
    justifyContent: 'space-between',
    gap: mobileTheme.spacing[2],
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // INPUT FIELDS (come TicketDetailScreen)
  input: {
    backgroundColor: mobileTheme.colors.background,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    borderRadius: mobileTheme.borderRadius.md,
    padding: mobileTheme.spacing[3],
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.primary,
  },
  textInput: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.lg,
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.primary,
    ...mobileTheme.shadows.soft,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },

  // MODAL (come AdminDashboardScreen)
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[5],
    borderRadius: mobileTheme.borderRadius.lg,
    margin: mobileTheme.spacing[4],
    maxHeight: '80%',
    ...mobileTheme.shadows.xl,
  },
  modalTitle: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[4],
    textAlign: 'center',
  },

  // SECTIONS (come TicketDetailScreen)
  section: {
    backgroundColor: mobileTheme.colors.white,
    margin: mobileTheme.spacing[4],
    padding: mobileTheme.spacing[5],
    borderRadius: mobileTheme.borderRadius.lg,
    ...mobileTheme.shadows.sm,
  },
  sectionTitle: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[3],
  },

  // STAT CARDS (come AdminDashboardScreen)
  statCard: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[5],
    borderRadius: mobileTheme.borderRadius.lg,
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[4],
    ...mobileTheme.shadows.medium,
    borderTopWidth: 4,
    borderTopColor: mobileTheme.colors.primary,
  },
  statValue: {
    fontSize: 28,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.secondary,
  },
  statLabel: {
    color: mobileTheme.colors.text.secondary,
    textTransform: 'uppercase',
    fontSize: 10,
    letterSpacing: 1,
    marginTop: 4,
  },

  // USER ELEMENTS (come AdminDashboardScreen)
  userName: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[1],
  },
  userEmail: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    marginBottom: mobileTheme.spacing[2],
  },

  // EMPTY STATES (come tutti gli schermi)
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: mobileTheme.spacing[5],
  },
  emptyText: {
    fontSize: mobileTheme.typography.fontSize.lg,
    color: mobileTheme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: mobileTheme.spacing[2],
  },
  emptySubtext: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.tertiary,
    textAlign: 'center',
    marginTop: mobileTheme.spacing[2],
    fontStyle: 'italic',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.secondary,
    marginTop: mobileTheme.spacing[4],
  },

  // BANNERS (come AdminDashboardScreen)
  errorBanner: {
    backgroundColor: mobileTheme.colors.error,
    color: mobileTheme.colors.white,
    padding: mobileTheme.spacing[3],
    textAlign: 'center',
    fontWeight: mobileTheme.typography.fontWeight.medium,
  },
  successBanner: {
    backgroundColor: mobileTheme.colors.success,
    color: mobileTheme.colors.white,
    padding: mobileTheme.spacing[3],
    textAlign: 'center',
    fontWeight: mobileTheme.typography.fontWeight.medium,
  },

  // TOAST (come TicketDetailScreen)
  toast: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    padding: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.md,
    zIndex: 1000,
    ...mobileTheme.shadows.medium,
  },
  toastText: {
    color: mobileTheme.colors.white,
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.medium,
    textAlign: 'center',
  },
});

export default unifiedStyles;
