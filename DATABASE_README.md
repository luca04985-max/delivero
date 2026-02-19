# 🗄️ Delivero Database Setup & Export

Questo repository contiene tutti gli script necessari per configurare e gestire il database di Delivero.

## 📁 Files

### 🛠️ Database Setup
- **`complete_database_setup.sql`** - Script SQL completo per ricreare tutto il database
- **`database_updates.sql`** - Aggiornamenti per database esistente

### 📤 Data Export
- **`export_database.sh`** - Script bash per esportare dati su Supabase Storage
- **`Delivero_API_Postman_Collection.json`** - Collection Postman per testare le API

## 🚀 Quick Start

### 1. Setup Database Completo

```bash
# Se hai PostgreSQL locale
psql -U delivero_user -d delivero_db -f complete_database_setup.sql

# Se usi Docker
docker exec -i postgres_container psql -U delivero_user -d delivero_db < complete_database_setup.sql

# Se usi Supabase CLI
supabase db reset
supabase db push
```

### 2. Verifica Setup

Dopo aver eseguito lo script SQL, dovresti vedere:

```
Database setup completed! 10 tables created.
Test data inserted successfully.
Ready for API testing!

 table_name      | record_count 
-----------------+-------------
 notifications    |           5
 order_items      |          10
 orders           |           5
 payments         |           4
 rider_locations  |           3
 restaurants      |           5
 ticket_comments  |           5
 tickets          |           4
 users            |           6
```

## 👥 Utenti di Test

Lo script crea automaticamente questi utenti (password: `123456` per tutti):

| Email | Ruolo | Nome | Telefono |
|-------|-------|------|----------|
| `demo.customer@delivero.local` | Customer | Mario Rossi | +39 333 1234567 |
| `demo.customer2@delivero.local` | Customer | Laura Bianchi | +39 333 2345678 |
| `demo.rider@delivero.local` | Rider | Paolo Verdi | +39 333 3456789 |
| `demo.rider2@delivero.local` | Rider | Giulia Neri | +39 333 4567890 |
| `demo.manager@delivero.local` | Manager | Admin User | +39 333 5678901 |
| `admin@delivero.local` | Admin | Super Admin | +39 333 6789012 |

## 🍽️ Ristoranti di Test

| ID | Nome | Cucina | Rating |
|----|------|----------|---------|
| 1 | Pizzeria Da Mario | Italiana | 4.5 |
| 2 | Sushi Express | Giapponese | 4.3 |
| 3 | Burger House | Americana | 4.2 |
| 4 | Trattoria Nonna | Italiana | 4.6 |
| 5 | Kebab Palace | Turca | 4.0 |

## 📦 Ordini di Test

Lo script crea 5 ordini con diversi stati:
- **Ordine #1**: Consegnato (Mario Rossi → Pizzeria Da Mario)
- **Ordine #2**: In consegna (Laura Bianchi → Sushi Express)
- **Ordine #3**: In preparazione (Mario Rossi → Burger House)
- **Ordine #4**: Accettato (Laura Bianchi → Pizzeria Da Mario)
- **Ordine #5**: Pending (Paolo Verdi → Sushi Express)

## 🎫 Tickets di Test

| ID | Utente | Tipo | Titolo | Stato |
|----|--------|------|---------|-------|
| 1 | Mario Rossi | support | Ordine in ritardo | Risolto |
| 2 | Laura Bianchi | technical | App crash | In corso |
| 3 | Paolo Verdi | payment | Pagamento non riuscito | Aperto |
| 4 | Giulia Neri | delivery | Consegna sbagliata | Aperto |

## 📍 Rider Locations

Lo script inserisce posizioni attive per i rider:
- **Paolo Verdi**: Sta consegnando ordini #2 e #3
- **Giulia Neri**: Sta consegnando ordine #5

## 📤 Export Database su Supabase

### Configurazione Script

Modifica le variabili in `export_database.sh`:

```bash
CONN_STRING="postgres://user:password@localhost:5432/delivero_db"
SUPABASE_URL="https://your-project.supabase.co"
SERVICE_ROLE_KEY="your_service_role_key"
```

### Esecuzione Export

```bash
# Rendi eseguibile (se non lo è già)
chmod +x export_database.sh

# Esegui export
./export_database.sh
```

### Output dello Script

Lo script produrrà:
1. **File JSON locale**: `/tmp/all_tables.json` con tutti i dati
2. **Upload su Supabase**: File caricato nel bucket specificato
3. **Signed URL**: URL temporaneo per scaricare il file

### Esempio di Output

```
== Export DB -> JSON ==
Saved to /tmp/all_tables.json (size: 45678 bytes)

== Ensure bucket exists ==
Bucket exists (status 200).

== Uploading file ==
Upload response: {"Key":"exports/20240219_143022_all_tables.json"}

== Generating signed URL (expires in 3600 seconds) ==
Signed URL (valid for 3600 seconds):
https://your-project.supabase.co/storage/v1/object/sign/tmp-exports/exports/20240219_143022_all_tables.json?token=...

== Cleanup local file ==
Local file kept at /tmp/all_tables.json

✅ Database exported successfully
✅ File uploaded to Supabase Storage
✅ Signed URL generated
✅ Ready for testing!
```

## 🧪 Testing con Postman

### 1. Importa Collection
1. Apri Postman
2. File → Import → Select File
3. Scegli `Delivero_API_Postman_Collection.json`

### 2. Configura Variabili
- Vai su Collection Variables
- Imposta `base_url` a: `https://delivero-gyjx.onrender.com/api`

### 3. Test Flow
1. **Register/Login** degli utenti demo
2. **Testa gli endpoint** per ogni ruolo
3. **Verifica i dati** inseriti

## 🔧 Troubleshooting

### Errori Comuni

#### 1. "Connection refused"
```bash
# Verifica che PostgreSQL sia in esecuzione
pg_isready -h localhost -p 5432

# Avvia PostgreSQL se necessario
sudo systemctl start postgresql
```

#### 2. "Permission denied"
```bash
# Dai permessi allo script
chmod +x export_database.sh

# O esegui con bash
bash export_database.sh
```

#### 3. "Bucket not found"
Lo script creerà automaticamente il bucket se non esiste.

#### 4. "Service role key invalid"
Verifica che la SERVICE_ROLE_KEY sia corretta e abbia permessi di storage.

### Debug Mode

Per abilitare il debug nello script export:
```bash
# Aggiungi -x per debug
bash -x export_database.sh
```

## 📋 Checklist Pre-Testing

- [ ] Database creato con `complete_database_setup.sql`
- [ ] Utenti di test creati (6 utenti)
- [ ] Ristoranti di test inseriti (5 ristoranti)
- [ ] Ordini di test creati (5 ordini)
- [ ] Tickets di test inseriti (4 tickets)
- [ ] Rider locations configurate (3 posizioni)
- [ ] Backend in esecuzione
- [ ] Collection Postman importata
- [ ] Variabili d'ambiente configurate

## 🚀 Prossimi Passi

1. **Testa tutti gli endpoint** con la collection Postman
2. **Verifica i permessi** per ruolo
3. **Testa il flusso completo** end-to-end
4. **Implementa test automatici** se necessario
5. **Configura CI/CD** per deploy automatico

## 📞 Supporto

Per problemi:
1. Controlla i log del backend
2. Verifica la connessione al database
3. Testa con un singolo endpoint alla volta
4. Usa il debug mode dello script export

---

**🎉 Buon testing!**
