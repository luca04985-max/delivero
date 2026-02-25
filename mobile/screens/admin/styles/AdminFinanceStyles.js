import { BASE_SPACE, FONT_FAMILY, FONT_SIZE_BASE } from '../../../theme/StyleConstants.js';
import { StyleSheet } from 'react-native';
import { mobileTheme } from '../../../theme';
import { unifiedStyles } from '../../../theme/UnifiedStyles';

export const adminFinanceStyles = StyleSheet.create({
  ...unifiedStyles,

  // financeContainer: wrapper contenuto finance (AdminFinance.js)
  financeContainer: {
    padding: mobileTheme.spacing[4],
  },

  // revenueCard: card ricavi (AdminFinance.js)
  revenueCard: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[5],
    borderRadius: mobileTheme.borderRadius.lg,
    ...mobileTheme.shadows.medium,
    marginBottom: mobileTheme.spacing[4],
    borderLeftWidth: 5,
    borderLeftColor: mobileTheme.colors.success,
  },
  // revenueTitle: titolo ricavi (AdminFinance.js)
  revenueTitle: {
    fontSize: mobileTheme.typography.fontSize.md,
    color: mobileTheme.colors.text.secondary,
    marginBottom: mobileTheme.spacing[2],
  },
  // revenueAmount: valore ricavi (AdminFinance.js)
  revenueAmount: {
    fontSize: mobileTheme.typography.fontSize['3xl'],
    fontWeight: mobileTheme.typography.fontWeight.black,
    color: mobileTheme.colors.success,
    marginBottom: mobileTheme.spacing[2],
  },
  // revenuePeriod: periodo ricavi (AdminFinance.js)
  revenuePeriod: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.tertiary,
  },

  // paymentSection: sezione metodi pagamento (AdminFinance.js)
  paymentSection: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[5],
    borderRadius: mobileTheme.borderRadius.lg,
    ...mobileTheme.shadows.sm,
    marginBottom: mobileTheme.spacing[4],
  },
  // paymentTitle: titolo sezione pagamenti (AdminFinance.js)
  paymentTitle: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[4],
  },
  // paymentRow: riga metodo pagamento (AdminFinance.js)
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: mobileTheme.spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: mobileTheme.colors.border,
  },
  // paymentMethod: metodo pagamento (AdminFinance.js)
  paymentMethod: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.primary,
  },
  // paymentAmount: importo metodo (AdminFinance.js)
  paymentAmount: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.primary,
  },
  // paymentCount: conteggio pagamenti (AdminFinance.js)
  paymentCount: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  },

  // monthlySection: sezione trend mensili (AdminFinance.js)
  monthlySection: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[5],
    borderRadius: mobileTheme.borderRadius.lg,
    ...mobileTheme.shadows.sm,
    marginBottom: mobileTheme.spacing[4],
  },
  // monthlyTitle: titolo trend mensili (AdminFinance.js)
  monthlyTitle: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[4],
  },
  // monthCard: card mese (AdminFinance.js)
  monthCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: mobileTheme.spacing[3],
    paddingHorizontal: mobileTheme.spacing[4],
    backgroundColor: mobileTheme.colors.background,
    borderRadius: mobileTheme.borderRadius.md,
    marginBottom: mobileTheme.spacing[2],
  },
  // monthName: nome mese (AdminFinance.js)
  monthName: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.medium,
    color: mobileTheme.colors.text.primary,
  },
  // monthRevenue: ricavi mese (AdminFinance.js)
  monthRevenue: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.success,
  },
  // monthOrders: ordini mese (AdminFinance.js)
  monthOrders: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  },

  // chartContainer: wrapper grafici (AdminFinance.js)
  chartContainer: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[5],
    borderRadius: mobileTheme.borderRadius.lg,
    ...mobileTheme.shadows.sm,
    marginBottom: mobileTheme.spacing[4],
  },
  // chartTitle: titolo grafico (AdminFinance.js)
  chartTitle: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[4],
  },
  // chartPlaceholder: placeholder grafico (AdminFinance.js)
  chartPlaceholder: {
    height: 200,
    backgroundColor: mobileTheme.colors.background,
    borderRadius: mobileTheme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // chartPlaceholderText: testo placeholder (AdminFinance.js)
  chartPlaceholderText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.tertiary,
  },

  // summaryCard: card riepilogo (AdminFinance.js)
  summaryCard: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.lg,
    ...mobileTheme.shadows.sm,
    marginBottom: mobileTheme.spacing[3],
    borderLeftWidth: 4,
  },
  // summaryCardOrders: variante ordini (AdminFinance.js)
  summaryCardOrders: {
    borderLeftColor: mobileTheme.colors.primary,
  },
  // summaryCardServices: variante servizi (AdminFinance.js)
  summaryCardServices: {
    borderLeftColor: mobileTheme.colors.warning,
  },
  // summaryCardOther: variante altro (AdminFinance.js)
  summaryCardOther: {
    borderLeftColor: mobileTheme.colors.accent,
  },
  // summaryTitle: titolo riepilogo (AdminFinance.js)
  summaryTitle: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    marginBottom: mobileTheme.spacing[1],
  },
  // summaryValue: valore riepilogo (AdminFinance.js)
  summaryValue: {
    fontSize: mobileTheme.typography.fontSize.xl,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
  },
  // summarySubtext: sottotesto riepilogo (AdminFinance.js)
  summarySubtext: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.tertiary,
    marginTop: mobileTheme.spacing[1],
  },

  // currency: testo valuta positiva (AdminFinance.js)
  currency: {
    color: mobileTheme.colors.success,
    fontWeight: mobileTheme.typography.fontWeight.bold,
  },
  // negativeCurrency: testo valuta negativa (AdminFinance.js)
  negativeCurrency: {
    color: mobileTheme.colors.error,
  },
});

export default adminFinanceStyles;
