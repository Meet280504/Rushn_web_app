const pool = require("../config/db");

const Orders = {
  // Create a new order
  create: async (data) => {
    const { user_id, shoes_id, shoe_name, payment_method, status, total_amount, voucher_id } = data;

    const [result] = await pool.query(
      `INSERT INTO orders (user_id, shoes_id, shoe_name, payment_method, status, total_amount, voucher_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [user_id, shoes_id, shoe_name, payment_method, status || "Pending", total_amount, voucher_id]
    );

    return result.insertId;
  },

  // Get all orders (Admin view)
  getAll: async () => {
    const [rows] = await pool.query(
      `SELECT o.*, u.firstName AS user_name, u.email AS user_email, s.shoe_name AS shoe_real_name, s.original_price AS original_price, s.price AS shoe_price, s.image_url AS shoe_image, o.voucher_id AS voucher_id, v.code AS voucher_code, v.discount_value AS discount_amount
       FROM orders o
       JOIN users u ON o.user_id = u.user_id
       JOIN shoes s ON o.shoes_id = s.shoes_id
       LEFT JOIN vouchers v ON o.voucher_id = v.voucher_id`
    );
    return rows;
  },

  // Get order by ID
  getById: async (order_id) => {
    const [rows] = await pool.query(
      `SELECT o.*, 
              u.firstName AS user_name, 
              u.email AS user_email, 
              s.shoe_name AS shoe_real_name, 
              s.original_price AS original_price, 
              s.price AS shoe_price, 
              s.image_url AS shoe_image, 
              o.voucher_id AS voucher_id, 
              v.code AS voucher_code, 
              v.discount_value AS discount_amount
      FROM orders o
      JOIN users u ON o.user_id = u.user_id
      JOIN shoes s ON o.shoes_id = s.shoes_id
      LEFT JOIN vouchers v ON o.voucher_id = v.voucher_id
      WHERE o.order_id = ?`,
      [order_id]
    );
    return rows[0];
  },

  // Get all orders of a user
  getByUserId: async (user_id) => {
    const [rows] = await pool.query(
      `SELECT o.*, 
              u.firstName AS user_name, 
              u.email AS user_email, 
              s.shoe_name AS shoe_real_name, 
              s.original_price AS original_price, 
              s.price AS shoe_price, 
              s.image_url AS shoe_image, 
              o.voucher_id AS voucher_id, 
              v.code AS voucher_code, 
              v.discount_value AS discount_amount
      FROM orders o
      JOIN users u ON o.user_id = u.user_id
      JOIN shoes s ON o.shoes_id = s.shoes_id
      LEFT JOIN vouchers v ON o.voucher_id = v.voucher_id
      WHERE o.user_id = ?`,
      [user_id]
    );
    return rows;
  },


  // Update order status (Admin only)
  updateStatus: async (order_id, status) => {
    const [result] = await pool.query(
      `UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE order_id = ?`,
      [status, order_id]
    );
    return result.affectedRows;
  },

  // Delete order
  delete: async (order_id) => {
    const [result] = await pool.query(`DELETE FROM orders WHERE order_id = ?`, [order_id]);
    return result.affectedRows;
  },
};

module.exports = Orders;
