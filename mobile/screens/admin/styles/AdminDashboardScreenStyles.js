import { StyleSheet, Platform } from 'react-native';
import { mobileTheme, FONT_WEIGHTS } from '../../../theme';
import { unifiedStyles } from '../../../theme/UnifiedStyles';

export const AdminDashboardScreenStyles = StyleSheet.create({
  ...unifiedStyles,

  // welcome: titolo welcome admin (AdminDashboardScreen.js)
  welcome: {
    fontSize: mobileTheme.typography.fontSize['3xl'],
    fontWeight: mobileTheme.typography.fontWeight.black,
    marginBottom: mobileTheme.spacing[4],
    color: mobileTheme.colors.text.primary,
    letterSpacing: -1,
  },

  // tabBar: tabbar admin (AdminDashboardScreen.js)
  tabBar: {
    backgroundColor: mobileTheme.colors.secondary,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: mobileTheme.spacing[2],
    ...mobileTheme.shadows.medium,
  },
  // tabBarContent: padding tabbar (AdminDashboardScreen.js)
  tabBarContent: {
    paddingHorizontal: mobileTheme.spacing[4],
  },
  // tab: pill tab (AdminDashboardScreen.js)
  tab: {
    alignItems: 'center',
    paddingVertical: mobileTheme.spacing[3],
    paddingHorizontal: mobileTheme.spacing[4],
    marginHorizontal: 4,
    borderRadius: mobileTheme.borderRadius.md,
  },
  // activeTab: pill tab attiva (AdminDashboardScreen.js)
  activeTab: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  // tabText: testo tab (AdminDashboardScreen.js)
  tabText: {
    color: mobileTheme.colors.text.tertiary,
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
  },
  // activeTabText: testo tab attiva (AdminDashboardScreen.js)
  activeTabText: {
    color: mobileTheme.colors.primary,
    fontWeight: FONT_WEIGHTS.bold,
  },

  // section: card sezione admin (AdminDashboardScreen.js)
  section: {
    backgroundColor: mobileTheme.colors.white,
    margin: mobileTheme.spacing[4],
    padding: mobileTheme.spacing[5],
    borderRadius: mobileTheme.borderRadius.lg,
    ...mobileTheme.shadows.sm,
    marginBottom: mobileTheme.spacing[3],
  },
  // sectionTitle: titolo sezione (AdminDashboardScreen.js)
  sectionTitle: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[3],
  },
  // sectionValue: valore sezione (AdminDashboardScreen.js)
  sectionValue: {
    fontSize: mobileTheme.typography.fontSize['2xl'],
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.primary,
    marginBottom: mobileTheme.spacing[2],
  },
  // sectionSubtext: sottotesto sezione (AdminDashboardScreen.js)
  sectionSubtext: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    marginBottom: mobileTheme.spacing[1],
  },
  // headerContent: layout header colonna (AdminDashboardScreen.js)
  headerContent: {
    flexDirection: 'column', // I componenti ora vanno uno sotto l'altro
    alignItems: 'flex-start', // Li allinea a sinistra
  },
  // monthlyStat: riga stat mensile (AdminDashboardScreen.js)
  monthlyStat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: mobileTheme.spacing[2],
    borderBottomWidth: 1,
    borderBottomColor: mobileTheme.colors.border,
  },
  // monthLabel: label mese (AdminDashboardScreen.js)
  monthLabel: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.primary,
    fontWeight: mobileTheme.shadows.medium,
  },
  // monthValue: valore mese (AdminDashboardScreen.js)
  monthValue: {
    fontSize: mobileTheme.typography.fontSize.md,
    color: mobileTheme.colors.primary,
    fontWeight: FONT_WEIGHTS.bold,
  },
  // monthOrders: ordini mese (AdminDashboardScreen.js)
  monthOrders: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  },

  // btnEdit: bottone edit (AdminDashboardScreen.js)
  btnEdit: {
    ...unifiedStyles.editButton,
  },
  // btnDelete: bottone delete (AdminDashboardScreen.js)
  btnDelete: {
    ...unifiedStyles.deleteButton,
  },
  // btnDisabled: bottone disabled (AdminDashboardScreen.js)
  btnDisabled: {
    ...unifiedStyles.disabledButton,
  },
  // btnText: testo bottoni (AdminDashboardScreen.js)
  btnText: {
    ...unifiedStyles.buttonText,
  },

  // editRow: wrapper riga edit (AdminDashboardScreen.js)
  editRow: {
    marginBottom: mobileTheme.spacing[4],
  },
  // editField: campo edit (AdminDashboardScreen.js)
  editField: {
    marginBottom: mobileTheme.spacing[3],
  },
  // fieldLabel: label campo (AdminDashboardScreen.js)
  fieldLabel: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.medium,
    color: mobileTheme.colors.text.secondary,
    marginBottom: mobileTheme.spacing[2],
  },
  // fieldValue: valore campo (AdminDashboardScreen.js)
  fieldValue: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.primary,
  },
  // fieldRow: riga campo (AdminDashboardScreen.js)
  fieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[3],
  },
  // pickerContainer: wrapper picker (AdminDashboardScreen.js)
  pickerContainer: {
    backgroundColor: mobileTheme.colors.background,
    borderRadius: mobileTheme.borderRadius.md,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  // editActions: row azioni edit (AdminDashboardScreen.js)
  editActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: mobileTheme.spacing[3],
    marginTop: mobileTheme.spacing[4],
  },
  // saveButton: bottone salva (AdminDashboardScreen.js)
  saveButton: {
    ...unifiedStyles.button,
    flex: 1,
  },
  // cancelButton: bottone annulla (AdminDashboardScreen.js)
  cancelButton: {
    backgroundColor: mobileTheme.colors.text.secondary,
    paddingVertical: mobileTheme.spacing[3],
    paddingHorizontal: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.md,
    flex: 1,
    alignItems: 'center',
  },
  // btnSaveText: testo salva (AdminDashboardScreen.js)
  btnSaveText: {
    ...unifiedStyles.buttonText,
  },
  // btnCancelText: testo annulla (AdminDashboardScreen.js)
  btnCancelText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.medium,
    color: mobileTheme.colors.white,
  },

  // headerCard: header card modal (AdminDashboardScreen.js)
  headerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[4],
  },
  // infoSection: sezione info modal (AdminDashboardScreen.js)
  infoSection: {
    marginBottom: mobileTheme.spacing[4],
  },
  // priorityBadge: badge priorità (AdminDashboardScreen.js)
  priorityBadge: {
    paddingHorizontal: mobileTheme.spacing[2],
    paddingVertical: mobileTheme.spacing[1],
    borderRadius: mobileTheme.borderRadius.sm,
  },
  // priorityText: testo priorità (AdminDashboardScreen.js)
  priorityText: {
    fontSize: mobileTheme.typography.fontSize.xs,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.white,
  },

  // deliveredCard: card consegnata (AdminDashboardScreen.js)
  deliveredCard: {
    opacity: 0.7,
    backgroundColor: mobileTheme.colors.background,
  },
  // deliveredStatus: testo consegnato (AdminDashboardScreen.js)
  deliveredStatus: {
    color: mobileTheme.colors.success,
  },

  // roleButtons: wrapper bottoni ruolo (AdminDashboardScreen.js)
  roleButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: mobileTheme.spacing[2],
    marginTop: mobileTheme.spacing[2],
  },
  // roleButton: bottone ruolo (AdminDashboardScreen.js)
  roleButton: {
    paddingHorizontal: mobileTheme.spacing[3],
    paddingVertical: mobileTheme.spacing[2],
    borderRadius: mobileTheme.borderRadius.md,
    backgroundColor: mobileTheme.colors.background,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  // roleButtonSelected: bottone ruolo selezionato (AdminDashboardScreen.js)
  roleButtonSelected: {
    backgroundColor: mobileTheme.colors.primary,
    borderColor: mobileTheme.colors.primary,
  },
  // roleButtonText: testo bottone ruolo (AdminDashboardScreen.js)
  roleButtonText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.medium,
    color: mobileTheme.colors.text.secondary,
  },
  // roleButtonTextSelected: testo ruolo selezionato (AdminDashboardScreen.js)
  roleButtonTextSelected: {
    color: mobileTheme.colors.white,
  },
});

export default AdminDashboardScreenStyles;
