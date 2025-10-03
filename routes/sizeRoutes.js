const express = require("express");
const router = express.Router();
const sizeController = require("../controllers/sizeController");
const { checkTokenExpiry, checkTokenRole } = require("../middleware/authMiddleware");

// Add sizes for a shoe+color
router.post("/", checkTokenExpiry, checkTokenRole("admin"), sizeController.addSizes);

// Get sizes for a specific shoe+color
router.get("/:shoes_id/:color_id", checkTokenExpiry, checkTokenRole("user"), sizeController.getSizes);

// Update sizes
router.put("/:size_id", checkTokenExpiry, checkTokenRole("admin"), sizeController.updateSizes);

// Delete sizes
router.delete("/:size_id", checkTokenExpiry, checkTokenRole("admin"), sizeController.deleteSizes);

module.exports = router;
