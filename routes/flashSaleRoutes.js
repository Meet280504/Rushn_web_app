const express = require("express");
const router = express.Router();
const flashSaleController = require("../controllers/flashSaleController");
const { checkTokenExpiry, checkTokenRole } = require("../middleware/authMiddleware");

// CRUD routes
router.get("/", flashSaleController.getAllFlashSales);
router.get("/get/:id", flashSaleController.getFlashSaleById);
router.post("/add", checkTokenExpiry, checkTokenRole("admin"), flashSaleController.createFlashSale);
router.put("/update/:id", checkTokenExpiry, checkTokenRole("admin"), flashSaleController.updateFlashSale);
router.delete("/delete/:id", checkTokenExpiry, checkTokenRole("admin"), flashSaleController.deleteFlashSale);

module.exports = router;
