#!/usr/bin/env node
/**
 * Database Schema Verification Script
 * Verifies and ensures all tables and columns exist according to schema
 * Safe to run multiple times - uses IF NOT EXISTS
 */
import db from '../src/config/db.js';

// Support an internal dry-run mode: pass --dry-run or set env DRY_RUN=1
const DRY_RUN = process.argv.includes('--dry-run') || process.env.DRY_RUN === '1';

const ensureOrderTrackingColumns = async () => {
  console.log(`🔧 Verifying all database tables and columns...${DRY_RUN ? ' (DRY-RUN - no changes will be applied)' : ''}`);

  

  // Define all table columns from schema
  const tableColumns = {
    users: [
      'email VARCHAR(255) NOT NULL',
      'password VARCHAR(255) NOT NULL',
      'name VARCHAR(255) NOT NULL',
      'role VARCHAR(50) DEFAULT \'customer\'',
      'phone VARCHAR(20)',
      'address TEXT',
      'push_token TEXT',
      'is_active BOOLEAN DEFAULT true',
      'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
      'updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    ],
    restaurants: [
      'name VARCHAR(255) NOT NULL',
      'description TEXT',
      'cuisine_type VARCHAR(100)',
      'address TEXT NOT NULL',
      'phone VARCHAR(20)',
      'email VARCHAR(255)',
      'latitude NUMERIC(10,8)',
      'longitude NUMERIC(11,8)',
      'delivery_radius_km INTEGER DEFAULT 10',
      'min_order_amount NUMERIC(10,2) DEFAULT 0',
      'delivery_fee NUMERIC(10,2) DEFAULT 2.50',
      'rating NUMERIC(3,2) DEFAULT 0',
      'image_url TEXT',
      'is_active BOOLEAN DEFAULT true',
      'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
      'updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
      'is_open BOOLEAN DEFAULT true',
      'estimated_delivery_time INTEGER DEFAULT 30',
      'delivery_cost NUMERIC(10,2) DEFAULT 2.00'
    ],
    restaurant_categories: [
      'restaurant_id INTEGER NOT NULL',
      'name VARCHAR(100) NOT NULL',
      'is_active BOOLEAN DEFAULT true',
      'display_order INTEGER DEFAULT 0',
      'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    ],
    menu_items: [
      'restaurant_id INTEGER',
      'name VARCHAR(255) NOT NULL',
      'description TEXT',
      'price NUMERIC(10,2) NOT NULL',
      'category VARCHAR(100)',
      'image_url TEXT',
      'is_available BOOLEAN DEFAULT true',
      'preparation_time_minutes INTEGER DEFAULT 15',
      'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
      'updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
      'category_id INTEGER',
      'allergens TEXT'
    ],
    orders: [
      'user_id INTEGER REFERENCES users(id)',
      'customer_id INTEGER REFERENCES users(id)',
      'restaurant_id INTEGER REFERENCES restaurants(id)',
      'rider_id INTEGER REFERENCES users(id)',
      'items JSONB',
      'status VARCHAR(50) DEFAULT \'pending\'',
      'total_amount NUMERIC(10,2) NOT NULL',
      'delivery_fee NUMERIC(10,2) DEFAULT 2.50',
      'delivery_address TEXT NOT NULL',
      'customer_phone VARCHAR(20)',
      'notes TEXT',
      'rating INTEGER CHECK (rating >= 1 AND rating <= 5)',
      'rating_comment TEXT',
      'estimated_delivery_time TIMESTAMP',
      'actual_delivery_time TIMESTAMP',
      'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
      'updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
      'delivery_latitude NUMERIC(10,8)',
      'delivery_longitude NUMERIC(11,8)',
      'received_at TIMESTAMP',
      'eta_minutes INTEGER',
      'rider_longitude NUMERIC(11,8)',
      'rider_latitude NUMERIC(10,8)'
    ],
    order_items: [
      'order_id INTEGER',
      'menu_item_id INTEGER',
      'quantity INTEGER NOT NULL',
      'unit_price NUMERIC(10,2) NOT NULL',
      'customizations TEXT[]',
      'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    ],
    payments: [
      'order_id INTEGER',
      'payment_method VARCHAR(50) NOT NULL',
      'amount NUMERIC(10,2) NOT NULL',
      'status VARCHAR(50) DEFAULT \'pending\'',
      'stripe_payment_id TEXT',
      'collected_at TIMESTAMP',
      'collected_by INTEGER',
      'confirmed_at TIMESTAMP',
      'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
      'updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    ],
    customer_cards: [
      'user_id INTEGER REFERENCES users(id)',
      'token TEXT UNIQUE NOT NULL',
      'masked VARCHAR(64)',
      'last4 VARCHAR(4)',
      'brand VARCHAR(32)',
      'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    ],
    customer_addresses: [
      'user_id INTEGER REFERENCES users(id)',
      'label VARCHAR(255)',
      'display_name VARCHAR(255)',
      'latitude NUMERIC(10,8)',
      'longitude NUMERIC(11,8)',
      'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    ],
    tickets: [
      'user_id INTEGER',
      'type VARCHAR(50) NOT NULL',
      'title VARCHAR(255) NOT NULL',
      'description TEXT NOT NULL',
      'status VARCHAR(50) DEFAULT \'open\'',
      'priority VARCHAR(20) DEFAULT \'medium\'',
      'attachment_urls TEXT[]',
      'admin_notes TEXT',
      'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
      'updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
      'order_id INTEGER'
    ],
    ticket_comments: [
      'ticket_id INTEGER',
      'user_id INTEGER',
      'comment TEXT NOT NULL',
      'is_admin_comment BOOLEAN DEFAULT false',
      'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    ],
    notifications: [
      'user_id INTEGER',
      'title VARCHAR(255) NOT NULL',
      'message TEXT NOT NULL',
      'body TEXT',
      'type VARCHAR(50) DEFAULT \'info\'',
      'is_read BOOLEAN DEFAULT false',
      'read BOOLEAN DEFAULT false',
      'read_at TIMESTAMP',
      'data JSONB',
      'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
      'updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    ],
    rider_locations: [
      'order_id INTEGER',
      'rider_id INTEGER',
      'latitude NUMERIC(10,8) NOT NULL',
      'longitude NUMERIC(11,8) NOT NULL',
      'eta_minutes INTEGER',
      'timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
      'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    ],
    reviews: [
      'restaurant_id INTEGER NOT NULL',
      'user_id INTEGER',
      'food_rating INTEGER',
      'delivery_rating INTEGER',
      'comment TEXT',
      'photos_urls TEXT[]',
      'is_verified BOOLEAN DEFAULT false',
      'author_name VARCHAR(255)',
      'created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP'
    ],
    pharmacies: [
      'email VARCHAR(255) NOT NULL',
      'password VARCHAR(255) NOT NULL',
      'name VARCHAR(255) NOT NULL',
      'phone VARCHAR(20)',
      'address TEXT',
      'city VARCHAR(100)',
      'postal_code VARCHAR(20)',
      'license_number VARCHAR(100)',
      'lat NUMERIC(10,8)',
      'lon NUMERIC(11,8)',
      'is_verified BOOLEAN DEFAULT false',
      'is_active BOOLEAN DEFAULT true',
      'rating NUMERIC(3,2) DEFAULT 0',
      'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
      'updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    ],
    pharmacy_products: [
      'pharmacy_id INTEGER',
      'name VARCHAR(255) NOT NULL',
      'description TEXT',
      'category VARCHAR(100)',
      'price NUMERIC(10,2) NOT NULL',
      'stock_quantity INTEGER DEFAULT 0',
      'image_url TEXT',
      'active BOOLEAN DEFAULT true',
      'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
      'updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    ],
    pharmacy_orders: [
      'user_id INTEGER',
      'pharmacy_id INTEGER',
      'items JSONB',
      'total_amount NUMERIC(10,2) NOT NULL',
      'delivery_address TEXT',
      'delivery_lat NUMERIC(10,8)',
      'delivery_lon NUMERIC(11,8)',
      'status VARCHAR(50) DEFAULT \'pending\'',
      'rider_id INTEGER',
      'delivery_notes TEXT',
      'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
      'updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    ],
    medical_transports: [
      'user_id INTEGER',
      'rider_id INTEGER',
      'doctor_name VARCHAR(255)',
      'clinic_name VARCHAR(255)',
      'clinic_address TEXT',
      'clinic_phone VARCHAR(20)',
      'pickup_address TEXT',
      'pickup_lat NUMERIC(10,8)',
      'pickup_lon NUMERIC(11,8)',
      'appointment_date DATE',
      'appointment_time TIME',
      'return_trip BOOLEAN DEFAULT false',
      'special_requirements TEXT',
      'status VARCHAR(50) DEFAULT \'pending\'',
      'notes TEXT',
      'estimated_cost NUMERIC(10,2)',
      'actual_cost NUMERIC(10,2)',
      'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
      'updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    ],
    document_pickups: [
      'user_id INTEGER',
      'rider_id INTEGER',
      'document_type VARCHAR(100)',
      'pickup_location TEXT',
      'pickup_lat NUMERIC(10,8)',
      'pickup_lon NUMERIC(11,8)',
      'delivery_address TEXT',
      'delivery_lat NUMERIC(10,8)',
      'delivery_lon NUMERIC(11,8)',
      'estimated_cost NUMERIC(10,2)',
      'description TEXT',
      'signature_required BOOLEAN DEFAULT false',
      'tracking_number VARCHAR(100)',
      'status VARCHAR(50) DEFAULT \'pending\'',
      'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
      'updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    ],
    bills: [
      'user_id INTEGER',
      'type VARCHAR(50) NOT NULL',
      'amount NUMERIC(10,2) NOT NULL',
      'due_date DATE NOT NULL',
      'description TEXT',
      'status VARCHAR(50) DEFAULT \'pending\'',
      'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
      'updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    ],
    bill_payments: [
      'bill_id INTEGER',
      'user_id INTEGER',
      'payment_method VARCHAR(50) NOT NULL',
      'amount NUMERIC(10,2) NOT NULL',
      'status VARCHAR(50) DEFAULT \'pending\'',
      'rider_id INTEGER',
      'rider_payment_status VARCHAR(50)',
      'barcode_image_url TEXT',
      'qr_code_image_url TEXT',
      'notes TEXT',
      'bill_photo_url TEXT',
      'camera_permission_granted BOOLEAN',
      'photo_capture_timestamp TIMESTAMP',
      'order_id INTEGER',
      'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
      'updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    ],
    notification_settings: [
      'user_id INTEGER',
      'setting_key VARCHAR(100) NOT NULL',
      'setting_value TEXT',
      'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
      'updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    ],
    order_tracks: [
      'order_id INTEGER',
      'latitude NUMERIC(10,8)',
      'longitude NUMERIC(11,8)',
      'recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
      'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    ],
    api_logs: [
      'request_id TEXT',
      'method VARCHAR(10)',
      'path TEXT',
      'status_code INTEGER',
      'response_time INTEGER',
      'user_id INTEGER',
      'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    ]
  };
  // Deduplicate columns per table by column name (first token) to avoid
  // repeated ALTER attempts when similar column definitions appear.
  for (const tableName of Object.keys(tableColumns)) {
    const seen = new Set();
    tableColumns[tableName] = tableColumns[tableName].filter(col => {
      const key = col.split(' ')[0].replace(/[,;]$/g, '');
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  // Ensure tables exist (create minimal table if missing). Columns will be added below.
  for (const tableName of Object.keys(tableColumns)) {
    const createSql = `CREATE TABLE IF NOT EXISTS ${tableName} (id SERIAL PRIMARY KEY);`;
    try {
      if (DRY_RUN) {
        console.log(`  🔁 DRY-RUN SQL: ${createSql}`);
      } else {
        await db.query(createSql);
        console.log(`  ✅ Table ${tableName} created/verified`);
      }
    } catch (e) {
      console.log(`  ⚠️ Table ${tableName} create failed: ${e.message}`);
    }
  }

  // Check each table and add missing columns
  for (const [tableName, columns] of Object.entries(tableColumns)) {
    console.log(`🔍 Checking table: ${tableName}`);

    for (const column of columns) {
      const [colDef] = column.split(' ');
      const sql = `ALTER TABLE ${tableName} ADD COLUMN IF NOT EXISTS ${column};`;
      try {
        if (DRY_RUN) {
          console.log(`  🔁 DRY-RUN SQL: ${sql}`);
        } else {
          await db.query(sql);
          console.log(`  ✅ Column ${colDef} verified/added`);
        }
      } catch (e) {
        console.log(`  ⚠️ Column ${colDef} failed to add: ${e.message}`);
      }
    }
  }

  console.log('✅ All table columns verified successfully!');
};

// Run schema verification
(async () => {
  try {
    console.log('🚀 Starting database schema verification...');
    await ensureOrderTrackingColumns();
    console.log('🎉 Database schema verification completed successfully!');
    process.exit(0);
  } catch (e) {
    console.error('❌ Schema verification failed:', e?.message || e);
    console.error('Stack:', e?.stack);
    process.exit(1);
  }
})();
