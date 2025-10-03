const express = require("express");
const router = express.Router();
const ewalletProviderController = require("../controllers/ewalletProviderController");
const { checkTokenExpiry, checkTokenRole } = require("../middleware/authMiddleware");

// Routes
router.get("/", ewalletProviderController.getAllProviders);
router.get("/:id", ewalletProviderController.getProviderById);
router.post("/add", checkTokenExpiry, checkTokenRole("admin"), ewalletProviderController.createProvider);
// router.put("/update/:id", checkTokenExpiry, checkTokenRole("admin"), ewalletProviderController.updateProvider);
router.delete("/delete/:id", checkTokenExpiry, checkTokenRole("admin"), ewalletProviderController.deleteProvider);

module.exports = router;
