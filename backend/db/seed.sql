-- Idempotent seed SQL using INSERT ... ON CONFLICT for demo data
-- Run with: psql $DATABASE_URL -f backend/db/seed.sql

BEGIN;

-- Demo users
INSERT INTO users (email, password, name, role, phone, address, is_active)
VALUES
  ('demo.customer@delivero.local', 'REPLACE_WITH_HASH', 'Demo Customer', 'customer', '+39 06 123456', 'Via Demo Customer 1, Roma', true),
  ('demo.rider@delivero.local', 'REPLACE_WITH_HASH', 'Demo Rider', 'rider', '+39 06 789012', 'Via Demo Rider 1, Roma', true),
  ('demo.manager@delivero.local', 'REPLACE_WITH_HASH', 'Demo Manager', 'manager', '+39 06 345678', 'Via Demo Manager 1, Roma', true)
ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  phone = EXCLUDED.phone,
  address = EXCLUDED.address,
  is_active = EXCLUDED.is_active;

-- Demo restaurants
INSERT INTO restaurants (name, description, cuisine_type, address, phone, email, rating, latitude, longitude, is_open, is_active, delivery_radius_km, min_order_amount, delivery_fee, estimated_delivery_time, delivery_cost)
VALUES
  ('Demo Pizza Roma Est', 'Demo restaurant seeded nearby', 'Pizza', 'Via Demo 1, Roma', '+39 06 123456', 'demo@delivero.local', 4.7, 41.8800, 12.6760, true, true, 10, 5.0, 2.5, 30, 2.0),
  ('Demo Sushi Roma Est', 'Demo restaurant seeded nearby', 'Japanese', 'Via Demo 2, Roma', '+39 06 123456', 'demo@delivero.local', 4.6, 41.8805, 12.6765, true, true, 10, 5.0, 2.5, 30, 2.0)
ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  cuisine_type = EXCLUDED.cuisine_type,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  email = EXCLUDED.email,
  rating = EXCLUDED.rating,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  is_open = EXCLUDED.is_open,
  is_active = EXCLUDED.is_active;

-- Minimal example: menu items
-- Note: category_ids should be set according to restaurant_categories entries. For a quick demo we'll upsert by name.
INSERT INTO menu_items (restaurant_id, name, description, price, category, is_available, preparation_time_minutes)
SELECT r.id, m.name, m.description, m.price, m.category, true, m.prep FROM (VALUES
  ('Demo Pizza Roma Est','Pizza Margherita','Pizza classica con pomodoro, mozzarella e basilico',8.5,'Pizze',15),
  ('Demo Pizza Roma Est','Pizza Diavola','Pizza picante con salamino piccante',10.0,'Pizze',20),
  ('Demo Pizza Roma Est','Acqua Naturale','Acqua naturale 1.5L',1.5,'Bevande',1),
  ('Demo Sushi Roma Est','Sushi Mix','Assortimento di sushi e sashimi',15.0,'Sushi',25),
  ('Demo Sushi Roma Est','Tè Verde','Tè verde giapponese',2.0,'Bevande',2)
) AS m(restaurant_name, name, description, price, category, prep)
JOIN restaurants r ON r.name = m.restaurant_name
ON CONFLICT (restaurant_id, name) DO UPDATE SET
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  category = EXCLUDED.category,
  is_available = EXCLUDED.is_available,
  preparation_time_minutes = EXCLUDED.preparation_time_minutes;

COMMIT;

-- IMPORTANT: passwords above are placeholders. Prefer using the JS seeder for hashed passwords or replace with real hashes.
