import { StyleSheet } from 'react-native';
import { mobileTheme } from '../../../theme';
import { unifiedStyles } from '../../../theme/UnifiedStyles';
import { BASE_SPACE, FONT_FAMILY, FONT_SIZE_BASE } from '../../../theme/StyleConstants.js';


export const profileScreenStyles = StyleSheet.create({
  // container: wrapper principale
  container: unifiedStyles.container,

  // content: padding contenuto
  content: {
    padding: mobileTheme.spacing[5],
    paddingBottom: mobileTheme.spacing[8],
  },

  // headerCard: testata profilo
  headerCard: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[5],
    borderRadius: mobileTheme.borderRadius.lg,
    marginBottom: mobileTheme.spacing[4],
    ...mobileTheme.shadows.sm,
  },
  // headerTitle: titolo profilo
  headerTitle: {
    fontSize: mobileTheme.typography.fontSize.xl,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[2],
  },
  // headerSubtitle: nome utente
  headerSubtitle: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.text.primary,
  },
  // headerMeta: email utente
  headerMeta: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    marginTop: mobileTheme.spacing[1],
  },

  // sectionCard: sezione profilo
  sectionCard: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[5],
    borderRadius: mobileTheme.borderRadius.lg,
    marginBottom: mobileTheme.spacing[4],
    ...mobileTheme.shadows.sm,
  },
  // sectionTitle: titolo sezione
  sectionTitle: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[3],
  },

  // actionRow: riga azione
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: mobileTheme.spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: mobileTheme.colors.border,
  },
  // actionLabel: testo azione
  actionLabel: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.primary,
  },
  // actionIcon: icona azione
  actionIcon: {
    fontSize: mobileTheme.typography.fontSize.lg,
  },

  // infoRow: riga info personale
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: mobileTheme.spacing[2],
  },
  // infoLabel: label info
  infoLabel: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  },
  // infoValue: valore info
  infoValue: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.primary,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
  },

  // logoutButton: CTA logout
  logoutButton: {
    ...unifiedStyles.button,
    marginTop: mobileTheme.spacing[2],
  },
  // logoutText: testo CTA logout
  logoutText: unifiedStyles.buttonText,
});

export default profileScreenStyles;
