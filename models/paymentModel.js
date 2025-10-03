const pool = require("../config/db");

const Payment = {
  // Get all payments (Admin view)
  getAll: async () => {
    const [rows] = await pool.query(`
      SELECT p.*, u.firstName AS user_name, u.email AS user_email, o.order_id AS related_order
      FROM payments p
      JOIN users u ON p.user_id = u.user_id
      JOIN orders o ON p.order_id = o.order_id
      JOIN payment_methods pm ON p.method_id = pm.method_id
    `);
    return rows;
  },

  // Get payment by payment_id
  getById: async (payment_id) => {
    const [rows] = await pool.query(
      `SELECT p.*, u.firstName AS user_name, u.email AS user_email, o.order_id AS related_order, pm.method_type AS payment_method
       FROM payments p
       JOIN users u ON p.user_id = u.user_id
       JOIN orders o ON p.order_id = o.order_id
       JOIN payment_methods pm ON p.method_id = pm.method_id
       WHERE p.payment_id = ?`,
      [payment_id]
    );
    return rows[0];
  },

  // Get all payments by user_id
  getByUserId: async (user_id) => {
    const [rows] = await pool.query(
      `SELECT p.*, o.order_id AS related_order, pm.method_type 
       FROM payments p
       JOIN orders o ON p.order_id = o.order_id
       JOIN payment_methods pm ON p.method_id = pm.method_id
       WHERE p.user_id = ?`,
      [user_id]
    );
    return rows;
  },

  // Create new payment
  create: async (data) => {
    const { user_id, order_id, method_id, amount, status, transaction_ref } = data;

    const [result] = await pool.query(
      `INSERT INTO payments (user_id, order_id, method_id, amount, status, transaction_ref) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [user_id, order_id, method_id, amount, status, transaction_ref]
    );

    return result.insertId;
  },

  // Update payment (status or transaction ref)
  update: async (payment_id, data) => {
    const { method_id, amount, status, transaction_ref } = data;

    const [result] = await pool.query(
      `UPDATE payments 
       SET method_id=?, amount=?, status=?, transaction_ref=?, updated_at = CURRENT_TIMESTAMP
       WHERE payment_id=?`,
      [method_id, amount, status, transaction_ref, payment_id]
    );

    return result.affectedRows;
  },

  // Delete payment
  delete: async (payment_id) => {
    const [result] = await pool.query("DELETE FROM payments WHERE payment_id = ?", [payment_id]);
    return result.affectedRows;
  },
};

module.exports = Payment;
