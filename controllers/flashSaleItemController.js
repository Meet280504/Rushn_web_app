const FlashSaleItem = require("../models/flashSaleItemModel");

// ✅ Create Flash Sale Item
const createFlashSaleItem = async (req, res) => {
  try {
    const { sale_id, shoes_id, discount, start_time, end_time, is_active } = req.body;

    // created_by from JWT token (middleware should set req.user)
    const created_by = req.user.userId;

    const result = await FlashSaleItem.createFlashSaleItem({
      sale_id,
      shoes_id,
      discount,
      start_time,
      end_time,
      is_active,
      created_by,
    });

    res.status(201).json({ message: "Flash Sale Item created successfully", sale_item_id: result.insertId });
  } catch (error) {
    console.error("Error creating flash sale item:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Get All Flash Sale Items
const getAllFlashSaleItems = async (req, res) => {
  try {
    const items = await FlashSaleItem.getAllFlashSaleItems();
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching flash sale items:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Get Flash Sale Item by ID
const getFlashSaleItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await FlashSaleItem.getFlashSaleItemById(id);

    if (!item) return res.status(404).json({ message: "Flash Sale Item not found" });

    res.status(200).json(item);
  } catch (error) {
    console.error("Error fetching flash sale item:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Get Active Flash Sale Items by Sale Title
const getActiveFlashSaleItems = async (req, res) => {
  try {
    const { saleTitle } = req.params; // e.g. "Last Chance Picks" or "Today’s Offer"
    const items = await FlashSaleItem.getActiveBySaleTitle(saleTitle);

    if (items.length === 0) {
      return res.status(200).json({ message: "No active offers available right now." });
    }

    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching active flash sale items:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Update Flash Sale Item
const updateFlashSaleItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { sale_id, shoes_id, discount, start_time, end_time, is_active } = req.body;

    // updated_by from JWT token
    const updated_by = req.user.user_id;

    const result = await FlashSaleItem.updateFlashSaleItem(id, {
      sale_id,
      shoes_id,
      discount,
      start_time,
      end_time,
      is_active,
      updated_by,
    });

    if (result.affectedRows === 0) return res.status(404).json({ message: "Flash Sale Item not found" });

    res.status(200).json({ message: "Flash Sale Item updated successfully" });
  } catch (error) {
    console.error("Error updating flash sale item:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Delete Flash Sale Item
const deleteFlashSaleItem = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await FlashSaleItem.deleteFlashSaleItem(id);

    if (result.affectedRows === 0) return res.status(404).json({ message: "Flash Sale Item not found" });

    res.status(200).json({ message: "Flash Sale Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting flash sale item:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  createFlashSaleItem,
  getAllFlashSaleItems,
  getFlashSaleItemById,
  getActiveFlashSaleItems,
  updateFlashSaleItem,
  deleteFlashSaleItem,
};