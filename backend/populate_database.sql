-- ========================================
-- DELIVERO DATABASE POPULATION SCRIPT
-- ========================================
-- Script per popolare le 10 tabelle del database Delivero
-- con dati realistici per testare l'applicazione

-- ========================================
-- 1. USERS TABLE
-- ========================================
INSERT INTO users (email, password, name, role, phone, address) VALUES
('demo.customer@delivero.local', '$2b$10$rQZ8ZkQGQmQJQJQJQJQu12345678901234567890123456789012345678901', 'Mario Rossi', 'customer', '+39 333 1234567', 'Via Roma 123, 00100 Roma'),
('demo.rider@delivero.local', '$2b$10$rQZ8ZkQGQmQJQJQJQJQu12345678901234567890123456789012345678901', 'Paolo Verdi', 'rider', '+39 333 3456789', 'Via Torino 789, 00100 Roma'),
('demo.manager@delivero.local', '$2b$10$rQZ8ZkQGQmQJQJQJQJQu12345678901234567890123456789012345678901', 'Admin User', 'manager', '+39 333 5678901', 'Via Firenze 654, 00100 Roma');

-- ========================================
-- 2. RESTAURANTS TABLE
-- ========================================
INSERT INTO restaurants (name, description, cuisine_type, address, phone, email, latitude, longitude, delivery_radius_km, min_order_amount, delivery_fee, rating) VALUES
('Pizzeria Da Mario', 'Autentica pizza napoletana con ingredienti freschi e forno a legna', 'Italiana', 'Via Roma 123, 00100 Roma', '+39 06 1234567', 'info@pizzeriamario.it', 41.9028, 12.4964, 10, 10.00, 2.50, 4.5),
('Sushi Express', 'Sushi giapponese fresco e delivery veloce', 'Giapponese', 'Via Milano 456, 00100 Roma', '+39 06 2345678', 'info@sushiexpress.it', 41.8985, 12.5114, 8, 15.00, 3.00, 4.3),
('Burger House', 'Hamburger artigianali e patatine fritte fatte in casa', 'Americana', 'Via Torino 789, 00100 Roma', '+39 06 3456789', 'info@burgerhouse.it', 41.9125, 12.5133, 12, 8.00, 2.00, 4.2),
('Trattoria Nonna', 'Cucina tradizionale romana come quella della nonna', 'Italiana', 'Via Napoli 321, 00100 Roma', '+39 06 4567890', 'info@trattorianonna.it', 41.8850, 12.5322, 6, 12.00, 2.50, 4.6),
('Kebab Palace', 'Kebab turco e specialità mediorientali', 'Turca', 'Via Firenze 654, 00100 Roma', '+39 06 5678901', 'info@kebabpalace.it', 41.9200, 12.5025, 7, 5.00, 1.50, 4.0);

-- ========================================
-- 3. RESTAURANT CATEGORIES TABLE
-- ========================================
-- Categories for Pizzeria Da Mario
INSERT INTO restaurant_categories (restaurant_id, name, display_order) VALUES
((SELECT id FROM restaurants WHERE name = 'Pizzeria Da Mario'), 'Pizze Classiche', 1),
((SELECT id FROM restaurants WHERE name = 'Pizzeria Da Mario'), 'Pizze Speciali', 2),
((SELECT id FROM restaurants WHERE name = 'Pizzeria Da Mario'), 'Bevande', 3),
((SELECT id FROM restaurants WHERE name = 'Pizzeria Da Mario'), 'Dolci', 4);

-- Categories for Sushi Express
INSERT INTO restaurant_categories (restaurant_id, name, display_order) VALUES
((SELECT id FROM restaurants WHERE name = 'Sushi Express'), 'Uramaki', 1),
((SELECT id FROM restaurants WHERE name = 'Sushi Express'), 'Nigiri', 2),
((SELECT id FROM restaurants WHERE name = 'Sushi Express'), 'Sashimi', 3),
((SELECT id FROM restaurants WHERE name = 'Sushi Express'), 'Tempura', 4),
((SELECT id FROM restaurants WHERE name = 'Sushi Express'), 'Zuppe', 5),
((SELECT id FROM restaurants WHERE name = 'Sushi Express'), 'Bevande', 6);

