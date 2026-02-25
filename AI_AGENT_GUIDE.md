# Istruzioni essenziali per un agente IA che lavora su Delivero

File sintetico: cosa sapere e come agire quando lavori autonomamente su questo repository.

- **Contesto progetto**: Delivero è una piattaforma multi-servizio (mobile React Native Expo, backend Node.js/Express, frontend React). DB target: PostgreSQL (config in `backend/src/config/db.js`).

- **Obiettivo principale dell'agente**: effettuare modifiche locali richieste dall'utente, applicare patch, fornire istruzioni di esecuzione, generare script idempotenti per DB e aggiornare documentazione. Non pushare né creare commit remoti senza esplicita autorizzazione.

- **Struttura rilevante**:
  - `mobile/` — app React Native (ESLint applicato, hooks, WebView per mappe).
  - `backend/` — API Node.js, script SQL/JS in `backend/scripts/` e `backend/db/`.
  - `frontend/` — dashboard admin (React).

- **Script DB disponibili**:
  - `backend/scripts/ensure-db-schema.js` — verifica/aggiunge colonne; supporta `--dry-run` (stampa SQL) e rispetta env `DRY_RUN=1`.
  - `backend/scripts/seed-demo-data.js` — seeder JS (usa bcrypt), supporta `--dry-run`.
  - `backend/scripts/run-db-scripts.js` — wrapper che inoltra `--dry-run` o `--force` ai due script.
  - `backend/db/schema.sql` e `backend/db/seed.sql` — versioni SQL idempotenti generate per `psql`.

- **Comandi utili** (esegui dalla root):
  - ESLint autofix mobile: `npx eslint "mobile/**/*.{js,jsx}" --fix`
  - Dry-run scripts DB: `node backend/scripts/run-db-scripts.js` (default dry-run)
  - Eseguire script DB (dopo backup): `node backend/scripts/run-db-scripts.js --force`
  - Applicare SQL direttamente: `psql "$DATABASE_URL" -f backend/db/schema.sql`

- **Regole di sicurezza / politiche**:
  - Non eseguire modifiche destructive in produzione senza backup e approvazione.
  - Preferire prima la modalità `--dry-run` per ispezionare le SQL generate.
  - Non creare commit/push senza permesso dell'utente.

- **Linee guida sul codice**:
  - Mantieni lo stile esistente (ESM in `backend` — `type: module`).
  - Evita refactor globali non richiesti; applica fix mirati e testabili.
  - Per modifiche JS che toccano DB: preferisci usare script JS solo per operazioni che richiedono hashing o logica complessa (es. `seed-demo-data.js` per password bcrypt). Per operazioni massicce preferisci file SQL idempotenti.

- **Testing e validazione**:
  - Esegui ESLint e correzioni automatiche prima di grandi modifiche.
  - Quando aggiungi script SQL, esegui prima un dry-run con il wrapper, poi applica su db di sviluppo usando `psql`.
  - Per seed di password, usa lo script JS per generare hash; non inserire password in chiaro nello `seed.sql`.

- **Logging e rumore**:
  - Riduci log eccessivi; mantieni solo log informativi e errori critici.
  - Se modifichi script di avvio o worker, assicurati che i log importanti (startup, errore di connessione DB, migrazioni) rimangano.

- **Comunicazione con l'utente**:
  - Prima di eseguire cambiamenti sul DB chiedi conferma esplicita per produzione.
  - Fornisci sempre comandi esatti per riprodurre ciò che hai fatto (copy-pasteable).

- **Quando creare file nuovi**:
  - Metti nuovi script sotto `backend/scripts/` o `backend/db/` a seconda che siano JS eseguibili o SQL.
  - Aggiorna `README.md` (EN e IT) con istruzioni chiare per l'esecuzione degli script.

- **Blocchi e fallback**:
  - Se i test o la connessione DB falliscono (es. ECONNREFUSED), segnala chiaramente il problema e suggerisci passi (verificare `DATABASE_URL`, avviare Postgres, usare container Docker).

- **Casi d'uso tipici**:
  1. Aggiungere colonne mancanti in modo idempotente → aggiornare `ensure-db-schema.js` e/o `backend/db/schema.sql`; testare con dry-run.
  2. Creare seed demo idempotente → preferire `seed-demo-data.js` per password hashed; generare `seed.sql` solo per dati non sensibili.
  3. Pulire rumore di log e fix lint → eseguire ESLint, applicare fix mirati.

Segui queste regole e, prima di ogni azione distruttiva, richiedi conferma. Buon lavoro!