const express = require("express");
const router = express.Router();
const paymentMethodController = require("../controllers/paymentMethodController");
const { checkTokenExpiry, checkTokenRole } = require("../middleware/authMiddleware");

// Routes
router.get("/", paymentMethodController.getAllPaymentMethods);
router.get("/get/:id", paymentMethodController.getPaymentMethodById);
router.post("/add", checkTokenExpiry, checkTokenRole("admin"), paymentMethodController.createPaymentMethod);
router.put("/update/:id", checkTokenExpiry, checkTokenRole("admin"), paymentMethodController.updatePaymentMethod);
router.delete("/delete/:id", checkTokenExpiry, checkTokenRole("admin"), paymentMethodController.deletePaymentMethod);

module.exports = router;
