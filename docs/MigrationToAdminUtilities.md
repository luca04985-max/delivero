Migration to admin utilities

Overview
- Purpose: standardize admin/manager/customer styles using `adminTheme` tokens and `.u-*` utility classes in `frontend/src/styles/adminUtilities.css`.
- Files added:
  - `frontend/src/styles/adminTheme.js` — centralized JS style tokens for admin views
  - `frontend/src/styles/adminUtilities.css` — utility classes: `.u-container`, `.u-card`, `.u-title`, `.u-promo-card`, `.u-category-card`, `.u-restaurant-card`, `.u-order-card`, `.u-grid-cards`, `.u-btn`, `.u-btn-primary`, `.u-muted`.

Quick migration examples

1) Replace page container
Before:
- HTML/JSX: `<div className="container">` or inline `style={{padding: 28}}`.
After:
- HTML/JSX: `<div className="u-container">` (adds max-width, padding and admin bg).

2) Convert card components
Before:
- `<div className="order-card">` or custom inline styles.
After:
- `<div className="u-card u-order-card">`

3) Titles & buttons
Before:
- `<h2 className="page-title">` and `<button className="primary">`
After:
- `<h2 className="u-title">`
- `<button className="u-btn u-btn-primary">`

4) Grid of cards
Before:
- custom grid CSS or repeated flex implementations.
After:
- `<div className="u-grid-cards">` then children `.u-card` or `.u-restaurant-card`.

Guidelines & notes
- Prefer `adminTheme.js` tokens for inline/JSS styling where components compute responsive values.
- Keep utility classes lightweight and composable (avoid duplicating large visual styles in components).
- When replacing a selector, run a quick grep for other uses before removing original rules.
- Recommended deprecation flow:
  1. Replace usages in JSX to use `.u-*` utilities.
  2. Move original CSS rules to `frontend/src/styles/deprecated/legacy.css` (preserves history/safety).
  3. After one release and visual QA, remove deprecated rules.

Examples mapping table
- `.container` -> `.u-container`
- `.card`, `.card-body` -> `.u-card`
- `.order-card` -> `.u-order-card`
- `.promo-title`, `.promo-code` -> use `.u-promo-card` and inside `h3.u-title`
- `.category-name`, `.category-emoji` -> `.u-category-card` + internal markup

Where to start
- Migrate reusable components first (`RestaurantCard`, `OrderCard`, `PromoCard`).
- Then migrate page shells (CustomerHome, CustomerOrders).

Files touched by prior work (reference)
- `frontend/src/styles/adminUtilities.css`
- `frontend/src/styles/adminTheme.js`
- Example migrated pages: `frontend/src/pages/customer/CustomerHomeEnhanced.jsx`, `frontend/src/pages/customer/CustomerOrdersEnhanced.jsx`

Contact / next steps
- I can run a repo-wide scan to list remaining selectors still referencing old classes, then automatically move their rules to `frontend/src/styles/deprecated/legacy.css` for manual review. Confirm if you want me to proceed with automatic isolation.