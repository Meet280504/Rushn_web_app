const pool = require("../config/db");

const RecentlyViewed = {
  // Get all recently viewed
  getAll: async () => {
    const [rows] = await pool.query("SELECT * FROM recently_viewed ORDER BY viewed_at DESC");
    return rows;
  },

  // Get recently viewed by user_id
  getByUserId: async (user_id) => {
    const [rows] = await pool.query(
      "SELECT * FROM recently_viewed WHERE user_id = ? ORDER BY viewed_at DESC",
      [user_id]
    );
    return rows;
  },

  // Add or update a recently viewed shoe
  addOrUpdate: async (user_id, shoes_id) => {
    // Always insert a new view record for history tracking
    await pool.query(
      `INSERT INTO recently_viewed (user_id, shoes_id, viewed_at)
       VALUES (?, ?, NOW())`,
      [user_id, shoes_id]
    );

    // Fetch all views for this user+shoe
    const [rows] = await pool.query(
      `SELECT * FROM recently_viewed 
       WHERE user_id = ? AND shoes_id = ?
       ORDER BY viewed_at ASC`,
      [user_id, shoes_id]
    );

    // If 3 or more records for this shoe, delete the second-oldest
    if (rows.length >= 3) {
      const secondId = rows[1].view_id; // ordered ASC: [oldest, secondOldest, ..., newest]
      await pool.query("DELETE FROM recently_viewed WHERE view_id = ?", [secondId]);
    }

    return { message: "Recently viewed updated", shoes_id, user_id };
  },

  // Delete by view_id
  delete: async (view_id) => {
    const [result] = await pool.query("DELETE FROM recently_viewed WHERE view_id = ?", [view_id]);
    return result.affectedRows;
  }
};

module.exports = RecentlyViewed;
