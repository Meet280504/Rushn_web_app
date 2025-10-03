const express = require("express");
const router = express.Router();
const bankController = require("../controllers/bankController");
const { checkTokenExpiry, checkTokenRole } = require("../middleware/authMiddleware");

// Routes
router.get("/", checkTokenExpiry, bankController.getAllBanks);
router.get("/:id", checkTokenExpiry, bankController.getBankById);
router.post("/add", checkTokenExpiry, checkTokenRole("admin"), bankController.createBank);
// router.put("/update/:id", checkTokenExpiry, checkTokenRole("admin"), bankController.updateBank);
router.delete("/delete/:id", checkTokenExpiry, checkTokenRole("admin"), bankController.deleteBank);

module.exports = router;
