#!/usr/bin/env node
/**
 * Demo Data Seeding Script
 * Creates demo data for testing all app functionality
 * Runs only if DB is empty (no users)
 */
import db from '../src/config/db.js';
import bcrypt from 'bcryptjs';

// Support an internal dry-run mode: pass --dry-run or set env DRY_RUN=1
const DRY_RUN = process.argv.includes('--dry-run') || process.env.DRY_RUN === '1';

const CENTER = { lat: 41.880025, lon: 12.67594 };

const jitter = (v, meters) => {
    const dLat = meters / 111111;
    const dLon = meters / (111111 * Math.cos((CENTER.lat * Math.PI) / 180));
    const r1 = (Math.random() - 0.5) * 2;
    const r2 = (Math.random() - 0.5) * 2;
    return v + (v === CENTER.lat ? r1 * dLat : r2 * dLon);
};

const upsertUser = async ({ email, name, role, phone = null, address = null }) => {
    const password = await bcrypt.hash('123456', 10);
    const res = await db.query(
        `INSERT INTO users (email, password, name, role, phone, address, is_active)
     VALUES ($1, $2, $3, $4, $5, $6, true)
     ON CONFLICT (email) DO UPDATE SET 
       name = EXCLUDED.name, 
       role = EXCLUDED.role, 
       password = EXCLUDED.password,
       phone = EXCLUDED.phone,
       address = EXCLUDED.address,
       is_active = EXCLUDED.is_active
     RETURNING id, email, role, name, phone, address`,
        [email, password, name, role, phone, address]
    );
    return res.rows[0];
};

const insertRestaurant = async ({ name, address, latitude, longitude, cuisine_type = 'Italian' }) => {
    const res = await db.query(
        `INSERT INTO restaurants (name, description, cuisine_type, address, phone, email, rating, latitude, longitude, is_open, is_active, delivery_radius_km, min_order_amount, delivery_fee, estimated_delivery_time, delivery_cost)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, true, true, $10, $11, $12, $13, $14)
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
       is_active = EXCLUDED.is_active,
       delivery_radius_km = EXCLUDED.delivery_radius_km,
       min_order_amount = EXCLUDED.min_order_amount,
       delivery_fee = EXCLUDED.delivery_fee,
       estimated_delivery_time = EXCLUDED.estimated_delivery_time,
       delivery_cost = EXCLUDED.delivery_cost
     RETURNING id, name, cuisine_type`,
        [
            name,
            'Demo restaurant seeded nearby',
            cuisine_type,
            address,
            '+39 06 123456',
            'demo@delivero.local',
            4.7,
            latitude,
            longitude,
            10, // delivery_radius_km
            5.0, // min_order_amount
            2.50, // delivery_fee
            30, // estimated_delivery_time
            2.00 // delivery_cost
        ]
    );
    return res.rows[0];
};

const insertRestaurantCategory = async ({ restaurantId, name, display_order = 0 }) => {
    const res = await db.query(
        `INSERT INTO restaurant_categories (restaurant_id, name, is_active, display_order)
     VALUES ($1, $2, true, $3)
     ON CONFLICT (restaurant_id, name) DO UPDATE SET 
       is_active = EXCLUDED.is_active,
       display_order = EXCLUDED.display_order
     RETURNING id, name`,
        [restaurantId, name, display_order]
    );
    return res.rows[0];
};

const insertMenuItem = async ({ restaurantId, categoryId, name, description, price, category = 'Main', preparation_time = 15, allergens = null }) => {
    const res = await db.query(
        `INSERT INTO menu_items (restaurant_id, category_id, name, description, price, category, is_available, preparation_time_minutes, allergens)
     VALUES ($1, $2, $3, $4, $5, $6, true, $7, $8)
     ON CONFLICT (restaurant_id, name) DO UPDATE SET 
       category_id = EXCLUDED.category_id,
       description = EXCLUDED.description,
       price = EXCLUDED.price,
       category = EXCLUDED.category,
       is_available = EXCLUDED.is_available,
       preparation_time_minutes = EXCLUDED.preparation_time_minutes,
       allergens = EXCLUDED.allergens
     RETURNING id, name, price`,
        [restaurantId, categoryId, name, description, price, category, preparation_time, allergens]
    );
    return res.rows[0];
};