-- Categories for Burger House
INSERT INTO restaurant_categories (restaurant_id, name, display_order) VALUES
((SELECT id FROM restaurants WHERE name = 'Burger House'), 'Hamburger', 1),
((SELECT id FROM restaurants WHERE name = 'Burger House'), 'Hamburger Speciali', 2),
((SELECT id FROM restaurants WHERE name = 'Burger House'), 'Vegetariano', 3),
((SELECT id FROM restaurants WHERE name = 'Burger House'), 'Contorni', 4);

-- Categories for Trattoria Nonna
INSERT INTO restaurant_categories (restaurant_id, name, display_order) VALUES
((SELECT id FROM restaurants WHERE name = 'Trattoria Nonna'), 'Primi', 1),
((SELECT id FROM restaurants WHERE name = 'Trattoria Nonna'), 'Secondi', 2),
((SELECT id FROM restaurants WHERE name = 'Trattoria Nonna'), 'Contorni', 3);

-- ========================================
-- 4. MENU ITEMS TABLE
-- ========================================
-- Menu per Pizzeria Da Mario
INSERT INTO menu_items (restaurant_id, category_id, name, description, price, preparation_time_minutes, is_available) VALUES
((SELECT id FROM restaurants WHERE name = 'Pizzeria Da Mario'), (SELECT id FROM restaurant_categories WHERE restaurant_id = (SELECT id FROM restaurants WHERE name = 'Pizzeria Da Mario') AND name = 'Pizze Classiche'), 'Margherita', 'Pomodoro San Marzano, mozzarella di bufala, basilico, olio extra vergine', 8.50, 15, true),
((SELECT id FROM restaurants WHERE name = 'Pizzeria Da Mario'), (SELECT id FROM restaurant_categories WHERE restaurant_id = (SELECT id FROM restaurants WHERE name = 'Pizzeria Da Mario') AND name = 'Pizze Classiche'), 'Diavola', 'Pomodoro, mozzarella, salamino piccante, peperoncino', 10.00, 18, true),
((SELECT id FROM restaurants WHERE name = 'Pizzeria Da Mario'), (SELECT id FROM restaurant_categories WHERE restaurant_id = (SELECT id FROM restaurants WHERE name = 'Pizzeria Da Mario') AND name = 'Pizze Speciali'), 'Quattro Stagioni', 'Pomodoro, mozzarella, funghi, prosciutto cotto, carciofi, olive', 12.00, 20, true),
((SELECT id FROM restaurants WHERE name = 'Pizzeria Da Mario'), (SELECT id FROM restaurant_categories WHERE restaurant_id = (SELECT id FROM restaurants WHERE name = 'Pizzeria Da Mario') AND name = 'Pizze Speciali'), 'Bufalina', 'Pomodoro, mozzarella di bufala DOP, basilico, olio extra vergine', 11.00, 16, true),
((SELECT id FROM restaurants WHERE name = 'Pizzeria Da Mario'), (SELECT id FROM restaurant_categories WHERE restaurant_id = (SELECT id FROM restaurants WHERE name = 'Pizzeria Da Mario') AND name = 'Bevande'), 'Coca Cola 33cl', 'Bevanda rinfrescante', 2.50, 2, true),
((SELECT id FROM restaurants WHERE name = 'Pizzeria Da Mario'), (SELECT id FROM restaurant_categories WHERE restaurant_id = (SELECT id FROM restaurants WHERE name = 'Pizzeria Da Mario') AND name = 'Bevande'), 'Acqua Naturale 50cl', 'Acqua minerale naturale', 1.50, 1, true),
((SELECT id FROM restaurants WHERE name = 'Pizzeria Da Mario'), (SELECT id FROM restaurant_categories WHERE restaurant_id = (SELECT id FROM restaurants WHERE name = 'Pizzeria Da Mario') AND name = 'Dolci'), 'Tiramisù', 'Dolce tradizionale al caffè con mascarpone', 5.00, 5, true),
((SELECT id FROM restaurants WHERE name = 'Pizzeria Da Mario'), (SELECT id FROM restaurant_categories WHERE restaurant_id = (SELECT id FROM restaurants WHERE name = 'Pizzeria Da Mario') AND name = 'Dolci'), 'Panna Cotta', 'Dolce con crema di latte e salsa ai frutti di bosco', 4.50, 5, true);

