import { StyleSheet, Platform } from 'react-native';
import { mobileTheme } from '../../../theme';
import { unifiedStyles } from '../../../theme/UnifiedStyles';

export const AdminDashboardScreenStyles = StyleSheet.create({
  ...unifiedStyles,

  // Override specifici per AdminDashboard
  welcome: {
    fontSize: mobileTheme.typography.fontSize['3xl'],
    fontWeight: mobileTheme.typography.fontWeight.black,
    marginBottom: mobileTheme.spacing[4],
    color: mobileTheme.colors.text.primary,
    letterSpacing: -1,
  },

  // TABBAR STYLES
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
    fontWeight: mobileTheme.typography.fontWeight.semibold
  },
  activeTabText: {
    color: mobileTheme.colors.primary,
    fontWeight: mobileTheme.typography.fontWeight.bold
  },

  // SECTION STYLES (per Stats, Finance, Metrics)
  section: {
    backgroundColor: mobileTheme.colors.white,
    margin: mobileTheme.spacing[4],
    padding: mobileTheme.spacing[5],
    borderRadius: mobileTheme.borderRadius.lg,
    ...mobileTheme.shadows.sm,
    marginBottom: mobileTheme.spacing[3],
  },
  sectionTitle: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[3],
  },
  sectionValue: {
    fontSize: mobileTheme.typography.fontSize['2xl'],
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.primary,
    marginBottom: mobileTheme.spacing[2],
  },
  sectionSubtext: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    marginBottom: mobileTheme.spacing[1],
  },
  headerContent: {
    flexDirection: 'column', // I componenti ora vanno uno sotto l'altro
    alignItems: 'flex-start', // Li allinea a sinistra
  },
  // MONTHLY STATS (per Finance)
  monthlyStat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: mobileTheme.spacing[2],
    borderBottomWidth: 1,
    borderBottomColor: mobileTheme.colors.border,
  },
  monthLabel: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.primary,
    fontWeight: mobileTheme.shadows.medium,
  },
  monthValue: {
    fontSize: mobileTheme.typography.fontSize.md,
    color: mobileTheme.colors.primary,
    fontWeight: mobileTheme.typography.fontWeight.bold,
  },
  monthOrders: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  },

  // USER SPECIFIC STYLES
  btnEdit: {
    ...unifiedStyles.editButton,
  },
  btnDelete: {
    ...unifiedStyles.deleteButton,
  },
  btnDisabled: {
    ...unifiedStyles.disabledButton,
  },
  btnText: {
    ...unifiedStyles.buttonText,
  },

  // MODAL SPECIFIC STYLES
  editRow: {
    marginBottom: mobileTheme.spacing[4],
  },
  editField: {
    marginBottom: mobileTheme.spacing[3],
  },
  fieldLabel: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.shadows.medium,
    color: mobileTheme.colors.text.secondary,
    marginBottom: mobileTheme.spacing[2],
  },
  fieldValue: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.primary,
  },
  fieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[3],
  },
  pickerContainer: {
    backgroundColor: mobileTheme.colors.background,
    borderRadius: mobileTheme.borderRadius.md,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  editActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: mobileTheme.spacing[3],
    marginTop: mobileTheme.spacing[4],
  },
  saveButton: {
    ...unifiedStyles.button,
    flex: 1,
  },
  cancelButton: {
    backgroundColor: mobileTheme.colors.text.secondary,
    paddingVertical: mobileTheme.spacing[3],
    paddingHorizontal: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.md,
    flex: 1,
    alignItems: 'center',
  },
  btnSaveText: {
    ...unifiedStyles.buttonText,
  },
  btnCancelText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.shadows.medium,
    color: mobileTheme.colors.white,
  },

  // TICKET MODAL SPECIFIC
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[4],
  },
  infoSection: {
    marginBottom: mobileTheme.spacing[4],
  },
  priorityBadge: {
    paddingHorizontal: mobileTheme.spacing[2],
    paddingVertical: mobileTheme.spacing[1],
    borderRadius: mobileTheme.borderRadius.sm,
  },
  priorityText: {
    fontSize: mobileTheme.typography.fontSize.xs,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.white,
  },

  // DELIVERED STATE
  deliveredCard: {
    opacity: 0.7,
    backgroundColor: mobileTheme.colors.background,
  },
  deliveredStatus: {
    color: mobileTheme.colors.success,
  },

  // ROLE SELECTION BUTTONS
  roleButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: mobileTheme.spacing[2],
    marginTop: mobileTheme.spacing[2],
  },
  roleButton: {
    paddingHorizontal: mobileTheme.spacing[3],
    paddingVertical: mobileTheme.spacing[2],
    borderRadius: mobileTheme.borderRadius.md,
    backgroundColor: mobileTheme.colors.background,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  roleButtonSelected: {
    backgroundColor: mobileTheme.colors.primary,
    borderColor: mobileTheme.colors.primary,
  },
  roleButtonText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.shadows.medium,
    color: mobileTheme.colors.text.secondary,
  },
  roleButtonTextSelected: {
    color: mobileTheme.colors.white,
  },
});

export default AdminDashboardScreenStyles;
