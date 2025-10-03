const pool = require("../config/db");

const Review = {
  // Get all reviews (Admin view or general listing)
  getAll: async () => {
    const [rows] = await pool.query(`
      SELECT r.*, 
             u.firstname AS user_name, u.email AS user_email,
             s.shoe_name AS shoe_name, s.price AS shoe_price
      FROM reviews r
      JOIN users u ON r.user_id = u.user_id
      JOIN shoes s ON r.shoes_id = s.shoes_id
      ORDER BY r.created_at DESC
    `);
    return rows;
  },

  // Get review by review_id
  getById: async (review_id) => {
    const [rows] = await pool.query(
      `SELECT r.*, 
              u.firstName AS user_name, u.email AS user_email,
              s.shoe_name AS shoe_name, s.price AS shoe_price
       FROM reviews r
       JOIN users u ON r.user_id = u.user_id
       JOIN shoes s ON r.shoes_id = s.shoes_id
       WHERE r.review_id = ?`,
      [review_id]
    );
    return rows[0];
  },

  // Get all reviews for a specific shoe
  getByShoeId: async (shoes_id) => {
    const [rows] = await pool.query(
      `SELECT r.*, u.firstName AS user_name, u.email AS user_email
       FROM reviews r
       JOIN users u ON r.user_id = u.user_id
       WHERE r.shoes_id = ?
       ORDER BY r.created_at DESC`,
      [shoes_id]
    );
    return rows;
  },

  // Get all reviews by user (from token)
  getByUserId: async (user_id) => {
    const [rows] = await pool.query(
      `SELECT r.*, s.shoe_name AS shoe_name, s.price AS shoe_price
       FROM reviews r
       JOIN shoes s ON r.shoes_id = s.shoes_id
       WHERE r.user_id = ?
       ORDER BY r.created_at DESC`,
      [user_id]
    );
    return rows;
  },

  // Create new review
  create: async (data) => {
    const { user_id, shoes_id, review_text, rating } = data;

    const [result] = await pool.query(
      `INSERT INTO reviews (user_id, shoes_id, review_text, rating)
       VALUES (?, ?, ?, ?)`,
      [user_id, shoes_id, review_text, rating]
    );

    return result.insertId;
  },

  // Update review (only own review ideally)
  update: async (review_id, data) => {
    const { review_text, rating } = data;

    const [result] = await pool.query(
      `UPDATE reviews 
       SET review_text=?, rating=?, updated_at = CURRENT_TIMESTAMP
       WHERE review_id=?`,
      [review_text, rating, review_id]
    );

    return result.affectedRows;
  },

  // Delete review (only own review ideally)
  delete: async (review_id) => {
    const [result] = await pool.query(
      `DELETE FROM reviews WHERE review_id = ?`,
      [review_id]
    );
    return result.affectedRows;
  },

  // Get count & average rating (for a shoe)
  getStatsByShoeId: async (shoes_id) => {
    const [rows] = await pool.query(
      `SELECT COUNT(*) AS total_reviews, 
              AVG(rating) AS average_rating
       FROM reviews
       WHERE shoes_id = ?`,
      [shoes_id]
    );
    return rows[0];
  },

  // Get overall stats (all reviews on site)
  getOverallStats: async () => {
    const [rows] = await pool.query(
      `SELECT COUNT(*) AS total_reviews, 
              AVG(rating) AS average_rating
       FROM reviews`
    );
    return rows[0];
  },
};

module.exports = Review;
