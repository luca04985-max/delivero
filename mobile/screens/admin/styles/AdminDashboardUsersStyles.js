import { StyleSheet } from 'react-native';
import { mobileTheme } from '../../../theme';
import { unifiedStyles } from '../../../theme/UnifiedStyles';
import { BASE_SPACE, FONT_FAMILY, FONT_SIZE_BASE } from '../../../theme/StyleConstants.js';


export const adminDashboardUsersStyles = StyleSheet.create({
  ...unifiedStyles,

  // usersContainer: wrapper lista utenti
  usersContainer: {
    padding: mobileTheme.spacing[4],
  },

  // roleCustomer: bordo colore ruolo customer
  roleCustomer: {
    borderLeftColor: mobileTheme.colors.primary,
  },
  // roleRider: bordo colore ruolo rider
  roleRider: {
    borderLeftColor: mobileTheme.colors.success,
  },
  // roleManager: bordo colore ruolo manager
  roleManager: {
    borderLeftColor: mobileTheme.colors.warning,
  },
  // roleAdmin: bordo colore ruolo admin
  roleAdmin: {
    borderLeftColor: mobileTheme.colors.error,
  },

  // userCard: card utente (legacy)
  userCard: {
    backgroundColor: mobileTheme.colors.white,
    borderRadius: mobileTheme.borderRadius.lg,
    padding: mobileTheme.spacing[4],
    marginBottom: mobileTheme.spacing[4],
    ...mobileTheme.shadows.soft,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  // userHeader: header card utente
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: mobileTheme.spacing[3],
  },
  // userAvatar: avatar utente
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: BASE_SPACE * 3.125,
    backgroundColor: mobileTheme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: mobileTheme.spacing[3],
  },
  // avatarText: iniziali avatar
  avatarText: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
  },
  // userInfo: contenitore info utente
  userInfo: {
    flex: 1,
  },
  // userName: nome utente
  userName: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[1],
  },
  // userEmail: email utente
  userEmail: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    marginBottom: mobileTheme.spacing[1],
  },
  // userRole: badge ruolo utente
  userRole: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.primary,
    fontWeight: mobileTheme.typography.fontWeight.medium,
    backgroundColor: mobileTheme.colors.primarySoft,
    paddingHorizontal: mobileTheme.spacing[2],
    paddingVertical: mobileTheme.spacing[1],
    borderRadius: mobileTheme.borderRadius.sm,
    alignSelf: 'flex-start',
  },
  // userRoleInline: inline role text color
  userRoleInline: {
    color: mobileTheme.colors.primary,
  },
  // userStatus: stato utente
  userStatus: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.secondary,
    marginTop: mobileTheme.spacing[1],
  },

  // userStats: statistiche utente
  userStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: mobileTheme.spacing[3],
    paddingTop: mobileTheme.spacing[3],
    borderTopWidth: 1,
    borderTopColor: mobileTheme.colors.border,
  },
  // userStat: singola statistica
  userStat: {
    alignItems: 'center',
  },
  // userStatValue: valore statistica
  userStatValue: {
    fontSize: mobileTheme.typography.fontSize.md,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.primary,
    marginBottom: mobileTheme.spacing[1],
  },
  // userStatLabel: label statistica
  userStatLabel: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.secondary,
    textAlign: 'center',
  },

  // userActions: riga azioni utente
  userActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: mobileTheme.spacing[3],
    gap: mobileTheme.spacing[2],
  },
  // btnEdit: bottone modifica utente
  btnEdit: {
    backgroundColor: mobileTheme.colors.primary, // Arancione per modifica
    paddingVertical: mobileTheme.spacing[2],
    paddingHorizontal: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
    marginRight: mobileTheme.spacing[2],
    ...mobileTheme.shadows.soft, // Ombra leggera per profondità
    borderWidth: 1,
    borderColor: mobileTheme.colors.primaryDark,
  },
  // btnDelete: bottone elimina utente
  btnDelete: {
    backgroundColor: mobileTheme.colors.error, // Rosso per elimina
    paddingVertical: mobileTheme.spacing[2],
    paddingHorizontal: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
    ...mobileTheme.shadows.soft, // Ombra leggera per profondità
    borderWidth: 1,
    borderColor: mobileTheme.colors.error,
  },
  // btnDisabled: stato disabilitato azione
  btnDisabled: {
    backgroundColor: mobileTheme.colors.text.tertiary, // Grigio per disabilitato
    opacity: 0.5,
    paddingVertical: mobileTheme.spacing[2],
    paddingHorizontal: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  // buttonText: testo azioni utente
  buttonText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.white,
    textTransform: 'uppercase',
    letterSpacing: 0.5, // Spaziatura per leggibilità
  },

  // roleBadge: badge ruolo
  roleBadge: {
    paddingHorizontal: mobileTheme.spacing[2],
    paddingVertical: mobileTheme.spacing[1],
    borderRadius: mobileTheme.borderRadius.sm,
    alignSelf: 'flex-start',
  },
  // roleBadgeCustomer: badge customer
  roleBadgeCustomer: {
    backgroundColor: mobileTheme.colors.primarySoft,
  },
  // roleBadgeRider: badge rider
  roleBadgeRider: {
    backgroundColor: mobileTheme.colors.successBg,
  },
  // roleBadgeManager: badge manager
  roleBadgeManager: {
    backgroundColor: mobileTheme.colors.warningBg,
  },
  // roleBadgeAdmin: badge admin
  roleBadgeAdmin: {
    backgroundColor: mobileTheme.colors.errorBg,
  },
  // roleText: testo badge ruolo
  roleText: {
    fontSize: mobileTheme.typography.fontSize.xs,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    textTransform: 'uppercase',
  },

  // userDetails: dettagli utente
  userDetails: {
    marginTop: mobileTheme.spacing[3],
    paddingTop: mobileTheme.spacing[3],
    borderTopWidth: 1,
    borderTopColor: mobileTheme.colors.border,
  },
  // detailRow: riga dettaglio
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[2],
  },
  // detailLabel: label dettaglio
  detailLabel: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  },
  // detailValue: valore dettaglio
  detailValue: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.medium,
    color: mobileTheme.colors.text.primary,
  },

  // activityIndicator: pallino attività
  activityIndicator: {
    width: 8,
    height: 8,
    borderRadius: BASE_SPACE * 0.500,
    marginRight: mobileTheme.spacing[2],
  },
  // activityActive: stato attivo
  activityActive: {
    backgroundColor: mobileTheme.colors.success,
  },
  // activityInactive: stato inattivo
  activityInactive: {
    backgroundColor: mobileTheme.colors.text.tertiary,
  },

  // lastSeen: ultimo accesso
  lastSeen: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.tertiary,
    marginTop: mobileTheme.spacing[1],
  },

  // emptyContainer: stato vuoto utenti
  emptyContainer: unifiedStyles.emptyContainer,
  // emptyText: testo stato vuoto
  emptyText: unifiedStyles.emptyText,
  // emptySubtext: sottotesto stato vuoto
  emptySubtext: unifiedStyles.emptySubtext,

  // loadingContainer: stato loading
  loadingContainer: unifiedStyles.loadingContainer,
  // loadingText: testo loading
  loadingText: unifiedStyles.loadingText,
  // Modal / Create restaurant styles overrides
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(2,6,23,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[5],
    borderRadius: mobileTheme.borderRadius.xl,
    margin: mobileTheme.spacing[4],
    width: '92%',
    maxWidth: 720,
    ...mobileTheme.shadows.xl,
  },
  modalTitle: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[3],
    textAlign: 'left',
  },
  textInput: {
    backgroundColor: mobileTheme.colors.background,
    padding: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.md,
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.primary,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    marginBottom: mobileTheme.spacing[3],
  },
  modalFormRow: {
    flexDirection: 'row',
    gap: mobileTheme.spacing[3],
    flexWrap: 'wrap',
    marginBottom: mobileTheme.spacing[2],
  },
  formField: {
    flex: 1,
    minWidth: '48%',
  },
  inputLabel: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.secondary,
    marginBottom: mobileTheme.spacing[1],
  },
  helperText: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.tertiary,
    marginBottom: mobileTheme.spacing[2],
  },
  saveButton: {
    backgroundColor: mobileTheme.colors.primary,
    paddingVertical: mobileTheme.spacing[3],
    paddingHorizontal: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  cancelButton: {
    backgroundColor: mobileTheme.colors.white,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    paddingVertical: mobileTheme.spacing[3],
    paddingHorizontal: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  btnSaveText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.white,
  },
  btnCancelText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.medium,
    color: mobileTheme.colors.text.primary,
  },

  // searchContainer: wrapper ricerca utenti
  searchContainer: unifiedStyles.searchContainer,
  // searchInput: input ricerca
  searchInput: unifiedStyles.searchInput,
  // searchIcon: icona ricerca
  searchIcon: {
    position: 'absolute',
    right: mobileTheme.spacing[3],
    top: mobileTheme.spacing[3],
    color: mobileTheme.colors.text.tertiary,
  },

  // filterContainer: filtro per ruolo
  filterContainer: {
    flexDirection: 'row',
    padding: mobileTheme.spacing[4],
    gap: mobileTheme.spacing[2],
  },
  // filterPill: pill filtro
  filterPill: {
    backgroundColor: mobileTheme.colors.background,
    paddingHorizontal: mobileTheme.spacing[3],
    paddingVertical: mobileTheme.spacing[2],
    borderRadius: mobileTheme.borderRadius.full,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  // filterPillActive: pill filtro attiva
  filterPillActive: {
    backgroundColor: mobileTheme.colors.primary,
    borderColor: mobileTheme.colors.primary,
  },
  // filterText: testo filtro
  filterText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  },
  // filterTextActive: testo filtro attivo
  filterTextActive: {
    color: mobileTheme.colors.white,
  },

  // createdDate: data creazione utente
  createdDate: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.tertiary,
    marginTop: mobileTheme.spacing[1],
  },
  // createdDateLabel: label data creazione
  createdDateLabel: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.secondary,
    marginRight: mobileTheme.spacing[1],
  },
});

export default adminDashboardUsersStyles;
