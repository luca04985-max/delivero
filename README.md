# Delivero - Food & Delivery Platform

A complete multi-category food and delivery platform with mobile app, backend, and admin dashboard.

**📚 Documentation**: [Italiano](README_ITA.md) | English

## 📋 Project Overview

Delivero is a modern delivery platform that includes:

- **React Native Mobile App**: For customers, riders, and admins
- **Node.js Backend**: RESTful API with WebSocket for real-time tracking
- **Admin Dashboard**: Web interface for order and user management
- **Multi-service**: Food, pharmacies, transportation, document pickup

## 🏗️ Architecture

```
delivero/
├── mobile/                 # React Native App
│   ├── screens/
│   │   ├── auth/          # Login, Registration
│   │   ├── customer/      # Customer screens
│   │   ├── rider/         # Rider screens
│   │   └── admin/         # Admin screens
│   ├── components/        # Reusable components
│   └── services/          # API and services
├── backend/               # Node.js + Express API
│   ├── src/
│   │   ├── controllers/   # Business logic
│   │   ├── middleware/    # Authentication middleware
│   │   └── websocket/     # WebSocket for tracking
│   └── migrations/        # Database migrations
└── frontend/              # Admin Dashboard (React)
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 16.0.0
- **npm** or **yarn**
- **React Native CLI**
- **Android Studio** (for Android)
- **Xcode** (for iOS, macOS only)
- **Docker** (optional, for backend)

### Initial Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd delivero
```

2. **Install dependencies**
```bash
# Install root dependencies
npm install

# Install mobile dependencies
cd mobile
npm install
npx expo install --fix

# Install backend dependencies
cd ../backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. **Environment configuration**
```bash
# Copy .env.example files
cp .env.example .env
cp backend/.env.example backend/.env
cp mobile/.env.example mobile/.env
cp frontend/.env.production frontend/.env.production
```

## 📱 Mobile App Build

### Android

1. **Android environment setup**
```bash
# Make sure you have Android Studio installed
# Set up ANDROID_HOME environment variable
```

2. **Development APK build**
```bash
cd mobile
npx expo run:android
```

3. **Production APK build**
```bash
cd mobile
npx expo build:android --type apk
# or for AAB (recommended for Play Store)
npx expo build:android --type app-bundle
```

4. **Gradle build (alternative)**
```bash
cd mobile/android
./gradlew clean
./gradlew assembleRelease    # APK
./gradlew bundleRelease      # AAB
```

**Android build output:**
- APK: `mobile/android/app/build/outputs/apk/release/app-release.apk`
- AAB: `mobile/android/app/build/outputs/bundle/release/app-release.aab`

### iOS (macOS only)

1. **iOS environment setup**
```bash
# Install Xcode from App Store
# Install CocoaPods
sudo gem install cocoapods
```

2. **Install iOS dependencies**
```bash
cd mobile/ios
pod install
```

3. **Development build**
```bash
cd mobile
npx expo run:ios
```

4. **Production build**
```bash
cd mobile
npx expo build:ios --type archive
```

5. **Xcode build (alternative)**
```bash
# Open mobile/ios/Delivero.xcworkspace in Xcode
# Product -> Archive
```

## 🖥️ Backend Build

### Development
```bash
cd backend
npm run dev
```

### Production with Docker
```bash
# Build image
docker build -t delivero-backend .

# Run container
docker run -p 3000:3000 delivero-backend
```

### Production without Docker
```bash
cd backend
npm install
npm run build
npm start
```

## 🌐 Frontend Admin Build

### Development
```bash
cd frontend
npm start
```

### Production
```bash
cd frontend
npm run build
# Output in frontend/build/
```

### Production with Docker
```bash
cd frontend
docker build -t delivero-frontend .
docker run -p 80:80 delivero-frontend
```

## 🐳 Docker Compose (Full Production)

```bash
# Start all services
docker-compose up -d

# Check logs
docker-compose logs -f

# Stop all services
docker-compose down
```

## 📱 Distribution

### Android Play Store

1. **Generate signed APK/AAB**
```bash
cd mobile/android
./gradlew assembleRelease
# or
./gradlew bundleRelease
```

2. **Upload to Google Play Console**
- Go to [Google Play Console](https://play.google.com/console)
- Create new app
- Upload AAB file (recommended) or APK

### iOS App Store

1. **Archive with Xcode**
```bash
# Open mobile/ios/Delivero.xcworkspace
# Product -> Archive
# Distribute App Store
```

2. **Upload with Application Loader**
- Use Xcode Organizer to upload to App Store Connect

## 🔧 Configuration

### Environment Variables

**Backend (.env):**
```env
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb://localhost:27017/delivero
JWT_SECRET=your-secret-key
STRIPE_SECRET_KEY=your-stripe-key
```

**Mobile (.env):**
```env
EXPO_PUBLIC_API_URL=http://your-backend-url:3000
EXPO_PUBLIC_WS_URL=ws://your-backend-url:3000
```

### Database Setup

```bash
# MongoDB
mongosh
use delivero
# Migrations will run automatically on startup
```

## Safe DB scripts

- Purpose: ensure the database schema has required columns and optionally seed demo data in an idempotent way.
- Existing scripts:
	- `backend/scripts/ensure-db-schema.js` — runs `ALTER TABLE ... ADD COLUMN IF NOT EXISTS` checks and attempts to add missing columns. The script deduplicates column definitions before attempting ALTERs to avoid repeated attempts on the same column name.
	- `backend/scripts/seed-demo-data.js` — demo seeder that uses upserts (`ON CONFLICT`) where possible.

Usage (dry-run by default):

```bash
# Show what would run (no changes):
node backend/scripts/run-db-scripts.js

