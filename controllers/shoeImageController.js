const ShoesImage = require("../models/shoeImageModel");

exports.getAllShoesImages = async (req, res) => {
  try {
    const images = await ShoesImage.getAll();
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getShoesImageById = async (req, res) => {
  try {
    const image = await ShoesImage.getById(req.params.id);
    if (!image) return res.status(404).json({ message: "Shoe image not found" });
    res.json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getShoesImagesByShoesId = async (req, res) => {
  try {
    const images = await ShoesImage.getByShoesId(req.params.shoes_id);
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createShoesImage = async (req, res) => {
  try {
    // user_id comes from authMiddleware after verifying token
    const created_by = req.user.userId;
    const { shoes_id, extra_image } = req.body;

    const newImage = await ShoesImage.create({
      shoes_id,
      extra_image,
      created_by,
    });

    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateShoesImage = async (req, res) => {
  try {
    const { shoes_id, extra_image } = req.body;
    const updated = await ShoesImage.update(req.params.id, { shoes_id, extra_image });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteShoesImage = async (req, res) => {
  try {
    const deleted = await ShoesImage.delete(req.params.id);
    res.json(deleted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