-- Menu per Sushi Express
INSERT INTO menu_items (restaurant_id, name, description, price, category, preparation_time_minutes, is_available) VALUES
((SELECT id FROM restaurants WHERE name = 'Sushi Express'), 'Uramaki California', 'Avocado, surimi, cetriolo, sesamo', 8.00, 'Uramaki', 10, true),
((SELECT id FROM restaurants WHERE name = 'Sushi Express'), 'Nigiri Salmone', 'Salmone fresco su riso venere', 4.50, 'Nigiri', 8, true),
((SELECT id FROM restaurants WHERE name = 'Sushi Express'), 'Sashimi Mix', 'Assortimento di salmone, tonno, branzino', 12.00, 'Sashimi', 5, true),
((SELECT id FROM restaurants WHERE name = 'Sushi Express'), 'Tempura Gamberi', 'Gamberi fritti con tempura leggera', 9.00, 'Tempura', 15, true),
((SELECT id FROM restaurants WHERE name = 'Sushi Express'), 'Miso Soup', 'Zuppa tradizionale giapponese con tofu', 3.50, 'Zuppe', 5, true),
((SELECT id FROM restaurants WHERE name = 'Sushi Express'), 'Green Tea', 'Tè verde giapponese', 2.00, 'Bevande', 2, true);

-- Menu per Burger House
INSERT INTO menu_items (restaurant_id, name, description, price, category, preparation_time_minutes, is_available) VALUES
((SELECT id FROM restaurants WHERE name = 'Burger House'), 'Classic Burger', 'Hamburger 200g con lattuga, pomodoro, cipolla, ketchup', 7.50, 'Hamburger', 12, true),
((SELECT id FROM restaurants WHERE name = 'Burger House'), 'Cheese Burger', 'Hamburger con cheddar, lattuga, pomodoro', 8.00, 'Hamburger', 12, true),
((SELECT id FROM restaurants WHERE name = 'Burger House'), 'BBQ Burger', 'Hamburger con salsa BBQ, bacon, cipolla caramellata', 9.50, 'Hamburger Speciali', 15, true),
((SELECT id FROM restaurants WHERE name = 'Burger House'), 'Veggie Burger', 'Hamburger vegetale con avocado e insalata', 7.00, 'Vegetariano', 10, true),
((SELECT id FROM restaurants WHERE name = 'Burger House'), 'Patatine Fritte', 'Patatine croccanti fatte in casa', 3.00, 'Contorni', 8, true);

-- Menu per Trattoria Nonna
INSERT INTO menu_items (restaurant_id, name, description, price, category, preparation_time_minutes, is_available) VALUES
((SELECT id FROM restaurants WHERE name = 'Trattoria Nonna'), 'Cacio e Pepe', 'Pasta con pecorino romano e pepe nero', 9.00, 'Primi', 15, true),
((SELECT id FROM restaurants WHERE name = 'Trattoria Nonna'), 'Amatriciana', 'Pasta con guanciale, pomodoro e pecorino', 10.00, 'Primi', 18, true),
((SELECT id FROM restaurants WHERE name = 'Trattoria Nonna'), 'Saltimbocca', 'Vitello con prosciutto e salvia', 12.00, 'Secondi', 20, true),
((SELECT id FROM restaurants WHERE name = 'Trattoria Nonna'), 'Carciofi alla Giudia', 'Carciofi fritti croccanti', 8.00, 'Contorni', 15, true);

