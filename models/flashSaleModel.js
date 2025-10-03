const pool = require("../config/db");

const FlashSale = {
    getAll: async () => {
        const [rows] = await pool.query(`
            SELECT fs.*, u.firstName as createdByUser, uu.firstName as updatedByUser
            FROM flash_sale fs
            LEFT JOIN users u ON fs.created_by = u.user_id
            LEFT JOIN users uu ON fs.updated_by = uu.user_id
            ORDER BY fs.createdAt DESC
        `);
        return rows;
    },

    getById: async (sale_id) => {
        const [rows] = await pool.query(`
            SELECT fs.*, u.firstName as createdByUser, uu.firstName as updatedByUser
            FROM flash_sale fs
            LEFT JOIN users u ON fs.created_by = u.user_id
            LEFT JOIN users uu ON fs.updated_by = uu.user_id
            WHERE fs.sale_id = ?
        `, [sale_id]);
        return rows[0];
    },

    create: async (data) => {
        const { user_id, sale_title, created_by } = data;
        const [result] = await pool.query(
            `INSERT INTO flash_sale (user_id, sale_title, created_by) 
             VALUES (?, ?, ?)`,
            [user_id, sale_title, created_by]
        );
        return result.insertId;
    },

    update: async (sale_id, data) => {
        const { sale_title, updated_by } = data;
        const [result] = await pool.query(
            `UPDATE flash_sale 
             SET sale_title=?, updated_by=? 
             WHERE sale_id=?`,
            [sale_title, updated_by, sale_id]
        );
        return result.affectedRows;
    },

    delete: async (sale_id) => {
        const [result] = await pool.query("DELETE FROM flash_sale WHERE sale_id=?", [sale_id]);
        return result.affectedRows;
    }
};

module.exports = FlashSale;
