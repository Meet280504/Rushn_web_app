const express = require("express");
const router = express.Router();
const shoesImageController = require("../controllers/shoeImageController");
const { checkTokenExpiry, checkTokenRole } = require("../middleware/authMiddleware");

// Admin/User protected routes
router.get("/", checkTokenExpiry, checkTokenRole("admin"), shoesImageController.getAllShoesImages);
router.get("/:id", checkTokenExpiry, checkTokenRole("admin"), shoesImageController.getShoesImageById);
router.get("/shoe/:shoes_id", checkTokenExpiry, checkTokenRole("admin"), shoesImageController.getShoesImagesByShoesId);
router.post("/add", checkTokenExpiry, checkTokenRole("admin"), shoesImageController.createShoesImage);
router.put("/update/:id", checkTokenExpiry, checkTokenRole("admin"), shoesImageController.updateShoesImage);
router.delete("/delete/:id", checkTokenExpiry, checkTokenRole("admin"), shoesImageController.deleteShoesImage);

module.exports = router;
