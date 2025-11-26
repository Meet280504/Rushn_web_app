const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const shoeController = require("../controllers/shoeController");
const { checkTokenExpiry, checkTokenRole } = require("../middleware/authMiddleware");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Public
router.get("/shoes", shoeController.getAllShoes);
router.get("/shoes/:shoes_id", shoeController.getShoeById);
router.get("/shoes/category/:category_id", shoeController.getShoesByCategory);

// Protected (only logged-in users can create/update/delete)
router.post("/add", checkTokenExpiry, upload.single("image"), checkTokenRole("admin"), shoeController.createShoe);
router.put("/update/:shoes_id", checkTokenExpiry, checkTokenRole("admin"), upload.single("image"), shoeController.updateShoe);
router.delete("/delete/:shoes_id", checkTokenExpiry, checkTokenRole("admin"), shoeController.deleteShoe);

module.exports = router;