-- ========================================
-- 4. ORDERS TABLE
-- ========================================
INSERT INTO orders (customer_id, restaurant_id, rider_id, status, total_amount, delivery_fee, delivery_address, customer_phone, notes, estimated_delivery_time) VALUES
((SELECT id FROM users WHERE email = 'demo.customer@delivero.local'), (SELECT id FROM restaurants WHERE name = 'Pizzeria Da Mario'), (SELECT id FROM users WHERE email = 'demo.rider@delivero.local'), 'delivered', 25.50, 2.50, 'Via Roma 123, 00100 Roma', '+39 333 1234567', 'Per favore, suonare due volte', CURRENT_TIMESTAMP - INTERVAL '1 hour'),
((SELECT id FROM users WHERE email = 'demo.customer@delivero.local'), (SELECT id FROM restaurants WHERE name = 'Sushi Express'), (SELECT id FROM users WHERE email = 'demo.rider@delivero.local'), 'delivering', 35.00, 3.00, 'Via Milano 456, 00100 Roma', '+39 333 2345678', 'Consegnare al portiere', CURRENT_TIMESTAMP + INTERVAL '30 minutes'),
((SELECT id FROM users WHERE email = 'demo.customer@delivero.local'), (SELECT id FROM restaurants WHERE name = 'Burger House'), (SELECT id FROM users WHERE email = 'demo.rider@delivero.local'), 'preparing', 18.50, 2.00, 'Via Roma 123, 00100 Roma', '+39 333 1234567', 'Senza cipolla', CURRENT_TIMESTAMP + INTERVAL '25 minutes'),
((SELECT id FROM users WHERE email = 'demo.customer@delivero.local'), (SELECT id FROM restaurants WHERE name = 'Pizzeria Da Mario'), NULL, 'accepted', 15.00, 2.50, 'Via Milano 456, 00100 Roma', '+39 333 2345678', 'Ordine urgente', CURRENT_TIMESTAMP + INTERVAL '40 minutes'),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM users WHERE email = 'demo.customer@delivero.local') AND restaurant_id = (SELECT id FROM restaurants WHERE name = 'Sushi Express') LIMIT 1), NULL, 'pending', 42.00, 3.00, 'Via Torino 789, 00100 Roma', '+39 333 3456789', 'Molto piccante per favore', CURRENT_TIMESTAMP + INTERVAL '50 minutes');

-- ========================================
-- 5. ORDER ITEMS TABLE
-- ========================================
INSERT INTO order_items (order_id, menu_item_id, quantity, unit_price, customizations) VALUES
-- Ordine 1 (Mario Rossi - Pizzeria Da Mario)
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM users WHERE email = 'demo.customer@delivero.local') AND restaurant_id = (SELECT id FROM restaurants WHERE name = 'Pizzeria Da Mario') LIMIT 1), 
 (SELECT id FROM menu_items WHERE name = 'Margherita' AND restaurant_id = (SELECT id FROM restaurants WHERE name = 'Pizzeria Da Mario') LIMIT 1), 1, 8.50, ARRAY['Senza basilico']),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM users WHERE email = 'demo.customer@delivero.local') AND restaurant_id = (SELECT id FROM restaurants WHERE name = 'Pizzeria Da Mario') LIMIT 1), 
 (SELECT id FROM menu_items WHERE name = 'Coca Cola 33cl' AND restaurant_id = (SELECT id FROM restaurants WHERE name = 'Pizzeria Da Mario') LIMIT 1), 1, 2.50, ARRAY[]::text[]),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM users WHERE email = 'demo.customer@delivero.local') AND restaurant_id = (SELECT id FROM restaurants WHERE name = 'Pizzeria Da Mario') LIMIT 1), 
 (SELECT id FROM menu_items WHERE name = 'Tiramisù' AND restaurant_id = (SELECT id FROM restaurants WHERE name = 'Pizzeria Da Mario') LIMIT 1), 1, 5.00, ARRAY[]::text[]),
