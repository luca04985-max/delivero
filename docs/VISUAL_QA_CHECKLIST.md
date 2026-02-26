# Visual QA Checklist

This checklist helps verify theming changes (CSS variables, theme tokens) applied across frontend and mobile.

- General
  - Open web frontend and mobile app locally (no automated build by this agent).
  - Confirm primary accent (`--admin-accent`) and darker accent (`--admin-accent-dark`) display correctly.
  - Verify buttons, badges, and status chips show expected colors (success, danger, warning, muted).

- Customer screens
  - Customer Home / Advanced: categories, promos, search, and restaurant cards render without missing colors.
  - Orders list: status chips for `pending`, `completed`, `cancelled` show consistent colors.

- Admin / Manager
  - Admin Dashboard and Tickets: status color chips and admin notes use CSS vars and fallbacks.
  - Manager Dashboard: stats cards and order/ticket badges match theme tokens.

- Components
  - SmartSearch: search button, suggestions, and recent items render with theme variables.
  - TicketsList: status badges and admin notes render correctly.

- Mobile
  - Randomly open a few mobile screens to ensure `mobileTheme` is used and no hardcoded hex remains in migrated files.

- Regression checks
  - Verify no console errors related to missing CSS vars.
  - Check contrast for accessibility on primary buttons and badges.

If any visual regressions are found, note the component file and a screenshot, then revert the related change or adjust the token in `frontend/src/styles/adminUtilities.css` or `mobile/theme/mobileTheme.js`.
