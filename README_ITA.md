# Delivero - Food & Delivery Platform

Piattaforma completa di food delivery e servizi multi-categoria con app mobile, backend e dashboard admin.

## 📋 Panoramica del Progetto

Delivero è una piattaforma moderna di delivery che include:

- **App Mobile React Native**: Per clienti, rider e admin
- **Backend Node.js**: API RESTful con WebSocket per tracking in tempo reale
- **Dashboard Admin**: Interfaccia web per gestione ordini e utenti
- **Multi-servizio**: Food, farmacie, trasporti, ritiro documenti

## 🏗️ Architettura

```
delivero/
├── mobile/                 # App React Native
│   ├── screens/
│   │   ├── auth/          # Login, Registrazione
│   │   ├── customer/      # Schermate cliente
│   │   ├── rider/         # Schermate rider
│   │   └── admin/         # Schermate admin
│   ├── components/        # Componenti riutilizzabili
│   └── services/          # API e servizi
├── backend/               # API Node.js + Express
│   ├── src/
│   │   ├── controllers/   # Logica business
│   │   ├── middleware/    # Middleware autenticazione
│   │   └── websocket/     # WebSocket per tracking
│   └── migrations/        # Database migrations
└── frontend/              # Dashboard Admin (React)
```

## 🚀 Quick Start

### Prerequisiti

- **Node.js** >= 16.0.0
- **npm** o **yarn**
- **React Native CLI**
- **Android Studio** (per Android)
- **Xcode** (per iOS, solo macOS)
- **Docker** (opzionale, per backend)

### Setup Iniziale

1. **Clona il repository**
```bash
git clone <repository-url>
cd delivero
```

2. **Installa le dipendenze**
```bash
# Installa dipendenze root
npm install

# Installa dipendenze mobile
cd mobile
npm install
npx expo install --fix

# Installa dipendenze backend
cd ../backend
npm install

# Installa dipendenze frontend
cd ../frontend
npm install
```

3. **Configurazione ambiente**
```bash
# Copia i file .env.example
cp .env.example .env
cp backend/.env.example backend/.env
cp mobile/.env.example mobile/.env
cp frontend/.env.production frontend/.env.production
```

## 📱 Build App Mobile

### Android

1. **Setup ambiente Android**
```bash
# Assicurati di avere Android Studio installato
# Configura l'ANDROID_HOME environment variable
```

2. **Build APK di sviluppo**
```bash
cd mobile
npx expo run:android
```

3. **Build APK di produzione**
```bash
cd mobile
npx expo build:android --type apk
# oppure per AAB (consigliato per Play Store)
npx expo build:android --type app-bundle
```

4. **Build con Gradle (alternativa)**
```bash
cd mobile/android
./gradlew clean
./gradlew assembleRelease    # APK
./gradlew bundleRelease      # AAB
```

**Output build Android:**
- APK: `mobile/android/app/build/outputs/apk/release/app-release.apk`
- AAB: `mobile/android/app/build/outputs/bundle/release/app-release.aab`

### iOS (solo macOS)

1. **Setup ambiente iOS**
```bash
# Installa Xcode dalla App Store
# Installa CocoaPods
sudo gem install cocoapods
```

2. **Installazione dipendenze iOS**
```bash
cd mobile/ios
pod install
```

3. **Build per sviluppo**
```bash
cd mobile
npx expo run:ios
```

4. **Build per produzione**
```bash
cd mobile
npx expo build:ios --type archive
```

5. **Build con Xcode (alternativa)**
```bash
# Apri mobile/ios/Delivero.xcworkspace in Xcode
# Product -> Archive
```

## 🖥️ Build Backend

### Sviluppo
```bash
cd backend
npm run dev
```

### Produzione con Docker
```bash
# Build immagine
docker build -t delivero-backend .

# Run container
docker run -p 3000:3000 delivero-backend
```

### Produzione senza Docker
```bash
cd backend
npm install
npm run build
npm start
```

## 🌐 Build Frontend Admin

### Sviluppo
```bash
cd frontend
npm start
```

### Produzione
```bash
cd frontend
npm run build
# Output in frontend/build/
```

### Produzione con Docker
```bash
cd frontend
docker build -t delivero-frontend .
docker run -p 80:80 delivero-frontend
```

## 🐳 Docker Compose (Produzione completa)

```bash
# Avvia tutti i servizi
docker-compose up -d

# Controlla i log
docker-compose logs -f

# Spegni tutti i servizi
docker-compose down
```

## 📱 Distribuzione

### Android Play Store

1. **Genera signed APK/AAB**
```bash
cd mobile/android
./gradlew assembleRelease
# oppure
./gradlew bundleRelease
```

2. **Upload su Google Play Console**
- Vai su [Google Play Console](https://play.google.com/console)
- Crea nuova app
- Upload del file AAB (consigliato) o APK

### iOS App Store

1. **Archiviazione con Xcode**
```bash
# Apri mobile/ios/Delivero.xcworkspace
# Product -> Archive
# Distribute App Store
```

2. **Upload con Application Loader**
- Usa Xcode Organizer per upload su App Store Connect

## 🔧 Configurazione

### Variabili Ambiente

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
# Le migrations verranno eseguite automaticamente all'avvio
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

## 📊 Monitoraggio e Logging

- **Performance monitoring**: Abilitato in produzione
- **Error tracking**: Configurato per inviare errori critici
- **Analytics**: Tracking eventi utente e business

## 🚀 Deployment

### Backend (Render/Heroku)
```bash
# Deploy su Render
git push origin main

# Deploy su Heroku
heroku create delivero-backend
git push heroku main
```

### Frontend (Netlify/Vercel)
```bash
# Build e deploy su Netlify
cd frontend
npm run build
# Upload cartella /build su Netlify
```

## 🔐 Sicurezza

- **JWT Authentication**: Token sicuri con scadenza
- **Password Hashing**: bcrypt per password
- **CORS Configurato**: Solo domini autorizzati
- **Input Validation**: Sanitizzazione dati input
- **Rate Limiting**: Protezione contro attacchi DDoS

## 📝 Troubleshooting

### Problemi Comuni

**Android Build Fallita:**
```bash
# Pulisci cache
cd mobile/android
./gradlew clean
./gradlew assembleRelease
```

**iOS Build Fallita:**
```bash
# Reinstalla pods
cd mobile/ios
pod deintegrate
pod install
```

**Dipendenze Corrotte:**
```bash
# Pulisci node_modules
rm -rf node_modules package-lock.json
npm install
```

## 🤝 Contribuzione

1. Fork del repository
2. Branch feature (`git checkout -b feature/amazing-feature`)
3. Commit (`git commit -m 'Add amazing feature'`)
4. Push (`git push origin feature/amazing-feature`)
5. Pull Request

## 📄 Licenza

Questo progetto è licenziato sotto MIT License - vedi il file [LICENSE](LICENSE) per dettagli.

## 📞 Supporto

Per supporto e domande:
- **Email**: support@delivero.com
- **Documentation**: [Wiki del progetto](link-to-wiki)
- **Issues**: [GitHub Issues](link-to-issues)

---

**Delivero** - La tua piattaforma di delivery preferita 🚀📦
