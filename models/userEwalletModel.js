const pool = require("../config/db");

const UserEwallet = {
    // Get all wallets for a user
    getByUserId: async (user_id) => {
        const [rows] = await pool.query(`
            SELECT ue.*, ep.name as provider_name, pm.name as method_name
            FROM user_ewallets ue
            JOIN ewallet_providers ep ON ue.provider_id = ep.provider_id
            JOIN payment_methods pm ON ue.method_id = pm.method_id
            WHERE ue.user_id = ?
            ORDER BY ue.created_at DESC
        `, [user_id]);
        return rows;
    },

    // Admin: Get all ewallets
    getAll: async () => {
        const [rows] = await pool.query(`
      SELECT ue.*, u.firstName, u.lastName, u.email, ep.name AS provider_name, pm.name AS method_name
      FROM user_ewallets ue
      JOIN users u ON ue.user_id = u.user_id
      JOIN ewallet_providers ep ON ue.provider_id = ep.provider_id
      JOIN payment_methods pm ON ue.method_id = pm.method_id
      ORDER BY ue.created_at DESC
    `);
        return rows;
    },

    // Get wallet by ID (for specific user, safe check)
    getById: async (user_ewallet_id, user_id) => {
        const [rows] = await pool.query(`
            SELECT ue.*, ep.name as provider_name, pm.name as method_name
            FROM user_ewallets ue
            JOIN ewallet_providers ep ON ue.provider_id = ep.provider_id
            JOIN payment_methods pm ON ue.method_id = pm.method_id
            WHERE ue.user_ewallet_id = ? AND ue.user_id = ?
        `, [user_ewallet_id, user_id]);
        return rows[0];
    },

    // Create new wallet
    create: async (data) => {
        const { user_id, provider_id, method_id, method_type, email, is_default } = data;

        if (is_default) {
            // reset other defaults
            await pool.query(
                `UPDATE user_ewallets SET is_default = FALSE WHERE user_id = ?`,
                [user_id]
            );
        }

        const [result] = await pool.query(
            `INSERT INTO user_ewallets 
             (user_id, provider_id, method_id, method_type, email, is_default) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [user_id, provider_id, method_id, method_type, email, is_default]
        );

        return result.insertId;
    },

    // Update wallet
    update: async (user_ewallet_id, user_id, data) => {
        const { provider_id, method_id, email, is_default } = data;

        if (is_default) {
            await pool.query(
                `UPDATE user_ewallets SET is_default = FALSE WHERE user_id = ?`,
                [user_id]
            );
        }

        const [result] = await pool.query(
            `UPDATE user_ewallets 
             SET provider_id=?, method_id=?, email=?, is_default=?, updated_at=CURRENT_TIMESTAMP
             WHERE user_ewallet_id=? AND user_id=?`,
            [provider_id, method_id, email, is_default, user_ewallet_id, user_id]
        );

        return result.affectedRows;
    },

    // Delete wallet
    delete: async (user_ewallet_id, user_id) => {
        const [result] = await pool.query(
            "DELETE FROM user_ewallets WHERE user_ewallet_id=? AND user_id=?",
            [user_ewallet_id, user_id]
        );
        return result.affectedRows;
    }
};

module.exports = UserEwallet;
