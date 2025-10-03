const pool = require("../config/db");

const Bank = {
    // Get all banks
    getAll: async () => {
        const [rows] = await pool.query(`
            SELECT b.*, pm.name as paymentMethodName, u.firstName as createdByUser
            FROM banks b
            LEFT JOIN payment_methods pm ON b.method_id = pm.method_id
            LEFT JOIN users u ON b.created_by = u.user_id
            ORDER BY b.created_at DESC
        `);
        return rows;
    },

    // Get bank by ID
    getById: async (bank_id) => {
        const [rows] = await pool.query(`
            SELECT b.*, pm.name as paymentMethodName, u.firstName as createdByUser
            FROM banks b
            LEFT JOIN payment_methods pm ON b.method_id = pm.method_id
            LEFT JOIN users u ON b.created_by = u.user_id
            WHERE b.bank_id = ?
        `, [bank_id]);
        return rows[0];
    },

    // Create bank
    create: async (data) => {
        const { method_id, name, is_active, created_by } = data;
        const [result] = await pool.query(
            `INSERT INTO banks (method_id, name, is_active, created_by) VALUES (?, ?, ?, ?)`,
            [method_id, name, is_active, created_by]
        );
        return result.insertId;
    },

    // Update bank
    // update: async (bank_id, data) => {
    //     const { method_id, name, is_active } = data;
    //     const [result] = await pool.query(
    //         `UPDATE banks SET method_id=?, name=?, is_active=? WHERE bank_id=?`,
    //         [method_id, name, is_active, bank_id]
    //     );
    //     return result.affectedRows;
    // },

    // Delete bank
    delete: async (bank_id) => {
        const [result] = await pool.query(`DELETE FROM banks WHERE bank_id=?`, [bank_id]);
        return result.affectedRows;
    }
};

module.exports = Bank;
