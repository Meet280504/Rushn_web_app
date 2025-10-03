const pool = require("../config/db");

const CreditDebitCard = {
    // Get all cards for logged-in user
    getAllByUser: async (user_id) => {
        const [rows] = await pool.query(
            `SELECT * FROM credit_debit_card WHERE user_id = ? ORDER BY created_at DESC`,
            [user_id]
        );
        return rows;
    },

    // Get card by ID
    getById: async (id, user_id) => {
        const [rows] = await pool.query(
            `SELECT * FROM credit_debit_card WHERE card_id = ? AND user_id = ?`,
            [id, user_id]
        );
        return rows[0];
    },

    // Create card
    create: async (data) => {
        const {
            user_id,
            method_id,
            method_type,
            card_number,
            cardholder_name,
            expiry_date,
            security_code,
            billing_address,
            is_default
        } = data;

        const [result] = await pool.query(
            `INSERT INTO credit_debit_card 
             (user_id, method_id, method_type, card_number, cardholder_name, expiry_date, security_code, billing_address, is_default) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                user_id,
                method_id,
                method_type,
                card_number,
                cardholder_name,
                expiry_date,
                security_code,
                billing_address,
                is_default || false
            ]
        );
        return result.insertId;
    },

    // Update card
    update: async (id, user_id, data) => {
        const { cardholder_name, expiry_date, billing_address, is_default } = data;
        const [result] = await pool.query(
            `UPDATE credit_debit_card 
             SET cardholder_name=?, expiry_date=?, billing_address=?, is_default=? 
             WHERE card_id=? AND user_id=?`,
            [cardholder_name, expiry_date, billing_address, is_default, id, user_id]
        );
        return result.affectedRows;
    },

    // Delete card
    delete: async (id, user_id) => {
        const [result] = await pool.query(
            `DELETE FROM credit_debit_card WHERE card_id=? AND user_id=?`,
            [id, user_id]
        );
        return result.affectedRows;
    }
};

module.exports = CreditDebitCard;