const insertOrder = async ({
    customerId,
    restaurantId,
    totalAmount,
    deliveryAddress,
    deliveryLat,
    deliveryLon,
    riderId,
    riderLat,
    riderLon,
    etaMinutes,
    status,
    customerPhone = '+39 06 789012',
    notes = null
}) => {
    const res = await db.query(
        `INSERT INTO orders (
       customer_id, restaurant_id, rider_id, status, total_amount, delivery_fee, delivery_address,
       customer_phone, notes, delivery_latitude, delivery_longitude, rider_latitude, rider_longitude,
       eta_minutes, received_at, estimated_delivery_time, created_at, updated_at
     ) VALUES (
       $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,NOW(),NOW() + INTERVAL '${etaMinutes} minutes',NOW(),NOW()
     )
     RETURNING id, status, total_amount`,
        [
            customerId, restaurantId, riderId, status, totalAmount, 2.50, deliveryAddress,
            customerPhone, notes, deliveryLat, deliveryLon, riderLat, riderLon, etaMinutes
        ]
    );
    return res.rows[0];
};

const insertOrderItem = async ({ orderId, menuItemId, quantity, unitPrice, customizations = null }) => {
    const res = await db.query(
        `INSERT INTO order_items (order_id, menu_item_id, quantity, unit_price, customizations)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (order_id, menu_item_id) DO UPDATE SET 
       quantity = EXCLUDED.quantity,
       unit_price = EXCLUDED.unit_price,
       customizations = EXCLUDED.customizations
     RETURNING id, quantity, unit_price`,
        [orderId, menuItemId, quantity, unitPrice, customizations]
    );
    return res.rows[0];
};

const insertPayment = async ({ orderId, paymentMethod = 'cash', amount, status = 'pending', collectedBy = null }) => {
    const res = await db.query(
        `INSERT INTO payments (order_id, payment_method, amount, status, collected_by, collected_at, confirmed_at)
     VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
     ON CONFLICT (order_id) DO UPDATE SET 
       payment_method = EXCLUDED.payment_method,
       amount = EXCLUDED.amount,
       status = EXCLUDED.status,
       collected_by = EXCLUDED.collected_by,
       collected_at = EXCLUDED.collected_at,
       confirmed_at = EXCLUDED.confirmed_at
     RETURNING id, payment_method, amount, status`,
        [orderId, paymentMethod, amount, status, collectedBy]
    );
    return res.rows[0];
};

const insertTicket = async ({ userId, type, title, description, priority = 'medium', orderId = null }) => {
    const res = await db.query(
        `INSERT INTO tickets (user_id, type, title, description, priority, status, order_id)
     VALUES ($1, $2, $3, $4, $5, 'open', $6)
     ON CONFLICT (user_id, title) DO UPDATE SET 
       type = EXCLUDED.type,
       description = EXCLUDED.description,
       priority = EXCLUDED.priority,
       status = EXCLUDED.status,
       order_id = EXCLUDED.order_id
     RETURNING id, type, status, priority`,
        [userId, type, title, description, priority, orderId]
    );
    return res.rows[0];
};

const insertTicketComment = async ({ ticketId, userId, comment, isAdminComment = false }) => {
    const res = await db.query(
        `INSERT INTO ticket_comments (ticket_id, user_id, comment, is_admin_comment)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (ticket_id, user_id, created_at) DO UPDATE SET 
       comment = EXCLUDED.comment,
       is_admin_comment = EXCLUDED.is_admin_comment
     RETURNING id, created_at`,
        [ticketId, userId, comment, isAdminComment]
    );
    return res.rows[0];
};

const insertNotification = async ({ userId, title, message, type = 'info', data = null }) => {
    const res = await db.query(
        `INSERT INTO notifications (user_id, title, message, type, is_read, data)
     VALUES ($1, $2, $3, $4, false, $5)
     ON CONFLICT (user_id, title, created_at) DO UPDATE SET 
       message = EXCLUDED.message,
       type = EXCLUDED.type,
       is_read = EXCLUDED.is_read,
       data = EXCLUDED.data
     RETURNING id, type, is_read`,
        [userId, title, message, type, data]
    );
    return res.rows[0];
};

const insertRiderLocation = async ({ orderId, riderId, latitude, longitude, etaMinutes = null }) => {
    const res = await db.query(
        `INSERT INTO rider_locations (order_id, rider_id, latitude, longitude, eta_minutes, timestamp)
     VALUES ($1, $2, $3, $4, $5, NOW())
     ON CONFLICT (order_id) DO UPDATE SET 
       rider_id = EXCLUDED.rider_id,
       latitude = EXCLUDED.latitude,
       longitude = EXCLUDED.longitude,
       eta_minutes = EXCLUDED.eta_minutes,
       timestamp = EXCLUDED.timestamp
     RETURNING id, timestamp`,
        [orderId, riderId, latitude, longitude, etaMinutes]
    );
    return res.rows[0];
};

