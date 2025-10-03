// routes/flashSaleItemRoutes.js
const express = require("express");
const router = express.Router();
const {
  createFlashSaleItem,
  getAllFlashSaleItems,
  getFlashSaleItemById,
  getActiveFlashSaleItems,
  updateFlashSaleItem,
  deleteFlashSaleItem,
} = require("../controllers/flashSaleItemController");
const { checkTokenExpiry, checkTokenRole } = require("../middleware/authMiddleware");

// CRUD
router.post("/add", checkTokenExpiry, checkTokenRole("admin"), createFlashSaleItem);
router.get("/", checkTokenExpiry,getAllFlashSaleItems);
router.get("/:id", checkTokenExpiry, getFlashSaleItemById);
router.put("/update/:id", checkTokenExpiry, checkTokenRole("admin"), updateFlashSaleItem);
router.delete("/delete/:id", checkTokenExpiry, checkTokenRole("admin"), deleteFlashSaleItem);

// Special route: active items by sale title (Last Chance, Today’s Sale, etc.)
router.get("/active/:saleTitle", checkTokenExpiry, getActiveFlashSaleItems);

module.exports = router;