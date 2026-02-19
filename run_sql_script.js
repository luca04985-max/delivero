const fs = require('fs');
const path = require('path');

// Leggi il file SQL
const sqlFile = path.join(__dirname, 'backend', 'simple_database_setup.sql');
const sql = fs.readFileSync(sqlFile, 'utf8');

// Stampa il SQL da copiare/incollare
console.log('=====================================');
console.log('CONTENUTO SQL DA ESEGUIRE:');
console.log('=====================================\n');
console.log(sql);
console.log('\n=====================================');
console.log('ISTRUZIONI:');
console.log('1. Copia tutto il contenuto sopra');
console.log('2. Incollalo nel tuo client SQL (pgAdmin, DBeaver, etc.)');
console.log('3. Esegui lo script');
console.log('=====================================');
