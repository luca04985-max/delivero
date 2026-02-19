-- ========================================
-- DELIVERO DATABASE COMPLETE SETUP - CLEAN VERSION
-- ========================================

-- Pulisci database (usa con cautela!)
-- DROP SCHEMA public CASCADE;
-- CREATE SCHEMA public;

-- ========================================
-- EXTENSIONS
-- ========================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ========================================
-- USERS TABLE (PRIMA - TABELLA FONDAMENTALE)
-- ========================================
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'customer' CHECK (role IN ('customer', 'rider', 'manager', 'admin')),
    phone VARCHAR(20),
    address TEXT,
    push_token TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- RESTAURANTS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS restaurants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    cuisine_type VARCHAR(100),
    address TEXT NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    delivery_radius_km INTEGER DEFAULT 10,
    min_order_amount DECIMAL(10, 2) DEFAULT 0,
    delivery_fee DECIMAL(10, 2) DEFAULT 2.50,
    rating DECIMAL(3, 2) DEFAULT 0,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- RESTAURANT CATEGORIES TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS restaurant_categories (
    id SERIAL PRIMARY KEY,
    restaurant_id INTEGER NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- MENU ITEMS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS menu_items (
    id SERIAL PRIMARY KEY,
    restaurant_id INTEGER NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
    category_id INTEGER NOT NULL REFERENCES restaurant_categories(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100),
    image_url TEXT,
    is_available BOOLEAN DEFAULT true,
    preparation_time_minutes INTEGER DEFAULT 15,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- ORDERS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE SET NULL,
    rider_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'preparing', 'ready', 'delivering', 'delivered', 'cancelled')),
    total_amount DECIMAL(10, 2) NOT NULL,
    delivery_fee DECIMAL(10, 2) DEFAULT 2.50,
    delivery_address TEXT NOT NULL,
    customer_phone VARCHAR(20),
    notes TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    rating_comment TEXT,
    estimated_delivery_time TIMESTAMP,
    actual_delivery_time TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- ORDER ITEMS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    menu_item_id INTEGER REFERENCES menu_items(id) ON DELETE SET NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10, 2) NOT NULL,
    customizations TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- PAYMENTS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE SET NULL,
    payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN ('cash', 'stripe', 'paypal')),
    amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'refunded')),
    stripe_payment_intent_id TEXT,
    collected_at TIMESTAMP,
    collected_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    confirmed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- TICKETS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS tickets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('support', 'technical', 'payment', 'delivery', 'other')),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    attachment_urls TEXT[],
    admin_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- TICKET COMMENTS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS ticket_comments (
    id SERIAL PRIMARY KEY,
    ticket_id INTEGER REFERENCES tickets(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    comment TEXT NOT NULL,
    is_admin_comment BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- RIDER LOCATIONS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS rider_locations (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    rider_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    eta_minutes INTEGER,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(order_id)
);

-- ========================================
-- NOTIFICATIONS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'info' CHECK (type IN ('info', 'order', 'payment', 'system')),
    is_read BOOLEAN DEFAULT false,
    data JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- INDEXES
-- ========================================
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_restaurants_active ON restaurants(is_active);
CREATE INDEX IF NOT EXISTS idx_restaurant_categories_restaurant ON restaurant_categories(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_restaurant_categories_active ON restaurant_categories(is_active);
CREATE INDEX IF NOT EXISTS idx_menu_items_restaurant ON menu_items(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items(category_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_restaurant ON orders(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_orders_rider ON orders(rider_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_payments_order ON payments(order_id);
CREATE INDEX IF NOT EXISTS idx_tickets_user ON tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status);
CREATE INDEX IF NOT EXISTS idx_ticket_comments_ticket ON ticket_comments(ticket_id);
CREATE INDEX IF NOT EXISTS idx_rider_locations_order ON rider_locations(order_id);
CREATE INDEX IF NOT EXISTS idx_rider_locations_rider ON rider_locations(rider_id);
CREATE INDEX IF NOT EXISTS idx_rider_locations_timestamp ON rider_locations(timestamp);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(is_read);

-- ========================================
-- TRIGGERS
-- ========================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_restaurants_updated_at BEFORE UPDATE ON restaurants FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_menu_items_updated_at BEFORE UPDATE ON menu_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tickets_updated_at BEFORE UPDATE ON tickets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- TEST DATA
-- ========================================

-- Users (password: 123456 per tutti)
INSERT INTO users (email, password, name, role, phone, address) VALUES
('demo.customer@delivero.local', '$2b$10$rQZ8ZkQGQmQJQJQJQJQu12345678901234567890123456789012345678901', 'Mario Rossi', 'customer', '+39 333 1234567', 'Via Roma 123, 00100 Roma'),
('demo.customer2@delivero.local', '$2b$10$rQZ8ZkQGQmQJQJQJQJQu12345678901234567890123456789012345678901', 'Laura Bianchi', 'customer', '+39 333 2345678', 'Via Milano 456, 00100 Roma'),
('demo.rider@delivero.local', '$2b$10$rQZ8ZkQGQmQJQJQJQJQu12345678901234567890123456789012345678901', 'Paolo Verdi', 'rider', '+39 333 3456789', 'Via Torino 789, 00100 Roma'),
('demo.rider2@delivero.local', '$2b$10$rQZ8ZkQGQmQJQJQJQJQu12345678901234567890123456789012345678901', 'Giulia Neri', 'rider', '+39 333 4567890', 'Via Napoli 321, 00100 Roma'),
('demo.manager@delivero.local', '$2b$10$rQZ8ZkQGQmQJQJQJQJQu12345678901234567890123456789012345678901', 'Admin User', 'manager', '+39 333 5678901', 'Via Firenze 654, 00100 Roma'),
('admin@delivero.local', '$2b$10$rQZ8ZkQGQmQJQJQJQJQu12345678901234567890123456789012345678901', 'Super Admin', 'admin', '+39 333 6789012', 'Via Venezia 987, 00100 Roma')
ON CONFLICT (email) DO NOTHING;

-- Restaurants
INSERT INTO restaurants (name, description, cuisine_type, address, phone, email, latitude, longitude, rating) VALUES
('Pizzeria Da Mario', 'Autentica pizza napoletana con ingredienti freschi', 'Italiana', 'Via Roma 123, Roma', '+39 06 1234567', 'info@pizzeriamario.it', 41.9028, 12.4964, 4.5),
('Sushi Express', 'Sushi giapponese fresco e delivery veloce', 'Giapponese', 'Via Milano 456, Roma', '+39 06 2345678', 'info@sushiexpress.it', 41.8985, 12.5114, 4.3),
('Burger House', 'Hamburger artigianali e patatine fritte', 'Americana', 'Via Torino 789, Roma', '+39 06 3456789', 'info@burgerhouse.it', 41.9125, 12.5133, 4.2),
('Trattoria Nonna', 'Cucina tradizionale romana', 'Italiana', 'Via Napoli 321, Roma', '+39 06 4567890', 'info@trattorianonna.it', 41.8850, 12.5322, 4.6),
('Kebab Palace', 'Kebab turco e specialità mediorientali', 'Turca', 'Via Firenze 654, Roma', '+39 06 5678901', 'info@kebabpalace.it', 41.9200, 12.5025, 4.0)
ON CONFLICT DO NOTHING;

-- Menu Items (per Pizzeria Da Mario - id: 1)
INSERT INTO menu_items (restaurant_id, name, description, price, category, preparation_time_minutes) VALUES
(1, 'Margherita', 'Pomodoro, mozzarella, basilico', 8.50, 'Pizze Classiche', 15),
(1, 'Diavola', 'Pomodoro, mozzarella, salamino piccante', 10.00, 'Pizze Classiche', 18),
(1, 'Quattro Stagioni', 'Pomodoro, mozzarella, funghi, prosciutto, carciofi', 12.00, 'Pizze Speciali', 20),
(1, 'Bufalina', 'Pomodoro, mozzarella di bufala, basilico', 11.00, 'Pizze Speciali', 16),
(1, 'Coca Cola 33cl', 'Bevanda rinfrescante', 2.50, 'Bevande', 2),
(1, 'Acqua Naturale 50cl', 'Acqua minerale naturale', 1.50, 'Bevande', 1),
(1, 'Tiramisù', 'Dolce tradizionale al caffè', 5.00, 'Dolci', 5),
(1, 'Panna Cotta', 'Dolce con crema di latte', 4.50, 'Dolci', 5)
ON CONFLICT DO NOTHING;

-- Menu Items (per Sushi Express - id: 2)
INSERT INTO menu_items (restaurant_id, name, description, price, category, preparation_time_minutes) VALUES
(2, 'Uramaki California', 'Avocado, surimi, cetriolo', 8.00, 'Uramaki', 10),
(2, 'Nigiri Salmone', 'Salmone fresco su riso venere', 4.50, 'Nigiri', 8),
(2, 'Sashimi Mix', 'Assortimento di pesce crudo', 12.00, 'Sashimi', 5),
(2, 'Tempura Gamberi', 'Gamberi fritti con tempura', 9.00, 'Tempura', 15),
(2, 'Miso Soup', 'Zuppa tradizionale giapponese', 3.50, 'Zuppe', 5),
(2, 'Green Tea', 'Tè verde giapponese', 2.00, 'Bevande', 2)
ON CONFLICT DO NOTHING;

-- Menu Items (per Burger House - id: 3)
INSERT INTO menu_items (restaurant_id, name, description, price, category, preparation_time_minutes) VALUES
(3, 'Classic Burger', 'Hamburger con lattuga, pomodoro, cipolla', 7.50, 'Hamburger', 12),
(3, 'Cheese Burger', 'Hamburger con cheddar', 8.00, 'Hamburger', 12),
(3, 'BBQ Burger', 'Hamburger con salsa BBQ e bacon', 9.50, 'Hamburger Speciali', 15),
(3, 'Veggie Burger', 'Hamburger vegetale', 7.00, 'Vegetariano', 10),
(3, 'Patatine Fritte', 'Patatine croccanti', 3.00, 'Contorni', 8),
(4, 'Cacio e Pepe', 'Pasta con pecorino e pepe', 9.00, 'Primi', 15),
(4, 'Amatriciana', 'Pasta con guanciale e pomodoro', 10.00, 'Primi', 18),
(4, 'Saltimbocca', 'Vitello con prosciutto e salvia', 12.00, 'Secondi', 20),
(4, 'Carciofi alla Giudia', 'Carciofi fritti', 8.00, 'Contorni', 15)
ON CONFLICT DO NOTHING;

-- Orders
INSERT INTO orders (customer_id, restaurant_id, total_amount, delivery_address, status, estimated_delivery_time) VALUES
(1, 1, 25.50, 'Via Roma 123, Roma', 'delivered', CURRENT_TIMESTAMP + INTERVAL '45 minutes'),
(2, 2, 35.00, 'Via Milano 456, Roma', 'delivering', CURRENT_TIMESTAMP + INTERVAL '30 minutes'),
(1, 3, 18.50, 'Via Roma 123, Roma', 'preparing', CURRENT_TIMESTAMP + INTERVAL '25 minutes'),
(2, 1, 15.00, 'Via Milano 456, Roma', 'accepted', CURRENT_TIMESTAMP + INTERVAL '40 minutes'),
(3, 2, 42.00, 'Via Torino 789, Roma', 'pending', CURRENT_TIMESTAMP + INTERVAL '50 minutes')
ON CONFLICT DO NOTHING;

-- Order Items
INSERT INTO order_items (order_id, menu_item_id, quantity, unit_price) VALUES
(1, 1, 1, 8.50),
(1, 5, 1, 2.50),
(1, 7, 1, 5.00),
(2, 9, 2, 8.00),
(2, 10, 1, 4.50),
(2, 12, 1, 3.50),
(3, 13, 1, 7.50),
(3, 17, 1, 3.00),
(4, 2, 1, 10.00),
(4, 6, 2, 1.50)
ON CONFLICT DO NOTHING;

-- Payments
INSERT INTO payments (order_id, payment_method, amount, status) VALUES
(1, 'cash', 25.50, 'completed'),
(2, 'stripe', 35.00, 'completed'),
(3, 'stripe', 18.50, 'processing'),
(4, 'cash', 15.00, 'pending')
ON CONFLICT DO NOTHING;

-- Tickets
INSERT INTO tickets (user_id, type, title, description, status, priority) VALUES
(1, 'support', 'Ordine in ritardo', 'Il mio ordine #1 è in ritardo di 30 minuti', 'resolved', 'medium'),
(2, 'technical', 'App crash', 'L''app si chiude quando apro il menu', 'in_progress', 'high'),
(3, 'payment', 'Pagamento non andato a buon fine', 'Ho pagato con Stripe ma l''ordine è ancora pending', 'open', 'high'),
(4, 'delivery', 'Consegna sbagliata', 'Mi hanno consegnato l''ordine di un altro cliente', 'open', 'urgent')
ON CONFLICT DO NOTHING;

-- Ticket Comments
INSERT INTO ticket_comments (ticket_id, user_id, comment, is_admin_comment) VALUES
(1, 1, 'Ordine ricevuto correttamente, grazie!', false),
(1, 5, 'Ci scusiamo per il ritardo, abbiamo verificato e risolto il problema.', true),
(2, 2, 'L''app crasha ogni volta che provo a ordinare', false),
(2, 5, 'Stiamo investigando il problema, proviamo a risolvere nella prossima release.', true),
(3, 3, 'Ho ricevuto l''addebito sulla carta ma l''ordine è ancora pending', false)
ON CONFLICT DO NOTHING;

-- Rider Locations
INSERT INTO rider_locations (order_id, rider_id, latitude, longitude, eta_minutes) VALUES
(2, 3, 41.8985, 12.5114, 10),
(3, 3, 41.9028, 12.4964, 15),
(5, 4, 41.8850, 12.5322, 20)
ON CONFLICT DO NOTHING;

-- Notifications
INSERT INTO notifications (user_id, title, message, type, is_read) VALUES
(1, 'Ordine Consegnato', 'Il tuo ordine #1 è stato consegnato', 'order', true),
(2, 'Ordine in preparazione', 'Il tuo ordine #2 è in preparazione', 'order', false),
(3, 'Rider in arrivo', 'Il rider è a 15 minuti dalla tua posizione', 'order', false),
(4, 'Ordine accettato', 'Il tuo ordine #4 è stato accettato', 'order', false),
(5, 'Nuovo ordine disponibile', 'C''è un nuovo ordine nella tua zona', 'order', false)
ON CONFLICT DO NOTHING;

-- ========================================
-- FINAL VERIFICATION
-- ========================================
DO $$
DECLARE
    table_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO table_count 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_type = 'BASE TABLE';
    
    RAISE NOTICE 'Database setup completed! % tables created.', table_count;
    RAISE NOTICE 'Test data inserted successfully.';
    RAISE NOTICE 'Ready for API testing!';
END $$;

-- Show table list
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE'
ORDER BY table_name;
