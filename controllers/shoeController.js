const Shoe = require("../models/shoeModel");

// Get all shoes
exports.getAllShoes = async (req, res) => {
  try {
    const shoes = await Shoe.getAll();
    res.json(shoes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching shoes", error });
  }
};

// Get shoe by ID
exports.getShoeById = async (req, res) => {
  try {
    const shoe = await Shoe.getById(req.params.shoes_id);
    if (!shoe) return res.status(404).json({ message: "Shoe not found" });
    res.json(shoe);
  } catch (error) {
    res.status(500).json({ message: "Error fetching shoe", error });
  }
};

// Get shoes by category
exports.getShoesByCategory = async (req, res) => {
  try {
    const shoes = await Shoe.getByCategory(req.params.category_id);
    res.json(shoes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching shoes by category", error });
  }
};

// Create new shoe
exports.createShoe = async (req, res) => {
  try {
    const userId = req.user.userId; // 👈 from token

    const newShoe = {
      ...req.body,
      user_id: userId
    };

    const shoeId = await Shoe.create(newShoe);
    res.status(201).json({ message: "Shoe created successfully", shoeId });
  } catch (error) {
    res.status(500).json({ message: "Error creating shoe", error });
  }
};

// Update shoe
exports.updateShoe = async (req, res) => {
  try {
    const userId = req.user.userId; // 👈 from token

    const updatedData = {
      ...req.body,
      user_id: userId
    };

    const updated = await Shoe.update(req.params.shoes_id, updatedData);
    if (!updated) return res.status(404).json({ message: "Shoe not found" });

    res.json({ message: "Shoe updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating shoe", error });
  }
};

// Delete shoe
exports.deleteShoe = async (req, res) => {
  try {
    const deleted = await Shoe.delete(req.params.shoes_id);
    if (!deleted) return res.status(404).json({ message: "Shoe not found" });

    res.json({ message: "Shoe deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting shoe", error });
  }
};