-- Ordine 2 (Mario Rossi - Sushi Express)
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM users WHERE email = 'demo.customer@delivero.local') AND restaurant_id = (SELECT id FROM restaurants WHERE name = 'Sushi Express') LIMIT 1), 
 (SELECT id FROM menu_items WHERE name = 'Uramaki California' AND restaurant_id = (SELECT id FROM restaurants WHERE name = 'Sushi Express') LIMIT 1), 2, 8.00, ARRAY[]::text[]),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM users WHERE email = 'demo.customer@delivero.local') AND restaurant_id = (SELECT id FROM restaurants WHERE name = 'Sushi Express') LIMIT 1), 
 (SELECT id FROM menu_items WHERE name = 'Nigiri Salmone' AND restaurant_id = (SELECT id FROM restaurants WHERE name = 'Sushi Express') LIMIT 1), 1, 4.50, ARRAY[]::text[]),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM users WHERE email = 'demo.customer@delivero.local') AND restaurant_id = (SELECT id FROM restaurants WHERE name = 'Sushi Express') LIMIT 1), 
 (SELECT id FROM menu_items WHERE name = 'Miso Soup' AND restaurant_id = (SELECT id FROM restaurants WHERE name = 'Sushi Express') LIMIT 1), 1, 3.50, ARRAY[]::text[]),
-- Ordine 3 (Mario Rossi - Burger House)
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM users WHERE email = 'demo.customer@delivero.local') AND restaurant_id = (SELECT id FROM restaurants WHERE name = 'Burger House') LIMIT 1), 
 (SELECT id FROM menu_items WHERE name = 'Classic Burger' AND restaurant_id = (SELECT id FROM restaurants WHERE name = 'Burger House') LIMIT 1), 1, 7.50, ARRAY['Senza cipolla']),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM users WHERE email = 'demo.customer@delivero.local') AND restaurant_id = (SELECT id FROM restaurants WHERE name = 'Burger House') LIMIT 1), 
 (SELECT id FROM menu_items WHERE name = 'Patatine Fritte' AND restaurant_id = (SELECT id FROM restaurants WHERE name = 'Burger House') LIMIT 1), 1, 3.00, ARRAY[]::text[]),
-- Ordine 4 (Mario Rossi - Pizzeria Da Mario)
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM users WHERE email = 'demo.customer@delivero.local') AND restaurant_id = (SELECT id FROM restaurants WHERE name = 'Pizzeria Da Mario') LIMIT 1), 
 (SELECT id FROM menu_items WHERE name = 'Diavola' AND restaurant_id = (SELECT id FROM restaurants WHERE name = 'Pizzeria Da Mario') LIMIT 1), 1, 10.00, ARRAY[]::text[]),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM users WHERE email = 'demo.customer@delivero.local') AND restaurant_id = (SELECT id FROM restaurants WHERE name = 'Pizzeria Da Mario') LIMIT 1), 
 (SELECT id FROM menu_items WHERE name = 'Acqua Naturale 50cl' AND restaurant_id = (SELECT id FROM restaurants WHERE name = 'Pizzeria Da Mario') LIMIT 1), 2, 1.50, ARRAY[]::text[]),
-- Ordine 5 (Mario Rossi - Sushi Express)
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM users WHERE email = 'demo.customer@delivero.local') AND restaurant_id = (SELECT id FROM restaurants WHERE name = 'Sushi Express') LIMIT 1), 
 (SELECT id FROM menu_items WHERE name = 'Uramaki California' AND restaurant_id = (SELECT id FROM restaurants WHERE name = 'Sushi Express') LIMIT 1), 1, 8.00, ARRAY['Extra wasabi']),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM users WHERE email = 'demo.customer@delivero.local') AND restaurant_id = (SELECT id FROM restaurants WHERE name = 'Sushi Express') LIMIT 1), 
 (SELECT id FROM menu_items WHERE name = 'Sashimi Mix' AND restaurant_id = (SELECT id FROM restaurants WHERE name = 'Sushi Express') LIMIT 1), 1, 12.00, ARRAY[]::text[]),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM users WHERE email = 'demo.customer@delivero.local') AND restaurant_id = (SELECT id FROM restaurants WHERE name = 'Sushi Express') LIMIT 1), 
 (SELECT id FROM menu_items WHERE name = 'Tempura Gamberi' AND restaurant_id = (SELECT id FROM restaurants WHERE name = 'Sushi Express') LIMIT 1), 1, 9.00, ARRAY[]::text[]);

