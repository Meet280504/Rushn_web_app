const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { checkTokenExpiry, checkTokenRole } = require("../middleware/authMiddleware");

// User routes
router.post("/create", checkTokenExpiry, checkTokenRole("user"), orderController.createOrder);
router.get("/my", checkTokenExpiry, checkTokenRole("user"), orderController.getUserOrders);
router.get("/:order_id", checkTokenExpiry, checkTokenRole("user"), orderController.getOrderById);
router.delete("/delete/:order_id", checkTokenExpiry, checkTokenRole("user"), orderController.deleteOrder);

// Admin routes
router.get("/", checkTokenExpiry, checkTokenRole("admin"), orderController.getAllOrders);
router.put("/:order_id/status", checkTokenExpiry, checkTokenRole("admin"), orderController.updateOrderStatus);

module.exports = router;
