# Delivero API Reference (extended)

This document provides a concise, developer-focused overview of the most relevant HTTP endpoints used by the frontend and mobile clients. It includes request/response shapes and curl examples.

Base URL (local): `http://localhost:5000`

--

## Authentication

- POST /api/auth/login
  - Body: `{ "email": string, "password": string }`
  - Success: `200` `{ "token": "<jwt>", "user": { id, name, email, role } }`

- POST /api/auth/register
  - Body: `{ "name": string, "email": string, "password": string, "role": string }`
  - Success: `201` `{ "user": { ... } }`

Example curl:

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"example@example.com","password":"secret"}'
```

--

## User addresses (used by mobile `PaymentMethodsScreen`)

All endpoints require an Authorization header: `Authorization: Bearer <token>`

- GET /api/user/addresses
  - Returns: `200` `[{ id, label, display_name, latitude, longitude, created_at }]`

- POST /api/user/addresses
  - Body: `{ "label": string, "display_name": string, "latitude": number|null, "longitude": number|null }`
  - Returns: `201` saved address object with `id`

- DELETE /api/user/addresses/:id
  - Returns: `204` on success

Example save address:

```bash
curl -X POST http://localhost:5000/api/user/addresses \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{"label":"Casa","display_name":"Via Roma 1, Milano","latitude":45.4642,"longitude":9.19}'
```

--

## Payments (saved cards)

- GET /api/payments/saved-cards
  - Returns: `200` `[{ id, brand, last4, exp_month, exp_year }]

- POST /api/payments/cards
  - (Depends on integration with Stripe) Body: tokenized card data or payment method id
  - Returns 201 saved card metadata

--

## Orders

- POST /api/orders
  - Body: order payload (restaurant_id, items[], address_id, total, etc.)
  - Returns: `201` created order

- GET /api/orders/:id
  - Returns: `200` order object, with status/history

--

Notes and best practices:

- Use the `/metrics` and `/health` endpoints for monitoring and readiness checks.
- All write operations require authorization; prefer short-lived tokens for mobile clients.
- When adding new fields to addresses or payment objects, keep backward compatibility by making them optional and versioning the API if needed.

If you want, I can expand this doc with full request/response JSON schemas and example responses for each endpoint used by the mobile app.