-- ========================================
-- 6. PAYMENTS TABLE
-- ========================================
INSERT INTO payments (order_id, payment_method, amount, status, stripe_payment_intent_id, collected_at, collected_by) VALUES
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM users WHERE email = 'demo.customer@delivero.local') AND restaurant_id = (SELECT id FROM restaurants WHERE name = 'Pizzeria Da Mario') LIMIT 1), 'cash', 25.50, 'completed', NULL, CURRENT_TIMESTAMP - INTERVAL '1 hour', (SELECT id FROM users WHERE email = 'demo.rider@delivero.local')),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM users WHERE email = 'demo.customer@delivero.local') AND restaurant_id = (SELECT id FROM restaurants WHERE name = 'Sushi Express') LIMIT 1), 'stripe', 35.00, 'completed', 'pi_test_1234567890', CURRENT_TIMESTAMP - INTERVAL '30 minutes', NULL),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM users WHERE email = 'demo.customer@delivero.local') AND restaurant_id = (SELECT id FROM restaurants WHERE name = 'Burger House') LIMIT 1), 'stripe', 18.50, 'processing', 'pi_test_1234567891', NULL, NULL),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM users WHERE email = 'demo.customer@delivero.local') AND restaurant_id = (SELECT id FROM restaurants WHERE name = 'Pizzeria Da Mario') LIMIT 1), 'cash', 15.00, 'pending', NULL, NULL, NULL),
((SELECT id FROM payments WHERE order_id = (SELECT id FROM orders WHERE customer_id = (SELECT id FROM users WHERE email = 'demo.customer@delivero.local') AND restaurant_id = (SELECT id FROM restaurants WHERE name = 'Sushi Express') LIMIT 1) LIMIT 1), 'paypal', 42.00, 'pending', 'paypal_test_123', NULL, NULL);

-- ========================================
-- 7. TICKETS TABLE (FIXED: aggiunto punto e virgola finale)
-- ========================================
INSERT INTO tickets (user_id, type, title, description, status, priority, admin_notes) VALUES
((SELECT id FROM users WHERE email = 'demo.customer@delivero.local'), 'support', 'Ordine in ritardo', 'Il mio ordine #1 è arrivato con 30 minuti di ritardo', 'resolved', 'medium', 'Cliente contattato e risolto'),
((SELECT id FROM users WHERE email = 'demo.customer@delivero.local'), 'technical', 'App crash durante il pagamento', 'L''app si chiude quando provo a pagare con Stripe', 'in_progress', 'high', 'Bug identificato nel team di sviluppo'),
((SELECT id FROM users WHERE email = 'demo.rider@delivero.local'), 'payment', 'Pagamento duplicato', 'Ho pagato due volte per lo stesso ordine #3', 'open', 'high', 'Da verificare con Stripe'),
((SELECT id FROM users WHERE email = 'demo.customer@delivero.local'), 'delivery', 'Consegna sbagliata', 'Mi hanno consegnato l''ordine di un altro cliente', 'open', 'urgent', 'Rider contattato per verifica'),
((SELECT id FROM users WHERE email = 'demo.customer@delivero.local'), 'other', 'Suggerimento menu', 'Aggiungere più opzioni vegetariane', 'open', 'low', 'Da inoltrare al team ristorazione');

