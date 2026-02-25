## Titolo
Breve descrizione della modifica (max 72 caratteri)

## Descrizione
Spiega cosa cambia e perché. Includi i punti rilevanti per i reviewer.

## Cosa ho fatto
- Aggiunto: endpoint `/api/inventory` e `/api/dispatch` (controller + route)
- Aggiunto: UI frontend `InventoryManager` e integrazione in `ManagerDashboard`
- Aggiunto: Screen mobile `InventoryScreen` e navigazione per ruolo `restaurant`
- Aggiunto: seed demo (`backend/scripts/seed-demo-data.js`) e `backend/db/seed.sql`
- Aggiunto: metrics Prometheus e middleware (`/metrics`)

## Come testare localmente
1. Avviare DB Postgres e applicare schema: `psql $DATABASE_URL -f backend/db/schema.sql`
2. Eseguire lo seeder demo (genera utenti con password `123456`): `node backend/scripts/seed-demo-data.js`
3. Avviare backend: `cd backend && npm install && npm run dev`
4. Avviare frontend/mobile e verificare le nuove UI (ruolo `restaurant` per Inventory)

## Note tecniche e rischi
- Toggle disponibilità è protetto: richiede JWT e ruolo `restaurant|admin`.
- Dispatch è un prototipo: soluzione greedy/heuristic, da migliorare per produzione.
- Metrics richiedono `prom-client` installato sul backend.

## Checklist
- [ ] Schema DB applicato / seed eseguito
- [ ] Funzionalità testata manualmente (frontend + mobile)
- [ ] Nessuna informazione sensibile committata

<!-- Aggiungi eventuali note extra sotto -->
