const pool = require("../config/db");

const Sizes = {
  // Get all sizes
  getAll: async () => {
    const [rows] = await pool.query("SELECT * FROM sizes");
    return rows;
  },

  // Get size record by size_id
  getById: async (size_id) => {
    const [rows] = await pool.query("SELECT * FROM sizes WHERE size_id = ?", [size_id]);
    return rows[0];
  },

  // Get size records by shoes_id
  getByShoesId: async (shoes_id) => {
    const [rows] = await pool.query("SELECT * FROM sizes WHERE shoes_id = ?", [shoes_id]);
    return rows;
  },

  // Get size records by shoes_id + color_id
  getByShoesAndColor: async (shoes_id, color_id) => {
    const [rows] = await pool.query(
      "SELECT * FROM sizes WHERE shoes_id = ? AND color_id = ?",
      [shoes_id, color_id]
    );
    return rows;
  },

  // Create new sizes record
  create: async (data) => {
    const {
      shoes_id,
      color_id,
      size_1,
      size_2,
      size_3,
      size_4,
      size_5,
      size_6,
      size_7,
      size_8,
    } = data;

    const [result] = await pool.query(
      `INSERT INTO sizes 
        (shoes_id, color_id, size_1, size_2, size_3, size_4, size_5, size_6, size_7, size_8)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [shoes_id, color_id, size_1, size_2, size_3, size_4, size_5, size_6, size_7, size_8]
    );
    return result.insertId;
  },

  // Update sizes by size_id
  update: async (size_id, data) => {
    const {
      size_1,
      size_2,
      size_3,
      size_4,
      size_5,
      size_6,
      size_7,
      size_8,
    } = data;

    const [result] = await pool.query(
      `UPDATE sizes 
       SET size_1=?, size_2=?, size_3=?, size_4=?, size_5=?, size_6=?, size_7=?, size_8=?,
           updatedAt = CURRENT_TIMESTAMP
       WHERE size_id=?`,
      [size_1, size_2, size_3, size_4, size_5, size_6, size_7, size_8, size_id]
    );
    return result.affectedRows;
  },

  // Delete size record by size_id
  delete: async (size_id) => {
    const [result] = await pool.query("DELETE FROM sizes WHERE size_id = ?", [size_id]);
    return result.affectedRows;
  },
};

module.exports = Sizes;
