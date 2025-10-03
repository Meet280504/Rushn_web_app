const pool = require("../config/db");

const ShoesImage = {
  // Get all shoe images
  getAll: async () => {
    const [rows] = await pool.query(
      `SELECT si.*, s.shoe_name, u.firstName AS created_by_name, u.email AS created_by_email
       FROM shoes_image si
       JOIN shoes s ON si.shoes_id = s.shoes_id
       JOIN users u ON si.created_by = u.user_id`
    );
    return rows;
  },

  // Get by ID
  getById: async (shoes_image_id) => {
    const [rows] = await pool.query(
      `SELECT si.*, s.shoe_name, u.firstName AS created_by_name, u.email AS created_by_email
       FROM shoes_image si
       JOIN shoes s ON si.shoes_id = s.shoes_id
       JOIN users u ON si.created_by = u.user_id
       WHERE si.shoes_image_id = ?`,
      [shoes_image_id]
    );
    return rows[0];
  },

  // Get all images for a specific shoe
  getByShoesId: async (shoes_id) => {
    const [rows] = await pool.query(
      `SELECT si.*, s.shoe_name, u.firstName AS created_by_name, u.email AS created_by_email
       FROM shoes_image si
       JOIN shoes s ON si.shoes_id = s.shoes_id
       JOIN users u ON si.created_by = u.user_id
       WHERE si.shoes_id = ?`,
      [shoes_id]
    );
    return rows;
  },

  // Create new shoe image
  create: async (data) => {
    const { shoes_id, extra_image, created_by } = data;
    const [result] = await pool.query(
      `INSERT INTO shoes_image (shoes_id, extra_image, created_by)
       VALUES (?, ?, ?)`,
      [shoes_id, extra_image, created_by]
    );
    return { id: result.insertId, ...data };
  },

  // Update shoe image
  update: async (shoes_image_id, data) => {
    const { shoes_id, extra_image } = data;
    await pool.query(
      `UPDATE shoes_image SET shoes_id = ?, extra_image = ? WHERE shoes_image_id = ?`,
      [shoes_id, extra_image, shoes_image_id]
    );
    return { shoes_image_id, ...data };
  },

  // Delete shoe image
  delete: async (shoes_image_id) => {
    await pool.query(`DELETE FROM shoes_image WHERE shoes_image_id = ?`, [shoes_image_id]);
    return { message: "Shoe image deleted successfully" };
  },
};

module.exports = ShoesImage;
