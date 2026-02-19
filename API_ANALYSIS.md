# Analisi API Mobile vs Backend

## 📋 Chiamate API Mobile (da services/api.js)

### 🔐 Auth API
- ✅ `POST /auth/register` - Esiste nel backend
- ✅ `POST /auth/login` - Esiste nel backend  
- ❌ `GET /auth/me` - NON ESISTE nel backend (commentato)
- ❌ `PUT /auth/push-token` - NON ESISTE nel backend (commentato)

### 📦 Orders API
- ✅ `GET /orders` - Esiste
- ✅ `GET /orders/my` - Esiste (alias)
- ✅ `POST /orders` - Esiste
- ✅ `GET /orders/available` - Esiste
- ✅ `GET /orders/:id/track` - Esiste
- ✅ `PUT /orders/:id/cancel` - Esiste
- ✅ `POST /orders/:id/rate` - Esiste
- ✅ `GET /orders/rider/active` - Esiste
- ✅ `PUT /orders/:id/accept` - Esiste
- ✅ `PUT /orders/:id/status` - Esiste
- ✅ `PUT /orders/:id/complete` - Esiste
- ✅ `PUT /orders/:id/delivered` - Esiste
- ✅ `POST /orders/:id/location` - Esiste
- ✅ `GET /orders/active/all` - Esiste

### 🎫 Tickets API
- ❌ `GET /tickets/customer` - NON ESISTE (backend ha /tickets/my-tickets)
- ❌ `POST /tickets/customer` - NON ESISTE (backend ha POST /tickets generico)
- ❌ `GET /tickets/rider` - NON ESISTE (backend ha /tickets/my-tickets)
- ❌ `POST /tickets/rider` - NON ESISTE (backend ha POST /tickets generico)
- ✅ `GET /tickets/admin` - Esiste
- ✅ `GET /tickets/admin/all` - Esiste (duplicato)

### 👤 User API
- ❌ `GET /user/profile` - NON ESISTE
- ❌ `PUT /user/profile` - NON ESISTE
- ❌ `PUT /auth/push-token` - NON ESISTE

### 🛡️ Admin API
- ✅ `GET /admin/stats` - Esiste
- ✅ `GET /admin/orders` - Esiste
- ✅ `GET /admin/users` - Esiste
- ✅ `PUT /admin/users/:userId/role` - Esiste
- ✅ `PUT /admin/users/:userId` - Esiste
- ✅ `DELETE /admin/users/:userId` - Esiste
- ✅ `GET /admin/finance` - Esiste
- ✅ `GET /admin/metrics` - Esiste (ma backend ha /admin/metrics)
- ✅ `GET /admin/tickets/stats` - Esiste

### 💳 Payments API
- ❌ `POST /payments/cash/create` - NON ESISTE
- ❌ `POST /payments/cash/collected` - NON ESISTE
- ❌ `POST /payments/create` - NON ESISTE
- ❌ `POST /payments/confirm` - NON ESISTE

### 📍 Rider Location API
- ❌ `POST /rider/location` - NON ESISTE
- ❌ `GET /rider/:riderId/location` - NON ESISTE

## 🚨 Endpoint Mancanti nel Backend

### 1. Auth Routes
```javascript
// DA AGGIUNGERE in routes/auth.js
router.get('/me', authenticateToken, getCurrentUser);
router.put('/push-token', authenticateToken, updatePushToken);
```

### 2. User Routes (NUOVO FILE)
```javascript
// CREARE routes/user.js
router.get('/profile', authenticateToken, getUserProfile);
router.put('/profile', authenticateToken, updateUserProfile);
```

### 3. Tickets Routes (CORREZIONI)
```javascript
// CORREGGERE in routes/tickets.js - aggiungere:
router.get('/customer', authenticateToken, getCustomerTickets); // Solo customer
router.get('/rider', authenticateToken, getRiderTickets);    // Solo rider
```

### 4. Payments Routes (NUOVO FILE)
```javascript
// CREARE routes/payments.js
router.post('/cash/create', authenticateToken, createCashPayment);
router.post('/cash/collected', authenticateToken, markCashCollected);
router.post('/create', authenticateToken, createStripePayment);
router.post('/confirm', authenticateToken, confirmStripePayment);
```

### 5. Rider Location Routes (NUOVO FILE)
```javascript
// CREARE routes/rider.js
router.post('/location', authenticateToken, sendRiderLocation);
router.get('/:riderId/location', authenticateToken, getRiderLocation);
```

## 📝 Riepilogo Implementazioni Necessarie

1. **Auth Controller**: Aggiungere `getCurrentUser` e `updatePushToken`
2. **User Controller**: Creare nuovo controller per profilo utente
3. **Tickets Controller**: Aggiungere filtri per ruolo (customer/rider)
4. **Payments Controller**: Creare nuovo controller per pagamenti
5. **Rider Controller**: Creare nuovo controller per location rider
6. **Route Files**: Creare/aggiungere i file di routing mancanti
7. **App.js**: Registrare le nuove rotte nell'app principale