const insertReview = async ({ restaurantId, userId, foodRating, deliveryRating, comment = null, authorName = null }) => {
    const res = await db.query(
        `INSERT INTO reviews (restaurant_id, user_id, food_rating, delivery_rating, comment, author_name, is_verified)
     VALUES ($1, $2, $3, $4, $5, $6, true)
     ON CONFLICT (restaurant_id, user_id) DO UPDATE SET 
       food_rating = EXCLUDED.food_rating,
       delivery_rating = EXCLUDED.delivery_rating,
       comment = EXCLUDED.comment,
       author_name = EXCLUDED.author_name,
       is_verified = EXCLUDED.is_verified
     RETURNING id, food_rating, delivery_rating`,
        [restaurantId, userId, foodRating, deliveryRating, comment, authorName]
    );
    return res.rows[0];
};

// Main seeding function
(async () => {
    try {
        // Check if DB already has users
        const userCount = await db.query('SELECT COUNT(*) AS cnt FROM users');
        const count = parseInt(userCount.rows[0].cnt, 10);
        if (count > 0) {
            console.log('Database already has users; skipping demo data seeding.');
            process.exit(0);
        }

        if (DRY_RUN) {
            console.log('🌱 DRY-RUN: Empty DB detected; demo seeding would perform the following actions:');
            console.log('  - Create users: demo.customer, demo.rider, demo.manager');
            console.log('  - Create restaurants: 2 (Demo Pizza Roma Est, Demo Sushi Roma Est)');
            console.log('  - Create restaurant categories: 4');
            console.log('  - Create menu items: ~5');
            console.log('  - Create orders: 1, with 2 order items');
            console.log('  - Create payments: 1');
            console.log('  - Create tickets and comments: 1 each');
            console.log('  - Create notifications: 2');
            console.log('  - Create rider location entries: 1');
            console.log('  - Create reviews: 1');
            console.log('\nRun the script without --dry-run to actually apply these changes.');
            process.exit(0);
        }

        console.log('🌱 Empty DB detected; running comprehensive demo data seeding near:', CENTER);

        // Create users
        const customer = await upsertUser({
            email: 'demo.customer@delivero.local',
            name: 'Demo Customer',
            role: 'customer',
            phone: '+39 06 123456',
            address: 'Via Demo Customer 1, Roma'
        });

        const rider = await upsertUser({
            email: 'demo.rider@delivero.local',
            name: 'Demo Rider',
            role: 'rider',
            phone: '+39 06 789012',
            address: 'Via Demo Rider 1, Roma'
        });

        const manager = await upsertUser({
            email: 'demo.manager@delivero.local',
            name: 'Demo Manager',
            role: 'manager',
            phone: '+39 06 345678',
            address: 'Via Demo Manager 1, Roma'
        });

        console.log('✅ Users created:', { customer, rider, manager });

        // Create restaurants
        const r1 = await insertRestaurant({
            name: 'Demo Pizza Roma Est',
            address: 'Via Demo 1, Roma',
            latitude: jitter(CENTER.lat, 350),
            longitude: jitter(CENTER.lon, 350),
            cuisine_type: 'Pizza'
        });

        const r2 = await insertRestaurant({
            name: 'Demo Sushi Roma Est',
            address: 'Via Demo 2, Roma',
            latitude: jitter(CENTER.lat, 600),
            longitude: jitter(CENTER.lon, 600),
            cuisine_type: 'Japanese'
        });

        console.log('✅ Restaurants created:', { r1, r2 });

        // Create restaurant categories
        const pizzaCat = await insertRestaurantCategory({ restaurantId: r1.id, name: 'Pizze', display_order: 1 });
        const pizzaBevande = await insertRestaurantCategory({ restaurantId: r1.id, name: 'Bevande', display_order: 2 });
        const sushiCat = await insertRestaurantCategory({ restaurantId: r2.id, name: 'Sushi', display_order: 1 });
        const sushiBevande = await insertRestaurantCategory({ restaurantId: r2.id, name: 'Bevande', display_order: 2 });

        console.log('✅ Restaurant categories created');

        // Create menu items
        const pizza1 = await insertMenuItem({
            restaurantId: r1.id,
            categoryId: pizzaCat.id,
            name: 'Pizza Margherita',
            description: 'Pizza classica con pomodoro, mozzarella e basilico',
            price: 8.50,
            category: 'Pizze',
            preparation_time: 15,
            allergens: 'Glutine, Lattosio'
        });

        const pizza2 = await insertMenuItem({
            restaurantId: r1.id,
            categoryId: pizzaCat.id,
            name: 'Pizza Diavola',
            description: 'Pizza picante con salamino piccante',
            price: 10.00,
            category: 'Pizze',
            preparation_time: 20,
            allergens: 'Glutine, Lattosio'
        });

        const bevanda1 = await insertMenuItem({
            restaurantId: r1.id,
            categoryId: pizzaBevande.id,
            name: 'Acqua Naturale',
            description: 'Acqua naturale 1.5L',
            price: 1.50,
            category: 'Bevande',
            preparation_time: 1
        });

        const sushi1 = await insertMenuItem({
            restaurantId: r2.id,
            categoryId: sushiCat.id,
            name: 'Sushi Mix',
            description: 'Assortimento di sushi e sashimi',
            price: 15.00,
            category: 'Sushi',
            preparation_time: 25,
            allergens: 'Pesce, Soia'
        });

        const bevanda2 = await insertMenuItem({
            restaurantId: r2.id,
            categoryId: sushiBevande.id,
            name: 'Tè Verde',
            description: 'Tè verde giapponese',
            price: 2.00,
            category: 'Bevande',
            preparation_time: 2
        });

        console.log('✅ Menu items created');

        // Create order
        const deliveryLat = jitter(CENTER.lat, 120);
        const deliveryLon = jitter(CENTER.lon, 120);
        const riderLat = jitter(CENTER.lat, 200);
        const riderLon = jitter(CENTER.lon, 200);

        const order = await insertOrder({
            customerId: customer.id,
            restaurantId: r1.id,
            totalAmount: 10.00,
            deliveryAddress: 'Vicino alla tua posizione (demo)',
            deliveryLat,
            deliveryLon,
            riderId: rider.id,
            riderLat,
            riderLon,
            etaMinutes: 12,
            status: 'in_transit',
            customerPhone: customer.phone,
            notes: 'Per favore, consegnare alla porta'
        });

        console.log('✅ Order created:', order);

        // Create order items
        const orderItem1 = await insertOrderItem({
            orderId: order.id,
            menuItemId: pizza1.id,
            quantity: 1,
            unitPrice: pizza1.price
        });

        const orderItem2 = await insertOrderItem({
            orderId: order.id,
            menuItemId: bevanda1.id,
            quantity: 1,
            unitPrice: bevanda1.price
        });

        console.log('✅ Order items created');

        // Create payment
        const payment = await insertPayment({
            orderId: order.id,
            paymentMethod: 'cash',
            amount: order.total_amount,
            status: 'pending',
            collectedBy: rider.id
        });

        console.log('✅ Payment created');

        // Create ticket
        const ticket = await insertTicket({
            userId: customer.id,
            type: 'support',
            title: 'Problema con ordine #' + order.id,
            description: 'Il mio ordine è in ritardo',
            priority: 'medium',
            orderId: order.id
        });

        console.log('✅ Ticket created');

        // Create ticket comment
        const ticketComment = await insertTicketComment({
            ticketId: ticket.id,
            userId: customer.id,
            comment: 'Il rider sembra essere fermo in un punto',
            isAdminComment: false
        });

        console.log('✅ Ticket comment created');

        // Create notifications
        const notif1 = await insertNotification({
            userId: customer.id,
            title: 'Ordine in transito',
            message: `Il tuo ordine #${order.id} è in transito`,
            type: 'order',
            data: { orderId: order.id, status: 'in_transit' }
        });

        const notif2 = await insertNotification({
            userId: rider.id,
            title: 'Nuovo ordine',
            message: `Hai un nuovo ordine da consegnare`,
            type: 'order',
            data: { orderId: order.id }
        });

        console.log('✅ Notifications created');

        // Create rider location
        const riderLocation = await insertRiderLocation({
            orderId: order.id,
            riderId: rider.id,
            latitude: riderLat,
            longitude: riderLon,
            etaMinutes: 12
        });

        console.log('✅ Rider location created');

        // Create review
        const review = await insertReview({
            restaurantId: r1.id,
            userId: customer.id,
            foodRating: 5,
            deliveryRating: 4,
            comment: 'Ottima pizza, consegna un po\' lenta',
            authorName: customer.name
        });

        console.log('✅ Review created');

        console.log('🎉 Comprehensive demo data seeding completed successfully!');
        console.log('📊 Summary:');
        console.log(`  - Users: 3 (customer, rider, manager)`);
        console.log(`  - Restaurants: 2 (Pizza, Sushi)`);
        console.log(`  - Categories: 4`);
        console.log(`  - Menu items: 5`);
        console.log(`  - Orders: 1`);
        console.log(`  - Order items: 2`);
        console.log(`  - Payments: 1`);
        console.log(`  - Tickets: 1`);
        console.log(`  - Ticket comments: 1`);
        console.log(`  - Notifications: 2`);
        console.log(`  - Rider locations: 1`);
        console.log(`  - Reviews: 1`);

        process.exit(0);
    } catch (e) {
        console.error('❌ Demo data seeding failed:', e?.message || e);
        console.error('Stack:', e?.stack);
        process.exit(1);
    }
})();
