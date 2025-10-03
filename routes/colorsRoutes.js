const express = require("express");
const router = express.Router();
const colorsController = require("../controllers/colorsController");
const { checkTokenExpiry, checkTokenRole } = require("../middleware/authMiddleware");

// 🔹 Colors Routes
router.get("/get-all", colorsController.getColor);
router.get("/:color_id", colorsController.getColorById);
router.get("/shoes/:shoes_id", colorsController.getColorsByShoes);

// Protected Routes
router.post("/add", checkTokenExpiry, checkTokenRole(["admin", "editor"]), colorsController.createColor);
router.put("/update/:color_id", checkTokenExpiry, checkTokenRole(["admin", "editor"]), colorsController.updateColor);
router.delete("/delete/:color_id", checkTokenExpiry, checkTokenRole(["admin", "editor"]), colorsController.deleteColor);

module.exports = router;
