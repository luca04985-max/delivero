# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- Prototype: `inventory` and `dispatch` backend endpoints with controllers and routes.
- Frontend: `InventoryManager` page and integration in `ManagerDashboard`.
- Mobile: `InventoryScreen` and role-based navigation for `restaurant` users.
- DB: idempotent schema (`backend/db/schema.sql`) and JS seeder (`backend/scripts/seed-demo-data.js`).
- Metrics: Prometheus instrumentation (`/metrics`) and domain counters for inventory/dispatch.

### Changed
- Logging: added `winston` logs in controllers for observability.

### Notes
- Dispatch algorithm is a simple heuristic suitable for prototyping; production scheduling requires enhancements.
