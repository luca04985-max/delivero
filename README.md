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
