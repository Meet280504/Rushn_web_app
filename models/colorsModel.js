const pool = require("../config/db");

const Colors = {
  // 🔹 Get all colors
  getAll: async () => {
    const [rows] = await pool.query("SELECT * FROM shoes_colors");
    return rows;
  },

  // 🔹 Get color by ID
  getById: async (color_id) => {
    const [rows] = await pool.query(
      "SELECT * FROM shoes_colors WHERE color_id = ?",
      [color_id]
    );
    return rows[0];
  },

  // 🔹 Get all colors for a shoe
  getByShoeId: async (shoes_id) => {
    const [rows] = await pool.query(
      "SELECT * FROM shoes_colors WHERE shoes_id = ?",
      [shoes_id]
    );
    return rows;
  },

  // 🔹 Create new color
  create: async (data) => {
    const { shoes_id, color_name, color_code, image_url } = data;
    const [result] = await pool.query(
      `INSERT INTO shoes_colors (shoes_id, color_name, color_code, image_url)
       VALUES (?, ?, ?, ?)`,
      [shoes_id, color_name, color_code, image_url]
    );
    return result.insertId;
  },

  // 🔹 Update color
  update: async (color_id, data) => {
    const { color_name, color_code, image_url } = data;
    const [result] = await pool.query(
      `UPDATE shoes_colors
       SET color_name=?, color_code=?, image_url=?
       WHERE color_id=?`,
      [color_name, color_code, image_url, color_id]
    );
    return result.affectedRows;
  },

  // 🔹 Delete color
  delete: async (color_id) => {
    const [result] = await pool.query(
      "DELETE FROM shoes_colors WHERE color_id=?",
      [color_id]
    );
    return result.affectedRows;
  },
};

module.exports = Colors;
