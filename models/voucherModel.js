const pool = require("../config/db");

const Voucher = {
    getAll: async () => {
        const [rows] = await pool.query(`
            SELECT v.*, u.firstName AS createdByUser
            FROM vouchers v
            LEFT JOIN users u ON v.created_by = u.user_id
            ORDER BY v.created_at DESC
        `);
        return rows;
    },

    getById: async (voucher_id) => {
        const [rows] = await pool.query(`
            SELECT v.*, u.firstName AS createdByUser
            FROM vouchers v
            LEFT JOIN users u ON v.created_by = u.user_id
            WHERE v.voucher_id = ?
        `, [voucher_id]);
        return rows[0];
    },

    create: async (data) => {
        const {
            title, code, description, discount_type, discount_value,
            min_purchase, applicable_items, first_purchase_only,
            start_date, end_date, is_active, created_by
        } = data;

        const [result] = await pool.query(
            `INSERT INTO vouchers 
            (title, code, description, discount_type, discount_value, min_purchase, applicable_items, first_purchase_only, start_date, end_date, is_active, created_by)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                title, code, description, discount_type, discount_value,
                min_purchase, applicable_items ? JSON.stringify(applicable_items) : null,
                first_purchase_only, start_date, end_date, is_active, created_by
            ]
        );
        return result.insertId;
    },

    update: async (voucher_id, data) => {
        const {
            title, code, description, discount_type, discount_value,
            min_purchase, applicable_items, first_purchase_only,
            start_date, end_date, is_active, updated_by
        } = data;

        const [result] = await pool.query(
            `UPDATE vouchers
             SET title=?, code=?, description=?, discount_type=?, discount_value=?, min_purchase=?, applicable_items=?, first_purchase_only=?, start_date=?, end_date=?, is_active=?, updated_at=NOW()
             WHERE voucher_id=?`,
            [
                title, code, description, discount_type, discount_value,
                min_purchase, applicable_items ? JSON.stringify(applicable_items) : null,
                first_purchase_only, start_date, end_date, is_active, voucher_id
            ]
        );
        return result.affectedRows;
    },

    delete: async (voucher_id) => {
        const [result] = await pool.query("DELETE FROM vouchers WHERE voucher_id=?", [voucher_id]);
        return result.affectedRows;
    },

    getActive: async () => {
        const today = new Date().toISOString().split("T")[0];
        const [rows] = await pool.query(`
            SELECT * FROM vouchers 
            WHERE is_active=1 
            AND start_date <= ? 
            AND end_date >= ? 
            ORDER BY start_date ASC
        `, [today, today]);
        return rows;
    },

    getByCode: async (code) => {
        const today = new Date().toISOString().split("T")[0];
        const [rows] = await pool.query(`
            SELECT * FROM vouchers 
            WHERE code = ? 
              AND is_active=1 
              AND start_date <= ? 
              AND end_date >= ?
            LIMIT 1
        `, [code, today, today]);
        return rows[0];
    }
};

module.exports = Voucher;
