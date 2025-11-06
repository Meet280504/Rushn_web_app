const pool = require("../config/db");

const Shoe = {
  getAll: async () => {
    const [rows] = await pool.query(`
      SELECT s.*, c.category_name AS category
      FROM shoes s
      JOIN categories c ON s.category_id = c.category_id
    `);
    return rows;
  },

  getById: async (shoes_id) => {
    const [rows] = await pool.query("SELECT * FROM shoes WHERE shoes_id = ?", [shoes_id]);
    return rows[0];
  },

  getByCategory: async (category_id) => {
    const [rows] = await pool.query("SELECT * FROM shoes WHERE category_id = ?", [category_id]);
    return rows;
  },

  create: async (data) => {
    const {
      category_id,
      brand_name,
      brand_logo,
      shoe_name,
      shoe_description,
      original_price,
      price,
      discount = 0,
      image_url,
      user_id
    } = data;

    // Basic validation
    if (!category_id || !shoe_name || !original_price || !price) {
      throw new Error("Missing required fields");
    }

    const [result] = await pool.query(
      `INSERT INTO shoes 
       (category_id, user_id, brand_name, brand_logo, shoe_name, shoe_description, original_price, price, discount, image_url, created_by, updated_by) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        Number(category_id),
        Number(user_id),
        brand_name || null,
        brand_logo || null,
        shoe_name,
        shoe_description || null,
        Number(original_price),
        Number(price),
        Number(discount),
        image_url || null,
        Number(user_id), // created_by
        Number(user_id)  // updated_by
      ]
    );
    return result.insertId;
  },

  update: async (shoes_id, data) => {
    const {
      category_id,
      brand_name,
      brand_logo,
      shoe_name,
      shoe_description,
      original_price,
      price,
      discount,
      image_url,
      user_id
    } = data;

    const [result] = await pool.query(
      `UPDATE shoes 
       SET category_id=?, brand_name=?, brand_logo=?, shoe_name=?, shoe_description=?, original_price=?, price=?, discount=?, image_url=?, updated_by=? 
       WHERE shoes_id=?`,
      [
        Number(category_id),
        brand_name,
        brand_logo,
        shoe_name,
        shoe_description,
        Number(original_price),
        Number(price),
        Number(discount),
        image_url || null,
        Number(user_id), // updated_by (from token)
        Number(shoes_id)
      ]
    );
    return result.affectedRows;
  },

  delete: async (shoes_id) => {
    const [result] = await pool.query("DELETE FROM shoes WHERE shoes_id = ?", [shoes_id]);
    return result.affectedRows;
  }
};

module.exports = Shoe;
