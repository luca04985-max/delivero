# 🧪 Delivero API Testing Guide

## 📋 Overview
Questa guida contiene tutti gli endpoint API del progetto Delivero con test completi per Postman, divisi per ruolo utente.

## 🚀 Quick Setup

### 1. Importa la Collection Postman
1. Apri Postman
2. File → Import → Select File
3. Scegli `Delivero_API_Postman_Collection.json`
4. La collection verrà importata con tutte le variabili d'ambiente

### 2. Configura le Variabili d'Ambiente
In Postman, vai su:
- **Collection Variables** (icona dell'occhio)
- Imposta `base_url` a: `https://delivero-gyjx.onrender.com/api`

### 3. Database Setup
Esegui il file SQL per creare le tabelle mancanti:
```bash
# Se hai PostgreSQL locale
psql -d delivero_db -f database_updates.sql

# Se usi Docker
docker exec -i postgres_container psql -U delivero_user -d delivero_db < database_updates.sql
```

## 🔐 Authentication Flow

### Step 1: Registra gli Utenti Demo
Esegui in ordine questi 3 endpoint:
1. **Register Customer** → Salva `customer_token`
2. **Register Rider** → Salva `rider_token`  
3. **Register Manager** → Salva `manager_token`

### Step 2: Login (Alternative alla registrazione)
Se gli utenti esistono già, usa:
1. **Login Customer** → Salva `customer_token`
2. **Login Rider** → Salva `rider_token`
3. **Login Manager** → Salva `manager_token`

### Step 3: Verifica Token
Testa **Get Current User (Customer)** per verificare che il token funzioni.

## 📦 API Endpoints per Ruolo

### 👤 Customer Role (`customer_token`)

#### Auth
- ✅ `GET /auth/me` - Get current user profile
- ✅ `POST /auth/login` - Login
- ✅ `POST /auth/register` - Register

#### Orders
- ✅ `GET /orders` - Get all orders
- ✅ `GET /orders/my` - Get my orders
- ✅ `POST /orders` - Create new order
- ✅ `GET /orders/:id/track` - Track order
- ✅ `PUT /orders/:id/cancel` - Cancel order
- ✅ `POST /orders/:id/rate` - Rate order

#### Tickets
- ✅ `GET /tickets/customer` - Get my tickets
- ✅ `POST /tickets/customer` - Create ticket

#### User Profile
- ✅ `GET /user/profile` - Get profile
- ✅ `PUT /user/profile` - Update profile

#### Payments
- ✅ `POST /payments/cash/create` - Create cash payment
- ✅ `POST /payments/cash/collected` - Mark cash collected
- ✅ `POST /payments/create` - Create Stripe payment
- ✅ `POST /payments/confirm` - Confirm Stripe payment

### 🚗 Rider Role (`rider_token`)

#### Orders
- ✅ `GET /orders/available` - Get available orders
- ✅ `GET /orders/rider/active` - Get active orders
- ✅ `PUT /orders/:id/accept` - Accept order
- ✅ `PUT /orders/:id/status` - Update status
- ✅ `PUT /orders/:id/delivered` - Complete delivery
- ✅ `POST /orders/:id/location` - Send location

#### Tickets
- ✅ `GET /tickets/rider` - Get my tickets
- ✅ `POST /tickets/rider` - Create ticket

#### Location
- ✅ `POST /rider/location` - Send location
- ✅ `GET /rider/:riderId/location` - Get rider location
- ✅ `GET /rider/my-active-order/location` - Get my active order location

### 🛡️ Manager/Admin Role (`manager_token`)

#### Admin
- ✅ `GET /admin/stats` - Get statistics
- ✅ `GET /admin/orders` - Get all orders
- ✅ `GET /admin/users` - Get all users
- ✅ `PUT /admin/users/:userId/role` - Update user role
- ✅ `PUT /admin/users/:userId` - Update user
- ✅ `DELETE /admin/users/:userId` - Delete user
- ✅ `GET /admin/finance` - Get finance report
- ✅ `GET /admin/metrics` - Get service metrics
- ✅ `GET /admin/tickets/stats` - Get ticket stats

#### Tickets
- ✅ `GET /tickets/admin` - Get all tickets
- ✅ `GET /tickets/admin/all` - Get all tickets (extended)

#### Orders
- ✅ `GET /orders/active/all` - Get all active orders with tracking

## 🧪 Test Script Esempio

### 1. Customer Flow Completo
```javascript
// 1. Login Customer
POST /auth/login
{
  "email": "demo.customer@delivero.local",
  "password": "123456"
}

// 2. Get Profile
GET /user/profile
Authorization: Bearer {{customer_token}}

// 3. Create Order
POST /orders
{
  "restaurantId": 1,
  "items": [
    {
      "menuItemId": 1,
      "quantity": 2,
      "customizations": []
    }
  ],
  "total": 25.50,
  "deliveryAddress": "Via Roma 123, Roma"
}

// 4. Create Ticket
POST /tickets/customer
{
  "type": "support",
  "title": "Test Ticket",
  "description": "This is a test ticket"
}
```

### 2. Rider Flow Completo
```javascript
// 1. Login Rider
POST /auth/login
{
  "email": "demo.rider@delivero.local",
  "password": "123456"
}

// 2. Get Available Orders
GET /orders/available
Authorization: Bearer {{rider_token}}

// 3. Accept Order
PUT /orders/1/accept
Authorization: Bearer {{rider_token}}

// 4. Send Location
POST /orders/1/location
{
  "latitude": 41.9028,
  "longitude": 12.4964,
  "eta_minutes": 15
}
Authorization: Bearer {{rider_token}}
```

### 3. Manager Flow Completo
```javascript
// 1. Login Manager
POST /auth/login
{
  "email": "demo.manager@delivero.local",
  "password": "123456"
}

// 2. Get Stats
GET /admin/stats
Authorization: Bearer {{manager_token}}

// 3. Get All Orders
GET /admin/orders
Authorization: Bearer {{manager_token}}

// 4. Get All Tickets
GET /tickets/admin
Authorization: Bearer {{manager_token}}
}
```

## 🔍 Troubleshooting

### Errori Comuni
1. **401 Unauthorized** → Token non valido o mancante
2. **403 Forbidden** → Ruolo non autorizzato per l'endpoint
3. **404 Not Found** → Endpoint non implementato
4. **500 Server Error** → Errore del backend (controlla i log)

### Debug Tips
- Usa i test script in Postman per salvare automaticamente i token
- Controlla la console Postman per i log delle richieste
- Verifica che il backend sia in esecuzione: `GET /health`

### Token Management
I token vengono salvati automaticamente nelle collection variables:
- `customer_token` - Per operazioni customer
- `rider_token` - Per operazioni rider  
- `manager_token` - Per operazioni admin/manager

## 📝 Note Finali

- Tutti gli endpoint richiedono autenticazione tranne `/auth/register` e `/auth/login`
- I token hanno una scadenza (impostala nel backend)
- Usa HTTPS in produzione
- Implementa rate limiting per proteggere dagli attacchi

## 🚀 Prossimi Passi

1. Testa tutti gli endpoint con la collection Postman
2. Verifica che i permessi per ruolo funzionino correttamente
3. Testa il flusso completo end-to-end
4. Implementa i test automatici se necessario

Buon testing! 🎯
