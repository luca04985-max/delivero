import { StyleSheet, Platform } from 'react-native';
import { mobileTheme, FONT_WEIGHTS } from '../../../theme';
import { unifiedStyles } from '../../../theme/UnifiedStyles';
import { BASE_SPACE, FONT_FAMILY, FONT_SIZE_BASE } from '../../../theme/StyleConstants.js';


export const riderHomeScreenStyles = StyleSheet.create({
  ...unifiedStyles,
  // container: wrapper principale (RiderHomeScreen.js)
  container: unifiedStyles.container,

  // header: header lavoro (RiderHomeScreen.js)
  header: {
    backgroundColor: mobileTheme.colors.secondary, // Navy profondo (più moderno del nero puro)
    padding: mobileTheme.spacing[6],
    paddingTop: Platform.OS === 'ios' ? 60 : 50,
    borderBottomLeftRadius: mobileTheme.borderRadius.xl,
    borderBottomRightRadius: mobileTheme.borderRadius.xl,
    ...mobileTheme.shadows.medium,
  },
  // headerTitle: titolo header (RiderHomeScreen.js)
  headerTitle: {
    color: mobileTheme.colors.white,
    fontSize: mobileTheme.typography.fontSize['2xl'],
    fontWeight: FONT_WEIGHTS.black,
    letterSpacing: -0.5,
  },

  // card: card ordine disponibile (RiderHomeScreen.js)
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

  // orderInfoRow: row info ordine (RiderHomeScreen.js)
  orderInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[4],
  },
  // iconContainer: wrapper icona (RiderHomeScreen.js)
  iconContainer: {
    backgroundColor: mobileTheme.colors.background,
    padding: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.full,
    marginRight: mobileTheme.spacing[4],
  },
  // emoji: icona/emoji (RiderHomeScreen.js)
  emoji: {
    fontSize: FONT_SIZE_BASE * 1.750,
  },
  // textGroup: wrapper testo (RiderHomeScreen.js)
  textGroup: {
    flex: 1,
  },
  // address: indirizzo ordine (RiderHomeScreen.js)
  address: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: FONT_WEIGHTS.black,
    color: mobileTheme.colors.text.primary,
    lineHeight: FONT_SIZE_BASE * 1.375,
  },

  // payoutContainer: badge payout (RiderHomeScreen.js)
  payoutContainer: {
    backgroundColor: mobileTheme.colors.successBg,
    paddingHorizontal: mobileTheme.spacing[3],
    paddingVertical: mobileTheme.spacing[1],
    borderRadius: mobileTheme.borderRadius.xs,
    alignSelf: 'flex-start',
    marginTop: BASE_SPACE * 0.500,
  },
  // payout: testo payout (RiderHomeScreen.js)
  payout: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.success,
  },

  // acceptBtn: bottone accetta (RiderHomeScreen.js)
  acceptBtn: {
    backgroundColor: mobileTheme.colors.primary,
    paddingVertical: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...mobileTheme.shadows.medium,
    shadowColor: mobileTheme.colors.primary, // Ombra colorata per il tasto principale
  },
  // acceptBtnText: testo bottone accetta (RiderHomeScreen.js)
  acceptBtnText: {
    color: mobileTheme.colors.white,
    fontWeight: FONT_WEIGHTS.black,
    fontSize: mobileTheme.typography.fontSize.base,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // statusBadge: wrapper stato (RiderHomeScreen.js)
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: mobileTheme.spacing[2],
  },
  // statusDot: pallino stato (RiderHomeScreen.js)
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: BASE_SPACE * 0.500,
    backgroundColor: mobileTheme.colors.success,
    marginRight: BASE_SPACE * 0.750,
  },
  // statusText: testo stato (RiderHomeScreen.js)
  statusText: {
    color: mobileTheme.colors.text.tertiary,
    fontSize: FONT_SIZE_BASE * 0.750,
    fontWeight: FONT_WEIGHTS.semibold,
  },
});

export default riderHomeScreenStyles;