-- ========================================
-- 8. TICKET COMMENTS TABLE
-- ========================================
INSERT INTO ticket_comments (ticket_id, user_id, comment, is_admin_comment) VALUES
((SELECT id FROM tickets WHERE user_id = (SELECT id FROM users WHERE email = 'demo.customer@delivero.local') AND title = 'Ordine in ritardo' LIMIT 1), (SELECT id FROM users WHERE email = 'demo.customer@delivero.local'), 'Ordine ricevuto correttamente, grazie per l''assistenza!', false),
((SELECT id FROM tickets WHERE user_id = (SELECT id FROM users WHERE email = 'demo.customer@delivero.local') AND title = 'Ordine in ritardo' LIMIT 1), (SELECT id FROM users WHERE email = 'demo.manager@delivero.local'), 'Ci scusiamo per il ritardo, abbiamo verificato e risolto il problema.', true),
((SELECT id FROM tickets WHERE user_id = (SELECT id FROM users WHERE email = 'demo.customer@delivero.local') AND title = 'App crash durante il pagamento' LIMIT 1), (SELECT id FROM users WHERE email = 'demo.customer@delivero.local'), 'L''app crasha ogni volta che provo a completare un pagamento', false),
((SELECT id FROM tickets WHERE user_id = (SELECT id FROM users WHERE email = 'demo.customer@delivero.local') AND title = 'App crash durante il pagamento' LIMIT 1), (SELECT id FROM users WHERE email = 'demo.manager@delivero.local'), 'Stiamo investigando il problema, dovrebbe essere risolto nella prossima release.', true),
((SELECT id FROM tickets WHERE user_id = (SELECT id FROM users WHERE email = 'demo.rider@delivero.local') AND title = 'Pagamento duplicato' LIMIT 1), (SELECT id FROM users WHERE email = 'demo.rider@delivero.local'), 'Ho ricevuto due addebiti sulla carta per lo stesso ordine', false),
((SELECT id FROM tickets WHERE user_id = (SELECT id FROM users WHERE email = 'demo.customer@delivero.local') AND title = 'Consegna sbagliata' LIMIT 1), (SELECT id FROM users WHERE email = 'demo.customer@delivero.local'), 'Mi è stato consegnato un sushi quando avevo ordinato una pizza', false),
((SELECT id FROM tickets WHERE user_id = (SELECT id FROM users WHERE email = 'demo.customer@delivero.local') AND title = 'Suggerimento menu' LIMIT 1), (SELECT id FROM users WHERE email = 'demo.customer@delivero.local'), 'Sarebbe bello avere più scelte vegetariane nel menu', false),
((SELECT id FROM tickets WHERE user_id = (SELECT id FROM users WHERE email = 'demo.customer@delivero.local') AND title = 'Suggerimento menu' LIMIT 1), (SELECT id FROM users WHERE email = 'demo.manager@delivero.local'), 'Grazie per il suggerimento, lo terremo in considerazione per il futuro.', true);

-- ========================================
-- 9. RIDER LOCATIONS TABLE (FIXED: rimosso SELECT ricorsivo errato e sistemato parentesi)
-- ========================================
INSERT INTO rider_locations (order_id, rider_id, latitude, longitude, eta_minutes) VALUES
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM users WHERE email = 'demo.customer@delivero.local') AND restaurant_id = (SELECT id FROM restaurants WHERE name = 'Sushi Express') LIMIT 1), (SELECT id FROM users WHERE email = 'demo.rider@delivero.local'), 41.8985, 12.5114, 10),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM users WHERE email = 'demo.customer@delivero.local') AND restaurant_id = (SELECT id FROM restaurants WHERE name = 'Burger House') LIMIT 1), (SELECT id FROM users WHERE email = 'demo.rider@delivero.local'), 41.9028, 12.4964, 15),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM users WHERE email = 'demo.customer@delivero.local') AND restaurant_id = (SELECT id FROM restaurants WHERE name = 'Pizzeria Da Mario') LIMIT 1), (SELECT id FROM users WHERE email = 'demo.rider@delivero.local'), 41.8850, 12.5322, 20);
-- ========================================
-- 10. NOTIFICATIONS TABLE
-- ========================================
INSERT INTO notifications (user_id, title, message, type, is_read, data) VALUES
-- Notifiche per Mario Rossi (customer)
((SELECT id FROM users WHERE email = 'demo.customer@delivero.local'), 'Ordine Consegnato', 'Il tuo ordine #1 è stato consegnato con successo', 'order', true, '{"order_id": 1, "status": "delivered"}'),
((SELECT id FROM users WHERE email = 'demo.customer@delivero.local'), 'Ordine in preparazione', 'Il tuo ordine #3 è in preparazione presso Burger House', 'order', false, '{"order_id": 3, "status": "preparing"}'),
-- Altre notifiche per Mario Rossi (customer)
((SELECT id FROM users WHERE email = 'demo.customer@delivero.local'), 'Rider in arrivo', 'Il rider è a 10 minuti dalla tua posizione', 'order', false, '{"order_id": 2, "eta_minutes": 10}'),
((SELECT id FROM users WHERE email = 'demo.customer@delivero.local'), 'Ordine accettato', 'Il tuo ordine #4 è stato accettato da Pizzeria Da Mario', 'order', false, '{"order_id": 4, "status": "accepted"}'),
-- Notifiche per Paolo Verdi (rider)
((SELECT id FROM users WHERE email = 'demo.rider@delivero.local'), 'Nuovo ordine disponibile', 'C''è un nuovo ordine #5 nella tua zona', 'order', false, '{"order_id": 5, "distance": "2km"}'),
((SELECT id FROM users WHERE email = 'demo.rider@delivero.local'), 'Ordine consegnato', 'Hai consegnato l''ordine #1', 'order', true, '{"order_id": 1}'),
-- Notifiche per Admin User (manager)
((SELECT id FROM users WHERE email = 'demo.manager@delivero.local'), 'Nuovo ticket di supporto', 'Ticket #4 urgente: consegna sbagliata', 'system', false, '{"ticket_id": 4, "priority": "urgent"}'),
((SELECT id FROM users WHERE email = 'demo.manager@delivero.local'), 'Report giornaliero', 'Oggi 5 ordini completati, 2 ticket aperti', 'system', true, '{"orders": 5, "tickets": 2}');

