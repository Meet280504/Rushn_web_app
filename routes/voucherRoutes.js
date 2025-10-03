const express = require("express");
const router = express.Router();
const voucherController = require("../controllers/voucherController");
const { checkTokenExpiry, checkTokenRole } = require("../middleware/authMiddleware");

// CRUD
router.get("/", voucherController.getAllVouchers);
router.get("/get/:id", voucherController.getVoucherById);
router.post("/create", checkTokenExpiry, checkTokenRole("admin"), voucherController.createVoucher);
router.put("/update/:id", checkTokenExpiry, checkTokenRole("admin"), voucherController.updateVoucher);
router.delete("/delete/:id", checkTokenExpiry, checkTokenRole("admin"), voucherController.deleteVoucher);

// Special
router.get("/active/list", checkTokenExpiry, checkTokenRole("admin"), voucherController.getActiveVouchers);
router.post("/apply", checkTokenExpiry, checkTokenRole("user"), voucherController.applyVoucher);

module.exports = router;
