// // controllers/recentlyViewedController.js
// const db = require("../config/db"); // your mysql2/promise connection

// // Add or update recently viewed
// const addRecentlyViewed = async (req, res) => {
//   const { user_id, shoes_id } = req.body;

//   if (!user_id || !shoes_id) {
//     return res.status(400).json({ error: "user_id and shoes_id are required" });
//   }

//   try {
//     // Insert or update viewed_at
//     await db.execute(
//       `INSERT INTO recently_viewed (user_id, shoes_id, viewed_at)
//        VALUES (?, ?, NOW())
//        ON DUPLICATE KEY UPDATE viewed_at = NOW()`,
//       [user_id, shoes_id]
//     );

//     // Count how many times this user viewed this shoe
//     const [rows] = await db.execute(
//       `SELECT view_id FROM recently_viewed 
//        WHERE user_id = ? AND shoes_id = ?
//        ORDER BY viewed_at ASC`,
//       [user_id, shoes_id]
//     );

//     if (rows.length >= 3) {
//       // Delete the "second oldest" record
//       const secondId = rows[1].view_id; // since ordered ASC
//       await db.execute(`DELETE FROM recently_viewed WHERE view_id = ?`, [
//         secondId,
//       ]);
//     }

//     res.json({ message: "Recently viewed updated successfully" });
//   } catch (error) {
//     console.error("Error in addRecentlyViewed:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// module.exports = { addRecentlyViewed };



const RecentlyViewed = require("../models/recentlyViewedModel");

// Get all recently viewed
const getAll = async (req, res) => {
  try {
    const data = await RecentlyViewed.getAll();
    res.json(data);
  } catch (err) {
    console.error("Error fetching recently viewed:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get recently viewed by user_id
const getByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const data = await RecentlyViewed.getByUserId(user_id);
    res.json(data);
  } catch (err) {
    console.error("Error fetching user recently viewed:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Add or update recently viewed
const addOrUpdate = async (req, res) => {
  try {
    const { user_id, shoes_id } = req.body;
    if (!user_id || !shoes_id) {
      return res.status(400).json({ error: "user_id and shoes_id are required" });
    }

    const result = await RecentlyViewed.addOrUpdate(user_id, shoes_id);
    res.json(result);
  } catch (err) {
    console.error("Error adding/updating recently viewed:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete recently viewed by view_id
const deleteById = async (req, res) => {
  try {
    const { view_id } = req.params;
    const affected = await RecentlyViewed.delete(view_id);
    if (affected === 0) {
      return res.status(404).json({ error: "Not Found" });
    }
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Error deleting recently viewed:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAll,
  getByUserId,
  addOrUpdate,
  deleteById,
};
