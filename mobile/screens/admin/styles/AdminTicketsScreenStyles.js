import { StyleSheet, Platform } from 'react-native';
import { mobileTheme } from '../../../theme';

export const adminTicketsScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mobileTheme.colors.background, // Grigio azzurrato F8FAFC
  },
  // Wrapper per la lista per gestire i margini senza tagliare le ombre
  listContent: {
    padding: mobileTheme.spacing[4],
  },
  title: {
    fontSize: mobileTheme.typography.fontSize['3xl'],
    fontWeight: mobileTheme.typography.fontWeight.black,
    marginBottom: mobileTheme.spacing[5],
    color: mobileTheme.colors.text.primary,
    letterSpacing: -1,
  },
  ticketCard: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[5],
    borderRadius: mobileTheme.borderRadius.lg, // Angoli più smussati (16px)
    marginBottom: mobileTheme.spacing[4],
    ...mobileTheme.shadows.soft,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: mobileTheme.spacing[3],
  },
  ticketTitle: {
    fontWeight: mobileTheme.typography.fontWeight.bold,
    fontSize: mobileTheme.typography.fontSize.lg,
    color: mobileTheme.colors.text.primary,
    flex: 1,
    marginRight: 8,
  },
  // BADGE PER IL TIPO (Soft Style)
  typeBadge: {
    backgroundColor: mobileTheme.colors.background,
    paddingHorizontal: mobileTheme.spacing[2],
    paddingVertical: 4,
    borderRadius: mobileTheme.borderRadius.sm,
  },
  ticketType: {
    color: mobileTheme.colors.text.secondary,
    fontSize: 10,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    textTransform: 'uppercase',
  },
  ticketDesc: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    lineHeight: 20, // Migliora la leggibilità dei testi lunghi
    marginBottom: mobileTheme.spacing[2],
  },

  // SEZIONE AZIONI
  actions: {
    marginTop: mobileTheme.spacing[4],
    paddingTop: mobileTheme.spacing[3],
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: mobileTheme.colors.border,
    justifyContent: 'flex-end',
  },
  resolveBtn: {
    backgroundColor: mobileTheme.colors.successBg, // Sfondo verde chiarissimo
    paddingVertical: mobileTheme.spacing[2],
    paddingHorizontal: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.md,
    borderWidth: 1,
    borderColor: mobileTheme.colors.success,
  },
  resolveBtnText: {
    color: mobileTheme.colors.success, // Testo verde scuro
    fontWeight: mobileTheme.typography.fontWeight.bold,
    fontSize: mobileTheme.typography.fontSize.xs,
  }
});

export default adminTicketsScreenStyles;