# Actually execute schema + seed (run only after backups):
node backend/scripts/run-db-scripts.js --force
```

Notes and safety:
- Always run against a development/staging database first.
- Make a backup before running against production.
- `run-db-scripts.js` is a small wrapper that prints the actions by default and only executes the two scripts when `--force` is provided.
- Set the DB connection with `DATABASE_URL` (or project-specific env vars) before running. Example (PowerShell):

```powershell
$env:DATABASE_URL = "postgres://user:pass@localhost:5432/dbname"
node backend/scripts/run-db-scripts.js --force
```

Or run the comprehensive JS seeder (creates demo users, restaurants, menu items, orders):

```bash
cd backend
node scripts/seed-demo-data.js
```

## 🧪 Testing

### Mobile
```bash
cd mobile
npm test
```

### Backend
```bash
cd backend
npm test
```

## 📊 Monitoring & Logging

- **Performance monitoring**: Enabled in production
- **Error tracking**: Configured to send critical errors
- **Analytics**: User events and business tracking

## 🚀 Deployment

### Backend (Render/Heroku)
```bash
# Deploy to Render
git push origin main

# Deploy to Heroku
heroku create delivero-backend
git push heroku main
```

### Frontend (Netlify/Vercel)
```bash
# Build and deploy to Netlify
cd frontend
npm run build
# Upload /build folder to Netlify
```

## 🔐 Security

- **JWT Authentication**: Secure tokens with expiration
- **Password Hashing**: bcrypt for passwords
- **CORS Configured**: Authorized domains only
- **Input Validation**: Data input sanitization
- **Rate Limiting**: DDoS attack protection

## 🔎 Logging

- The backend uses `winston` and writes logs under `logs/` (combined.log, error.log).
- Set `LOG_LEVEL` env var to `debug|info|warn|error` to control verbosity.

## 📈 Metrics (Prometheus)

- The backend exposes a Prometheus metrics endpoint at `GET /metrics` (Prometheus text format).
- Metrics collected:
	- `delivero_http_request_duration_seconds` (histogram) — per-route request duration.
	- `delivero_http_requests_total` (counter) — total requests by method/route/status.
	- `delivero_inventory_toggles_total` (counter) — inventory availability toggles (label `by_role`).
	- `delivero_dispatch_estimates_total` (counter) — number of dispatch estimate requests (batched counts increment accordingly).
	- `delivero_dispatch_simulations_total` (counter) — number of simulation requests.

To scrape metrics with Prometheus, add a job pointing to your backend host, e.g.:

```yaml
scrape_configs:
	- job_name: 'delivero-backend'
		static_configs:
			- targets: ['host.docker.internal:5000']
		metrics_path: /metrics
