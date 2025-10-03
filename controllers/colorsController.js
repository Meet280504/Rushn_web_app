const Colors = require("../models/colorsModel");

// 🔹 Get all colors
exports.getColor = async (req, res) => {
  try {
    const colors = await Colors.getAll();
    res.status(200).json({ success: true, data: colors });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching colors", error: error.message });
  }
};

// 🔹 Get color by ID
exports.getColorById = async (req, res) => {
  try {
    const { color_id } = req.params;
    const color = await Colors.getById(color_id);

    if (!color) {
      return res.status(404).json({ success: false, message: "Color not found" });
    }

    res.status(200).json({ success: true, data: color });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching color", error: error.message });
  }
};

// 🔹 Get all colors for a shoe
exports.getColorsByShoes = async (req, res) => {
  try {
    const { shoes_id } = req.params;
    const colors = await Colors.getByShoeId(shoes_id);

    if (!colors || colors.length === 0) {
      return res.status(404).json({ success: false, message: "No colors found for this shoe" });
    }

    res.status(200).json({ success: true, data: colors });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching shoe colors", error: error.message });
  }
};

// 🔹 Create new color
exports.createColor = async (req, res) => {
  try {
    const { shoes_id, color_name, color_code, image_url } = req.body;

    if (!shoes_id || !color_name || !image_url) {
      return res.status(400).json({ success: false, message: "shoes_id, color_name and image_url are required" });
    }

    const colorId = await Colors.create({ shoes_id, color_name, color_code, image_url });

    res.status(201).json({ success: true, message: "Color added successfully", color_id: colorId });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding color", error: error.message });
  }
};

// 🔹 Update color
exports.updateColor = async (req, res) => {
  try {
    const { color_id } = req.params;
    const { color_name, color_code, image_url } = req.body;

    const updated = await Colors.update(color_id, { color_name, color_code, image_url });

    if (updated === 0) {
      return res.status(404).json({ success: false, message: "Color not found or not updated" });
    }

    res.status(200).json({ success: true, message: "Color updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating color", error: error.message });
  }
};

// 🔹 Delete color
exports.deleteColor = async (req, res) => {
  try {
    const { color_id } = req.params;
    const deleted = await Colors.delete(color_id);

    if (deleted === 0) {
      return res.status(404).json({ success: false, message: "Color not found" });
    }

    res.status(200).json({ success: true, message: "Color deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting color", error: error.message });
  }
};
