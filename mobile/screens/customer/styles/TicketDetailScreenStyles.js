import { StyleSheet } from 'react-native';
import { mobileTheme } from '../../../theme';

export const ticketDetailScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mobileTheme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  loadingText: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.secondary,
    marginTop: mobileTheme.spacing[4],
  },
  errorText: {
    fontSize: mobileTheme.typography.fontSize.lg,
    color: mobileTheme.colors.text.secondary,
    textAlign: 'center',
    marginTop: mobileTheme.spacing[8],
  },

  // TICKET HEADER
  headerCard: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[5],
    borderBottomWidth: 1,
    borderBottomColor: mobileTheme.colors.border,
    ...mobileTheme.shadows.sm,
  },
  headerCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[3],
  },
  ticketId: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
  },
  statusBadge: {
    paddingHorizontal: mobileTheme.spacing[3],
    paddingVertical: mobileTheme.spacing[1],
    borderRadius: mobileTheme.borderRadius.full,
  },
  statusText: {
    fontSize: mobileTheme.typography.fontSize.xs,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.white,
  },
  titleCard: {
    fontSize: mobileTheme.typography.fontSize.xl,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[3],
    lineHeight: 24,
  },
  ticketMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ticketType: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    fontWeight: mobileTheme.typography.fontWeight.medium,
  },
  ticketDate: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.tertiary,
  },

  // SECTIONS
  section: {
    backgroundColor: mobileTheme.colors.white,
    margin: mobileTheme.spacing[4],
    padding: mobileTheme.spacing[5],
    borderRadius: mobileTheme.borderRadius.lg,
    ...mobileTheme.shadows.sm,
  },
  sectionTitle: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[3],
  },
  ticketDescription: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.primary,
    lineHeight: 22,
  },

  // RESPONSES
  responseCard: {
    backgroundColor: mobileTheme.colors.background,
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.md,
    marginBottom: mobileTheme.spacing[3],
    borderLeftWidth: 3,
    borderLeftColor: mobileTheme.colors.primary,
  },
  responseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: mobileTheme.spacing[2],
  },
  responseAuthorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  responseAuthor: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.text.primary,
    marginRight: mobileTheme.spacing[2],
  },
  authorBadge: {
    backgroundColor: mobileTheme.colors.primary,
    paddingHorizontal: mobileTheme.spacing[2],
    paddingVertical: mobileTheme.spacing[1],
    borderRadius: mobileTheme.borderRadius.sm,
  },
  authorBadgeText: {
    fontSize: mobileTheme.typography.fontSize.xs,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.white,
  },
  responseDate: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.tertiary,
  },
  responseContentBox: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.sm,
    marginTop: mobileTheme.spacing[2],
  },
  responseContent: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.primary,
    lineHeight: 20,
  },
  noResponsesContainer: {
    alignItems: 'center',
    padding: mobileTheme.spacing[6],
  },
  noResponsesText: {
    fontSize: mobileTheme.typography.fontSize.lg,
    color: mobileTheme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: mobileTheme.spacing[2],
  },
  noResponsesSubtext: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.tertiary,
    textAlign: 'center',
    fontStyle: 'italic',
  },

  // DESCRIPTION BOX
  descriptionBox: {
    backgroundColor: mobileTheme.colors.background,
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.md,
    borderLeftWidth: 3,
    borderLeftColor: mobileTheme.colors.primary,
  },

  // RESPONSE FORM
  responseForm: {
    gap: mobileTheme.spacing[3],
  },
  responseInput: {
    backgroundColor: mobileTheme.colors.background,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    borderRadius: mobileTheme.borderRadius.md,
    padding: mobileTheme.spacing[3],
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.primary,
    minHeight: 100,
    textAlignVertical: 'top',
  },

  // ACTIONS
  actionsSection: {
    padding: mobileTheme.spacing[4],
    borderTopWidth: 1,
    borderTopColor: mobileTheme.colors.border,
  },
  actionButton: {
    backgroundColor: mobileTheme.colors.background,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    borderRadius: mobileTheme.borderRadius.md,
    paddingVertical: mobileTheme.spacing[3],
    paddingHorizontal: mobileTheme.spacing[5],
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.medium,
    color: mobileTheme.colors.text.primary,
  },

  // BACK BUTTON
  backButton: {
    backgroundColor: mobileTheme.colors.primary,
    borderRadius: mobileTheme.borderRadius.md,
    paddingVertical: mobileTheme.spacing[3],
    paddingHorizontal: mobileTheme.spacing[5],
    alignItems: 'center',
    marginTop: mobileTheme.spacing[4],
  },
  backButtonText: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.medium,
    color: mobileTheme.colors.white,
  },
  submitButton: {
    backgroundColor: mobileTheme.colors.primary,
    paddingVertical: mobileTheme.spacing[3],
    paddingHorizontal: mobileTheme.spacing[5],
    borderRadius: mobileTheme.borderRadius.md,
    alignItems: 'center',
    ...mobileTheme.shadows.medium,
  },
  submitButtonDisabled: {
    backgroundColor: mobileTheme.colors.text.tertiary,
    ...mobileTheme.shadows.none,
  },
  submitButtonText: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.white,
  },
});