```

Note: install `prom-client` in the backend before running:

```bash
cd backend
npm install prom-client
```

## 📝 Troubleshooting

### Common Issues

**Android Build Failed:**
```bash
# Clean cache
cd mobile/android
./gradlew clean
./gradlew assembleRelease
```

**iOS Build Failed:**
```bash
# Reinstall pods
cd mobile/ios
pod deintegrate
pod install
```

**Corrupted Dependencies:**
```bash
# Clean node_modules
rm -rf node_modules package-lock.json
npm install
```

## 🤝 Contributing

1. Fork the repository
2. Feature branch (`git checkout -b feature/amazing-feature`)
3. Commit (`git commit -m 'Add amazing feature'`)
4. Push (`git push origin feature/amazing-feature`)
5. Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- **Email**: support@delivero.com
- **Documentation**: [Project Wiki](link-to-wiki)
- **Issues**: [GitHub Issues](link-to-issues)

---

**Delivero** - Your favorite delivery platform 🚀📦

## Prototype: Inventory & Dispatch Endpoints

This repository includes a lightweight prototype for two backend features described in the technical document:

- Dynamic Inventory: toggle menu item availability at runtime.
- Dispatch estimate: simple algorithm that suggests a rider and meetup point.

API endpoints (backend):

- `GET /api/inventory/:restaurantId/items` — list menu items with availability and preparation time.
- `PUT /api/inventory/items/:itemId/availability` — body `{ "is_available": true|false }` to toggle availability.
- `POST /api/dispatch/estimate` — body `{ "restaurantLat": number, "restaurantLon": number, "prepMinutes": number, "riders": [{"id":...,"latitude":...,"longitude":...}] }` — returns suggested rider and meetup coordinates.

Protected endpoints and auth
- Endpoints that modify data are protected with JWT-based authentication. Include header: `Authorization: Bearer <TOKEN>`.
- Example: toggling availability requires a user with role `restaurant` or `admin`.

Dispatch advanced features
- `POST /api/dispatch/estimate` supports batching: provide an `orders` array to assign riders to multiple orders. Example:

```json
{
	"orders": [
		{ "id": "o1", "restaurantLat": 45.46427, "restaurantLon": 9.18951, "prepMinutes": 12 },
		{ "id": "o2", "restaurantLat": 45.462, "restaurantLon": 9.19, "prepMinutes": 8 }
	],
	"riders": [ { "id": 1, "latitude": 45.47, "longitude": 9.18 } ]
}
```

- `POST /api/dispatch/simulate` — protected. Generate mock riders around a center point (useful for local testing tools).

How to try locally:

1. Ensure the backend database is available and migrations applied (see `backend/db/schema.sql`).
2. Start the backend:

```bash
cd backend
npm install
npm run dev
```

3. Example `curl` for inventory:

```bash
curl http://localhost:5000/api/inventory/1/items

curl -X PUT http://localhost:5000/api/inventory/items/42/availability \
	-H "Content-Type: application/json" \
	-d '{"is_available": false}'
```

4. Example `curl` for dispatch estimate:

```bash
curl -X POST http://localhost:5000/api/dispatch/estimate \
	-H "Content-Type: application/json" \
	-d '{"restaurantLat":45.46427, "restaurantLon":9.18951, "prepMinutes":12, "riders":[{"id":1,"latitude":45.470,"longitude":9.180},{"id":2,"latitude":45.460,"longitude":9.200}] }'
```

These endpoints are intentionally small and easy to extend for production logic (authentication, DB transaction safety, richer dispatch heuristics, rider availability streams, etc.).

**Developer notes / recent prototype changes**

- Purpose: small end-to-end prototype for Dynamic Inventory + Dispatch estimation, with frontend and mobile integration.
- Key backend files added/updated:
	- `backend/src/controllers/inventoryController.js` — list menu items, toggle availability (protected).
	- `backend/src/controllers/dispatchController.js` — estimate (single + batching) and simulate riders.
	- `backend/src/routes/inventory.js` and `backend/src/routes/dispatch.js` — routes registered in `backend/src/app.js`.
	- `backend/src/middleware/metrics.js` — Prometheus metrics instrumentation and middleware; `/metrics` endpoint exposed.

- Seed and DB:
	- Schema: `backend/db/schema.sql` (idempotent schema).
	- Demo seeder: `backend/scripts/seed-demo-data.js` (JS seeder with bcrypt hashed passwords). Prefer running this for realistic demo data.

- Frontend (web) integration:
	- API helpers: `frontend/src/services/api.js` — added `inventoryAPI` and `dispatchAPI` clients.
	- UI: `frontend/src/pages/manager/InventoryManager.jsx` — manager-facing inventory UI; integrated into `ManagerDashboard.jsx` via an "Inventory" tab and a hero button.

- Mobile integration:
	- API helpers: `mobile/services/api.js` — added `inventoryAPI` and `dispatchAPI` clients.
	- Screen: `mobile/screens/restaurant/InventoryScreen.js` — list + toggle availability.
	- Navigation: `mobile/App.js` — new `RestaurantStack` (shown when `user.role === 'restaurant'`) and `Inventory` screen registered. `ProfileScreen` and `RestaurantDetailScreen` include role-guarded quick links to open inventory management.

- Logging & Metrics:
	- Backend logging via `winston` (existing `backend/src/utils/logger.js`). Controllers instrumented with `info/debug/error` logs.
	- Prometheus metrics via `prom-client` (install in backend). Metrics endpoint at `/metrics`.

Quick developer run checklist (local):

1. Ensure PostgreSQL is running and `DATABASE_URL` or DB env vars set.
2. Apply schema (or run seeder which ensures schema):

```bash
psql $DATABASE_URL -f backend/db/schema.sql
node backend/scripts/seed-demo-data.js
```

3. Install new dependency for metrics and start backend:

```bash
cd backend
npm install
npm install prom-client
npm run dev
```

4. Frontend / Mobile: dependencies already present — run as usual. The new inventory UI is available to users with role `restaurant` (mobile) and via Manager dashboard (web).

Code comments: recent controller and routing files include inline logging/comments to guide future extensions (transaction safety, auth scopes, richer dispatch heuristics).

If you want, I can prepare a short commit message and run the commit for you, or generate a PR with a changelog and a small Grafana dashboard JSON.
