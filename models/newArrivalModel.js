const pool = require("../config/db");

const NewArrival = {
    getAll: async () => {
        const [rows] = await pool.query(`
            SELECT na.*, u.firstName as createdByUser, uu.firstName as updatedByUser
            FROM new_arrivals na
            LEFT JOIN users u ON na.created_by = u.user_id
            LEFT JOIN users uu ON na.updated_by = uu.user_id
            ORDER BY na.createdAt DESC
        `);
        return rows;
    },

    getById: async (arrival_id) => {
        const [rows] = await pool.query(`
            SELECT na.*, u.firstName as createdByUser, uu.firstName as updatedByUser
            FROM new_arrivals na
            LEFT JOIN users u ON na.created_by = u.user_id
            LEFT JOIN users uu ON na.updated_by = uu.user_id
            WHERE na.arrival_id = ?
        `, [arrival_id]);
        return rows[0];
    },

    create: async (data) => {
        const { user_id, product_name, product_category, image_url, created_by } = data;
        const [result] = await pool.query(
            `INSERT INTO new_arrivals (user_id, product_name, product_category, image_url, created_by) 
             VALUES (?, ?, ?, ?, ?)`,
            [user_id, product_name, product_category, image_url, created_by]
        );
        return result.insertId;
    },

    update: async (arrival_id, data) => {
        const { product_name, product_category, image_url, updated_by } = data;
        const [result] = await pool.query(
            `UPDATE new_arrivals 
             SET product_name=?, product_category=?, image_url=?, updated_by=? 
             WHERE arrival_id=?`,
            [product_name, product_category, image_url, updated_by, arrival_id]
        );
        return result.affectedRows;
    },

    delete: async (arrival_id) => {
        const [result] = await pool.query("DELETE FROM new_arrivals WHERE arrival_id=?", [arrival_id]);
        return result.affectedRows;
    }
};

module.exports = NewArrival;
