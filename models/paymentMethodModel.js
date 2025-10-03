const pool = require("../config/db");

const PaymentMethod = {
    // Get all payment methods
    getAll: async () => {
        const [rows] = await pool.query(`
            SELECT pm.*, u.firstName as createdByUser
            FROM payment_methods pm
            LEFT JOIN users u ON pm.created_by = u.user_id
            ORDER BY pm.created_at DESC
        `);
        return rows;
    },

    // Get by ID
    getById: async (method_id) => {
        const [rows] = await pool.query(`
            SELECT pm.*, u.firstName as createdByUser
            FROM payment_methods pm
            LEFT JOIN users u ON pm.created_by = u.user_id
            WHERE pm.method_id = ?
        `, [method_id]);
        return rows[0];
    },

    // Create
    create: async (data) => {
        const { name, description, icon_url, method_type, is_active, created_by } = data;
        const [result] = await pool.query(
            `INSERT INTO payment_methods (name, description, icon_url, method_type, is_active, created_by) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [name, description, icon_url, method_type, is_active, created_by]
        );
        return result.insertId;
    },

    // Update
    update: async (method_id, data) => {
        const { name, description, icon_url, method_type, is_active } = data;
        const [result] = await pool.query(
            `UPDATE payment_methods 
             SET name=?, description=?, icon_url=?, method_type=?, is_active=?
             WHERE method_id=?`,
            [name, description, icon_url, method_type, is_active, method_id]
        );
        return result.affectedRows;
    },

    // Delete
    delete: async (method_id) => {
        const [result] = await pool.query("DELETE FROM payment_methods WHERE method_id=?", [method_id]);
        return result.affectedRows;
    }
};

module.exports = PaymentMethod;
