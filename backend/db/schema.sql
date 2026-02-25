-- Idempotent schema script for PostgreSQL
-- Creates core tables if not exists and adds missing columns safely
-- Run with: psql $DATABASE_URL -f backend/db/schema.sql

BEGIN;

-- Users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255),
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'customer',
  phone VARCHAR(20),
  address TEXT,
  push_token TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Restaurants
CREATE TABLE IF NOT EXISTS restaurants (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  cuisine_type VARCHAR(100),
  address TEXT,
  phone VARCHAR(20),
  email VARCHAR(255),
  latitude NUMERIC(10,8),
  longitude NUMERIC(11,8),
  delivery_radius_km INTEGER DEFAULT 10,
  min_order_amount NUMERIC(10,2) DEFAULT 0,
  delivery_fee NUMERIC(10,2) DEFAULT 2.50,
  is_open BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Restaurant categories
CREATE TABLE IF NOT EXISTS restaurant_categories (
  id SERIAL PRIMARY KEY,
  restaurant_id INTEGER,
  name VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Menu items
CREATE TABLE IF NOT EXISTS menu_items (
  id SERIAL PRIMARY KEY,
  restaurant_id INTEGER,
  category_id INTEGER,
  name VARCHAR(255),
  description TEXT,
  price NUMERIC(10,2),
  category VARCHAR(100),
  image_url TEXT,
  is_available BOOLEAN DEFAULT true,
  preparation_time_minutes INTEGER DEFAULT 15,
  allergens TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  customer_id INTEGER,
  restaurant_id INTEGER,
  rider_id INTEGER,
  items JSONB,
  status VARCHAR(50) DEFAULT 'pending',
  total_amount NUMERIC(10,2),
  delivery_fee NUMERIC(10,2) DEFAULT 2.50,
  delivery_address TEXT,
  customer_phone VARCHAR(20),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order items
CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER,
  menu_item_id INTEGER,
  quantity INTEGER DEFAULT 1,
  unit_price NUMERIC(10,2),
  customizations TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments
CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  order_id INTEGER,
  payment_method VARCHAR(50),
  amount NUMERIC(10,2),
  status VARCHAR(50) DEFAULT 'pending',
  stripe_payment_id TEXT,
  collected_at TIMESTAMP,
  collected_by INTEGER,
  confirmed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tickets
CREATE TABLE IF NOT EXISTS tickets (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  type VARCHAR(50),
  title VARCHAR(255),
  description TEXT,
  status VARCHAR(50) DEFAULT 'open',
  priority VARCHAR(20) DEFAULT 'medium',
  order_id INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ticket comments
CREATE TABLE IF NOT EXISTS ticket_comments (
  id SERIAL PRIMARY KEY,
  ticket_id INTEGER,
  user_id INTEGER,
  comment TEXT,
  is_admin_comment BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  title VARCHAR(255),
  message TEXT,
  body TEXT,
  type VARCHAR(50) DEFAULT 'info',
  is_read BOOLEAN DEFAULT false,
  data JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Rider locations
CREATE TABLE IF NOT EXISTS rider_locations (
  id SERIAL PRIMARY KEY,
  order_id INTEGER,
  rider_id INTEGER,
  latitude NUMERIC(10,8),
  longitude NUMERIC(11,8),
  eta_minutes INTEGER,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews
CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  restaurant_id INTEGER,
  user_id INTEGER,
  food_rating INTEGER,
  delivery_rating INTEGER,
  comment TEXT,
  photos_urls TEXT[],
  is_verified BOOLEAN DEFAULT false,
  author_name VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Pharmacies and products
CREATE TABLE IF NOT EXISTS pharmacies (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255),
  password VARCHAR(255),
  name VARCHAR(255),
  phone VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  postal_code VARCHAR(20),
  license_number VARCHAR(100),
  lat NUMERIC(10,8),
  lon NUMERIC(11,8),
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  rating NUMERIC(3,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pharmacy_products (
  id SERIAL PRIMARY KEY,
  pharmacy_id INTEGER,
  name VARCHAR(255),
  description TEXT,
  category VARCHAR(100),
  price NUMERIC(10,2),
  stock_quantity INTEGER DEFAULT 0,
  image_url TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pharmacy orders (missing in earlier schema)
CREATE TABLE IF NOT EXISTS pharmacy_orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  pharmacy_id INTEGER,
  items JSONB,
  total_amount NUMERIC(10,2),
  delivery_address TEXT,
  delivery_lat NUMERIC(10,8),
  delivery_lon NUMERIC(11,8),
  status VARCHAR(50) DEFAULT 'pending',
  rider_id INTEGER,
  delivery_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Medical transports
CREATE TABLE IF NOT EXISTS medical_transports (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  rider_id INTEGER,
  doctor_name VARCHAR(255),
  clinic_name VARCHAR(255),
  clinic_address TEXT,
  clinic_phone VARCHAR(20),
  pickup_address TEXT,
  pickup_lat NUMERIC(10,8),
  pickup_lon NUMERIC(11,8),
  appointment_date DATE,
  appointment_time TIME,
  return_trip BOOLEAN DEFAULT false,
  special_requirements TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  notes TEXT,
  estimated_cost NUMERIC(10,2),
  actual_cost NUMERIC(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Document pickups
CREATE TABLE IF NOT EXISTS document_pickups (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  rider_id INTEGER,
  document_type VARCHAR(100),
  pickup_location TEXT,
  pickup_lat NUMERIC(10,8),
  pickup_lon NUMERIC(11,8),
  delivery_address TEXT,
  delivery_lat NUMERIC(10,8),
  delivery_lon NUMERIC(11,8),
  estimated_cost NUMERIC(10,2),
  description TEXT,
  signature_required BOOLEAN DEFAULT false,
  tracking_number VARCHAR(100),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Other auxiliary tables
CREATE TABLE IF NOT EXISTS bills (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  type VARCHAR(50),
  amount NUMERIC(10,2),
  due_date DATE,
  description TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bill_payments (
  id SERIAL PRIMARY KEY,
  bill_id INTEGER,
  user_id INTEGER,
  payment_method VARCHAR(50),
  amount NUMERIC(10,2),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notification_settings (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  setting_key VARCHAR(100),
  setting_value TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_tracks (
  id SERIAL PRIMARY KEY,
  order_id INTEGER,
  latitude NUMERIC(10,8),
  longitude NUMERIC(11,8),
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS api_logs (
  id SERIAL PRIMARY KEY,
  request_id TEXT,
  method VARCHAR(10),
  path TEXT,
  status_code INTEGER,
  response_time INTEGER,
  user_id INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Additive ALTERs for backward compatibility (add commonly referenced columns if missing)
-- This section ensures columns referenced by backend code exist even if table created earlier

-- Example: add delivery coordinates to orders if missing
ALTER TABLE orders ADD COLUMN IF NOT EXISTS delivery_latitude NUMERIC(10,8);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS delivery_longitude NUMERIC(11,8);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS rider_latitude NUMERIC(10,8);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS rider_longitude NUMERIC(11,8);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS eta_minutes INTEGER;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS received_at TIMESTAMP;

-- Notifications: legacy 'read' boolean sometimes used
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS read BOOLEAN;
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS read_at TIMESTAMP;

-- Pharmacy order delivery coordinates
ALTER TABLE pharmacy_orders ADD COLUMN IF NOT EXISTS delivery_lat NUMERIC(10,8);
ALTER TABLE pharmacy_orders ADD COLUMN IF NOT EXISTS delivery_lon NUMERIC(11,8);

-- Also add short/alternate coordinate column names used in code
ALTER TABLE orders ADD COLUMN IF NOT EXISTS delivery_lat NUMERIC(10,8);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS delivery_lon NUMERIC(11,8);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS delivery_cost NUMERIC(10,2);
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS delivery_cost NUMERIC(10,2);

ALTER TABLE pharmacy_orders ADD COLUMN IF NOT EXISTS delivery_latitude NUMERIC(10,8);
ALTER TABLE pharmacy_orders ADD COLUMN IF NOT EXISTS delivery_longitude NUMERIC(11,8);

ALTER TABLE document_pickups ADD COLUMN IF NOT EXISTS pickup_latitude NUMERIC(10,8);
ALTER TABLE document_pickups ADD COLUMN IF NOT EXISTS pickup_longitude NUMERIC(11,8);
ALTER TABLE document_pickups ADD COLUMN IF NOT EXISTS delivery_latitude NUMERIC(10,8);
ALTER TABLE document_pickups ADD COLUMN IF NOT EXISTS delivery_longitude NUMERIC(11,8);

ALTER TABLE medical_transports ADD COLUMN IF NOT EXISTS pickup_latitude NUMERIC(10,8);
ALTER TABLE medical_transports ADD COLUMN IF NOT EXISTS pickup_longitude NUMERIC(11,8);

COMMIT;
