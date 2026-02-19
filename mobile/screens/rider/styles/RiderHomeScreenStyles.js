import { StyleSheet, Platform } from 'react-native';
import { mobileTheme } from '../../../theme';

export const riderHomeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mobileTheme.colors.background, // Sfondo grigio azzurrato pulito
  },

  // HEADER "WORK MODE"
  header: {
    backgroundColor: mobileTheme.colors.secondary, // Navy profondo (più moderno del nero puro)
    padding: mobileTheme.spacing[6],
    paddingTop: Platform.OS === 'ios' ? 60 : 50,
    borderBottomLeftRadius: mobileTheme.borderRadius.xl,
    borderBottomRightRadius: mobileTheme.borderRadius.xl,
    ...mobileTheme.shadows.medium,
  },
  headerTitle: {
    color: mobileTheme.colors.white,
    fontSize: mobileTheme.typography.fontSize['2xl'],
    fontWeight: mobileTheme.typography.fontWeight.black,
    letterSpacing: -0.5,
  },

  // CARD ORDINE DISPONIBILE
  card: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[5],
    borderRadius: mobileTheme.borderRadius.lg,
    marginHorizontal: mobileTheme.spacing[4],
    marginTop: mobileTheme.spacing[4],
    marginBottom: mobileTheme.spacing[2],
    ...mobileTheme.shadows.soft,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },

  // LAYOUT INFO
  orderInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[4],
  },
  iconContainer: {
    backgroundColor: mobileTheme.colors.background,
    padding: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.full,
    marginRight: mobileTheme.spacing[4],
  },
  emoji: {
    fontSize: 28,
  },
  textGroup: {
    flex: 1,
  },
  address: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.text.primary,
    lineHeight: 22,
  },

  // PAYOUT (Evidenziato)
  payoutContainer: {
    backgroundColor: mobileTheme.colors.successBg,
    paddingHorizontal: mobileTheme.spacing[3],
    paddingVertical: mobileTheme.spacing[1],
    borderRadius: mobileTheme.borderRadius.xs,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  payout: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.success,
  },

  // ACTION BUTTON (Il focus principale)
  acceptBtn: {
    backgroundColor: mobileTheme.colors.primary,
    paddingVertical: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...mobileTheme.shadows.medium,
    shadowColor: mobileTheme.colors.primary, // Ombra colorata per il tasto principale
  },
  acceptBtnText: {
    color: mobileTheme.colors.white,
    fontWeight: mobileTheme.typography.fontWeight.black,
    fontSize: mobileTheme.typography.fontSize.base,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // STATUS INDICATOR (Online/Offline)
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: mobileTheme.spacing[2],
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: mobileTheme.colors.success,
    marginRight: 6,
  },
  statusText: {
    color: mobileTheme.colors.text.tertiary,
    fontSize: 12,
    fontWeight: '600',
  }
});

export default riderHomeScreenStyles;