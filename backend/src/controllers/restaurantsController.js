import db from '../config/db.js';

// Get all restaurants with filters
export const getRestaurants = async (req, res) => {
  try {
    const { search, category, rating_min, max_delivery_time, max_delivery_cost } = req.query;

    let query = `
      SELECT 
        id, name, rating, delivery_fee as delivery_cost, 
        image_url, description, address, 
        latitude, longitude, is_open, restaurants.is_active, 
        (SELECT COUNT(*) FROM reviews WHERE restaurant_id = restaurants.id) as review_count
      FROM restaurants
      WHERE restaurants.is_active = true
    `;
    const params = [];

    if (search) {
      query += ` AND (name ILIKE $${params.length + 1} OR description ILIKE $${params.length + 1})`;
      params.push(`%${search}%`);
    }

    if (category) {
      query += ` AND id IN (
        SELECT DISTINCT restaurant_id FROM restaurant_categories 
        WHERE name ILIKE $${params.length + 1} AND restaurant_categories.is_active = true
      )`;
      params.push(category);
    }

    if (rating_min) {
      query += ` AND rating >= $${params.length + 1}`;
      params.push(parseFloat(rating_min));
    }

    if (max_delivery_cost) {
      query += ` AND delivery_fee <= $${params.length + 1}`;
      params.push(parseFloat(max_delivery_cost));
    }

    if (max_delivery_cost) {
      query += ` AND delivery_cost <= $${params.length + 1}`;
      params.push(parseFloat(max_delivery_cost));
    }

    query += ` ORDER BY rating DESC LIMIT 50`;

    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching restaurants', error: error.message });
  }
};

// Get single restaurant with full menu
export const getRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    // Get restaurant details
    const restaurantRes = await db.query(
      `SELECT 
              id, name, rating, delivery_fee as delivery_cost, 
              image_url, description, address, 
              latitude, longitude, is_open, phone
       FROM restaurants 
       WHERE id = $1 AND restaurants.is_active = true`,
      [id],
    );

    if (restaurantRes.rows.length === 0) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const restaurant = restaurantRes.rows[0];

    // Get menu items directly (con prezzi come numeri)
    const menuRes = await db.query(
      `SELECT 
            mi.id,
            mi.name,
            mi.description,
            mi.price::numeric,
            mi.image_url,
            mi.allergens,
            mi.is_available,
            mi.preparation_time_minutes,
            mi.category
          FROM menu_items mi
          WHERE mi.restaurant_id = $1 AND mi.is_available = true
          ORDER BY mi.name`,
      [id],
    );

    const menu = menuRes.rows;

    // Get recent reviews (handle case where reviews table doesn't exist)
    let reviews = [];
    try {
      const reviewsRes = await db.query(
        `SELECT id, food_rating, delivery_rating, comment, photos_urls, created_at, author_name
           FROM reviews
           WHERE restaurant_id = $1 AND is_verified = true
           ORDER BY created_at DESC
           LIMIT 10`,
        [id],
      );
      reviews = reviewsRes.rows || [];
    } catch (reviewError) {
      console.warn('Reviews table not available yet:', reviewError.message);
      reviews = [];
    }

    res.json({
      ...restaurant,
      menu,
      recent_reviews: reviews,
    });
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    res.status(500).json({ message: 'Error fetching restaurant', error: error.message });
  }
};

// Get restaurant categories
export const getCategories = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT DISTINCT name as category 
             FROM restaurant_categories 
             WHERE restaurant_categories.is_active = true AND name IS NOT NULL
             ORDER BY name ASC`,
    );
    res.json(result.rows.map(r => r.category));
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
};

// Get restaurant reviews
export const getRestaurantReviews = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { sort_by = 'recent', filter_by = 'all' } = req.query;

    let query = `
      SELECT id, food_rating, delivery_rating, comment, photos_urls, created_at, author_name
      FROM reviews
      WHERE restaurant_id = $1 AND is_verified = true
    `;
    const params = [restaurantId];

    if (filter_by === 'with_photos') {
      query += ` AND photos_urls IS NOT NULL AND array_length(photos_urls, 1) > 0`;
    } else if (filter_by === 'positive') {
      query += ` AND food_rating >= 4`;
    }

    if (sort_by === 'recent') {
      query += ` ORDER BY created_at DESC`;
    } else if (sort_by === 'highest') {
      query += ` ORDER BY food_rating DESC`;
    }

    query += ` LIMIT 50`;

    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
};

export default {
  getRestaurants,
  getRestaurant,
  getCategories,
  getRestaurantReviews,
};
