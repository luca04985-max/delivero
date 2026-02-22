import db from '../config/db.js';
import fs from 'fs';
import path from 'path';

async function runMigrations() {
  try {
    console.log('🔄 Running database migrations...');
    
    // Read migration files
    const migrationsDir = path.join(__dirname, 'migrations');
    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort();

    for (const file of migrationFiles) {
      const migrationPath = path.join(migrationsDir, file);
      console.log(`📄 Running migration: ${file}`);
      
      const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
      await db.query(migrationSQL.toString());
      
      console.log(`✅ Migration completed: ${file}`);
    }
    
    console.log('✅ All migrations completed successfully');
  } catch (error) {
    console.error('❌ Migration error:', error);
    process.exit(1);
  }
}

// Run migrations if this file is executed directly
if (require.main === module) {
  runMigrations();
}

export default runMigrations;
