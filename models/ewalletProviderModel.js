const pool = require("../config/db");

const EwalletProvider = {
    // Get all providers
    getAll: async () => {
        const [rows] = await pool.query(`
            SELECT ep.*, u.firstName as createdByUser
            FROM ewallet_providers ep
            LEFT JOIN users u ON ep.created_by = u.user_id
            ORDER BY ep.created_at DESC
        `);
        return rows;
    },

    // Get provider by ID
    getById: async (provider_id) => {
        const [rows] = await pool.query(`
            SELECT ep.*, u.firstName as createdByUser
            FROM ewallet_providers ep
            LEFT JOIN users u ON ep.created_by = u.user_id
            WHERE ep.provider_id = ?
        `, [provider_id]);
        return rows[0];
    },

    // Create provider
    create: async (data) => {
        const { method_id, name, method_type, is_active, created_by } = data;
        const [result] = await pool.query(
            `INSERT INTO ewallet_providers (method_id, name, method_type, is_active, created_by) 
             VALUES (?, ?, ?, ?, ?)`,
            [method_id, name, method_type, is_active, created_by]
        );
        return result.insertId;
    },

    // Update provider
    update: async (provider_id, data) => {
        const { name, is_active } = data;
        const [result] = await pool.query(
            `UPDATE ewallet_providers 
             SET name=?, is_active=?, updated_at=CURRENT_TIMESTAMP 
             WHERE provider_id=?`,
            [name, is_active, provider_id]
        );
        return result.affectedRows;
    },

    // Delete provider
    delete: async (provider_id) => {
        const [result] = await pool.query(
            "DELETE FROM ewallet_providers WHERE provider_id=?",
            [provider_id]
        );
        return result.affectedRows;
    }
};

module.exports = EwalletProvider;
