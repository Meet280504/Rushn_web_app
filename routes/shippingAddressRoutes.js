const express = require("express");
const router = express.Router();
const shippingAddressController = require("../controllers/shippingAddressController");
const { checkTokenExpiry, checkTokenRole } = require("../middleware/authMiddleware");

// All routes protected
router.post("/add", checkTokenExpiry, checkTokenRole("user"), shippingAddressController.createAddress);
router.get("/", checkTokenExpiry, checkTokenRole("user"), shippingAddressController.getUserAddresses);
router.get("/:id", checkTokenExpiry, checkTokenRole("user"), shippingAddressController.getDefaultAddress);
router.put("/update/:address_id", checkTokenExpiry, checkTokenRole("user"), shippingAddressController.updateAddress);
router.delete("/delete/:address_id", checkTokenExpiry, checkTokenRole("user"), shippingAddressController.deleteAddress);

// Admin route
router.get("/admin/all", checkTokenExpiry,checkTokenRole("admin"), shippingAddressController.getAllAddresses);

module.exports = router;

