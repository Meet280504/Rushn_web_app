// const db = require("../config/db");

// const categoryModel = {
//   // Create category
//   createCategory: async (category_name, icon, user_id, created_by) => {
//     const [rows] = await db.query(
//       `INSERT INTO categories (category_name, icon, user_id, created_by)
//        VALUES (?, ?, ?, ?)`,
//       [category_name, icon, user_id, created_by]
//     );
//     return { category_id: rows.insertId, category_name, icon };
//   },

//   // Get all categories
//   getAllCategories: async () => {
//     const [rows] = await db.query("SELECT * FROM categories");
//     return rows;
//   },

//   // Get category by ID
//   getCategoryById: async (category_id) => {
//     const [rows] = await db.query(
//       "SELECT * FROM categories WHERE category_id = ?",
//       [category_id]
//     );
//     return rows[0];
//   },

//   // Update category
//   updateCategory: async (category_id, category_name, icon, updated_by) => {
//     const [result] = await db.query(
//       `UPDATE categories 
//        SET category_name = ?, icon = ?, updated_by = ?
//        WHERE category_id = ?`,
//       [category_name, icon, updated_by, category_id]
//     );
//     return result.affectedRows > 0;
//   },

//   // Delete category
//   deleteCategory: async (category_id) => {
//     const [result] = await db.query(
//       "DELETE FROM categories WHERE category_id = ?",
//       [category_id]
//     );
//     return result.affectedRows > 0;
//   },
// };

// module.exports = categoryModel;
const db = require("../config/db");

const categoryModel = {
  // Create category
  createCategory: async (category_name, icon, user_id, created_by) => {
    const [result] = await db.query(
      `INSERT INTO categories (category_name, icon, user_id, created_by)
       VALUES (?, ?, ?, ?)`,
      [category_name, icon || null, user_id, created_by]
    );

    // Fetch the inserted row
    const [rows] = await db.query(
      "SELECT * FROM categories WHERE category_id = ?",
      [result.insertId]
    );

    return rows[0]; // return the full category object
  },

  // Get all categories
  getAllCategories: async () => {
    const [rows] = await db.query("SELECT * FROM categories ORDER BY category_id DESC");
    return rows;
  },

  // Get category by ID
  getCategoryById: async (category_id) => {
    const [rows] = await db.query(
      "SELECT * FROM categories WHERE category_id = ?",
      [category_id]
    );
    return rows[0];
  },

  // Update category
  updateCategory: async (category_id, category_name, icon, updated_by) => {
    const [result] = await db.query(
      `UPDATE categories 
       SET category_name = ?, icon = ?, updated_by = ?
       WHERE category_id = ?`,
      [category_name, icon || null, updated_by, category_id]
    );
    return result.affectedRows > 0;
  },

  // Delete category
  deleteCategory: async (category_id) => {
    const [result] = await db.query(
      "DELETE FROM categories WHERE category_id = ?",
      [category_id]
    );
    return result.affectedRows > 0;
  },
};

module.exports = categoryModel;