-- ========================================
-- VERIFICA FINALE
-- ========================================
DO $$
DECLARE
    users_count INTEGER;
    restaurants_count INTEGER;
    menu_items_count INTEGER;
    orders_count INTEGER;
    order_items_count INTEGER;
    payments_count INTEGER;
    tickets_count INTEGER;
    ticket_comments_count INTEGER;
    rider_locations_count INTEGER;
    notifications_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO users_count FROM users;
    SELECT COUNT(*) INTO restaurants_count FROM restaurants;
    SELECT COUNT(*) INTO menu_items_count FROM menu_items;
    SELECT COUNT(*) INTO orders_count FROM orders;
    SELECT COUNT(*) INTO order_items_count FROM order_items;
    SELECT COUNT(*) INTO payments_count FROM payments;
    SELECT COUNT(*) INTO tickets_count FROM tickets;
    SELECT COUNT(*) INTO ticket_comments_count FROM ticket_comments;
    SELECT COUNT(*) INTO rider_locations_count FROM rider_locations;
    SELECT COUNT(*) INTO notifications_count FROM notifications;
    
    RAISE NOTICE 'Database popolato con successo!';
    RAISE NOTICE 'Users: %, Restaurants: %, Menu Items: %', users_count, restaurants_count, menu_items_count;
    RAISE NOTICE 'Orders: %, Order Items: %, Payments: %', orders_count, order_items_count, payments_count;
    RAISE NOTICE 'Tickets: %, Ticket Comments: %', tickets_count, ticket_comments_count;
    RAISE NOTICE 'Rider Locations: %, Notifications: %', rider_locations_count, notifications_count;
    RAISE NOTICE 'Pronto per i test dell''applicazione!';
END $$;

-- Query per verificare i dati inseriti
SELECT 'users' as table_name, COUNT(*) as record_count FROM users
UNION ALL
SELECT 'restaurants', COUNT(*) FROM restaurants
UNION ALL
SELECT 'menu_items', COUNT(*) FROM menu_items
UNION ALL
SELECT 'orders', COUNT(*) FROM orders
UNION ALL
SELECT 'order_items', COUNT(*) FROM order_items
UNION ALL
SELECT 'payments', COUNT(*) FROM payments
UNION ALL
SELECT 'tickets', COUNT(*) FROM tickets
UNION ALL
SELECT 'ticket_comments', COUNT(*) FROM ticket_comments
UNION ALL
SELECT 'rider_locations', COUNT(*) FROM rider_locations
UNION ALL
SELECT 'notifications', COUNT(*) FROM notifications
ORDER BY table_name;
