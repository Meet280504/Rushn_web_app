const db = require("../config/db");

// ✅ Add sizes for a shoe+color
exports.addSizes = async (req, res) => {
  try {
    const { shoes_id, color_id, sizes } = req.body; 
    // sizes = { size_1: 1, size_2: 0, ... }

    const [result] = await db.query(
      `INSERT INTO sizes 
        (shoes_id, color_id, size_1, size_2, size_3, size_4, size_5, size_6, size_7, size_8)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        shoes_id,
        color_id,
        sizes.size_1 || 0,
        sizes.size_2 || 0,
        sizes.size_3 || 0,
        sizes.size_4 || 0,
        sizes.size_5 || 0,
        sizes.size_6 || 0,
        sizes.size_7 || 0,
        sizes.size_8 || 0,
      ]
    );

    res.json({ success: true, size_id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to add sizes" });
  }
};

// ✅ Get sizes for a shoe+color
exports.getSizes = async (req, res) => {
  try {
    const { shoes_id, color_id } = req.params;

    const [rows] = await db.query(
      `SELECT * FROM sizes WHERE shoes_id = ? AND color_id = ?`,
      [shoes_id, color_id]
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to fetch sizes" });
  }
};

// ✅ Update sizes
exports.updateSizes = async (req, res) => {
  try {
    const { size_id } = req.params;
    const { sizes } = req.body;

    const [result] = await db.query(
      `UPDATE sizes 
       SET size_1=?, size_2=?, size_3=?, size_4=?, size_5=?, size_6=?, size_7=?, size_8=?, updatedAt=NOW()
       WHERE size_id=?`,
      [
        sizes.size_1 || 0,
        sizes.size_2 || 0,
        sizes.size_3 || 0,
        sizes.size_4 || 0,
        sizes.size_5 || 0,
        sizes.size_6 || 0,
        sizes.size_7 || 0,
        sizes.size_8 || 0,
        size_id,
      ]
    );

    res.json({ success: result.affectedRows > 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to update sizes" });
  }
};

// ✅ Delete sizes
exports.deleteSizes = async (req, res) => {
  try {
    const { size_id } = req.params;

    const [result] = await db.query(`DELETE FROM sizes WHERE size_id=?`, [size_id]);

    res.json({ success: result.affectedRows > 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to delete sizes" });
  }
};
