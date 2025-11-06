// const express = require("express");
// const router = express.Router();
// const shippingAddressController = require("../controllers/shippingAddressController");
// const { checkTokenExpiry, checkTokenRole } = require("../middleware/authMiddleware");

// // All routes protected
// router.post("/add", checkTokenExpiry, checkTokenRole("user"), shippingAddressController.createAddress);
// router.get("/", checkTokenExpiry, checkTokenRole("user"), shippingAddressController.getUserAddresses);
// router.get("/:id", checkTokenExpiry, checkTokenRole("user"), shippingAddressController.getDefaultAddress);
// router.put("/update/:address_id", checkTokenExpiry, checkTokenRole("user"), shippingAddressController.updateAddress);
// router.delete("/delete/:address_id", checkTokenExpiry, checkTokenRole("user"), shippingAddressController.deleteAddress);

// // Admin route
// router.get("/admin/all", checkTokenExpiry,checkTokenRole("admin"), shippingAddressController.getAllAddresses);

// module.exports = router;

// Working
const express = require("express");
const router = express.Router();
const {
  getAllAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} = require("../controllers/shippingAddressController");

// GET all addresses
router.get("/get-all", getAllAddresses);      // GET /api/shipping-addresses

// POST a new address
router.post("/", addAddress);          // POST /api/shipping-addresses

// PUT update an address
router.put("/:id", updateAddress);     // PUT /api/shipping-addresses/:id

// DELETE an address
router.delete("/:id", deleteAddress);  // DELETE /api/shipping-addresses/:id

module.exports = router;