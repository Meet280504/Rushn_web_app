const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const { checkTokenExpiry, checkTokenRole } = require("../middleware/authMiddleware");

// User Routes
router.post("/create", checkTokenExpiry, paymentController.createPayment);
router.get("/my-payments", checkTokenExpiry, paymentController.getMyPayments);

// Admin Routes
router.get("/", checkTokenExpiry, checkTokenRole("admin"), paymentController.getAllPayments);
router.get("/:payment_id", checkTokenExpiry, paymentController.getPaymentById);
router.put("/update/:payment_id", checkTokenExpiry, checkTokenRole("admin"), paymentController.updatePayment);
router.delete("/delete/:payment_id", checkTokenExpiry, checkTokenRole("admin"), paymentController.deletePayment);

module.exports = router;
