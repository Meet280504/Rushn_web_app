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
    // console.log("req.body:", req.body);
    // console.log("req.file:", req.file);

    const userId = req.user.userId; // 👈 from token
    const { category_id, brand_name, brand_logo, shoe_name, shoe_description, original_price, price, discount } = req.body;

    // Use uploaded file if exists
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    const newShoe = {
      category_id,
      brand_name,
      brand_logo,
      shoe_name,
      shoe_description,
      original_price,
      price,
      discount: discount || 0,
      image_url,
      user_id: userId
    };
    // const newShoe = {
    //   ...req.body,
    //   user_id: userId
    // };

    const shoeId = await Shoe.create(newShoe);
    res.status(201).json({ message: "Shoe created successfully", shoeId });
  } catch (error) {
    console.error("Shoe creation error:", error);
    res.status(500).json({ message: "Error creating shoe", error: error.message });// Send error message for better debugging
  }
};

// Update shoe
exports.updateShoe = async (req, res) => {
  try {
    const userId = req.user.userId; // 👈 from 

    // Extract data from req.body
    const {
      category_id,
      brand_name,
      brand_logo,
      shoe_name,
      shoe_description,
      original_price,
      price,
      discount
    } = req.body;

    // Use new uploaded image OR fallback to existing image_url
    const image_url = req.file ? `/uploads/${req.file.filename}` : req.body.image_url;

    const updatedData = {
      category_id,
      brand_name,
      brand_logo,
      shoe_name,
      shoe_description,
      original_price,
      price,
      discount: discount || 0,
      image_url,
      user_id: userId,
      // shoes_id: req.params.shoes_id,
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
