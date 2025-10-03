const pool = require("../config/db");

const UserVirtualAccount = {
    // Get all VAs for a logged-in user
    getAllByUser: async (user_id) => {
        const [rows] = await pool.query(
            `SELECT va.*, b.name AS bank_name, pm.method_type
             FROM user_virtual_accounts va
             LEFT JOIN banks b ON va.bank_id = b.bank_id
             LEFT JOIN payment_methods pm ON va.method_id = pm.method_id
             WHERE va.user_id = ?
             ORDER BY va.created_at DESC`,
            [user_id]
        );
        return rows;
    },

    // Get all VAs (Admin only)
    getAllForAdmin: async () => {
        const [rows] = await pool.query(
            `SELECT va.*, b.name AS bank_name, pm.method_type,
                    u.firstName, u.lastName, u.email
             FROM user_virtual_accounts va
             LEFT JOIN banks b ON va.bank_id = b.bank_id
             LEFT JOIN users u ON va.user_id = u.user_id
             LEFT JOIN payment_methods pm ON va.method_id = pm.method_id
             ORDER BY va.created_at DESC`
        );
        return rows;
    },

    // Get VA by ID for logged-in user
    getById: async (id, user_id) => {
        const [rows] = await pool.query(
            `SELECT va.*, b.name AS bank_name, pm.method_type
             FROM user_virtual_accounts va
             LEFT JOIN banks b ON va.bank_id = b.bank_id
             LEFT JOIN payment_methods pm ON va.method_id = pm.method_id
             WHERE va.virtual_account_id = ? AND va.user_id = ?`,
            [id, user_id]
        );
        return rows[0];
    },

    // Create VA
    create: async (data) => {
        const { user_id, bank_id, method_id, account_number, account_label, is_default } = data;
        const [result] = await pool.query(
            `INSERT INTO user_virtual_accounts (user_id, bank_id, method_id, account_number, account_label, is_default) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [user_id, bank_id, method_id, account_number, account_label, is_default || false]
        );
        return result.insertId;
    },

    // Update VA
    update: async (id, user_id, data) => {
        const { account_label, is_default } = data;
        const [result] = await pool.query(
            `UPDATE user_virtual_accounts 
             SET account_label=?, is_default=? 
             WHERE virtual_account_id=? AND user_id=?`,
            [account_label, is_default, id, user_id]
        );
        return result.affectedRows;
    },

    // Delete VA
    delete: async (id, user_id) => {
        const [result] = await pool.query(
            `DELETE FROM user_virtual_accounts WHERE virtual_account_id=? AND user_id=?`,
            [id, user_id]
        );
        return result.affectedRows;
    }
};

module.exports = UserVirtualAccount;
