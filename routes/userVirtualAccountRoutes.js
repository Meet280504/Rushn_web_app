const express = require("express");
const router = express.Router();
const {
    createVirtualAccount,
    getVirtualAccounts,
    getVirtualAccountById,
    updateVirtualAccount,
    deleteVirtualAccount,
    getAllVirtualAccountsForAdmin
} = require("../controllers/userVirtualAccountController");

const { checkTokenExpiry, checkTokenRole } = require("../middleware/authMiddleware");

// User routes
router.post("/add", checkTokenExpiry, checkTokenRole("user"), createVirtualAccount);
router.get("/", checkTokenExpiry, checkTokenRole("user"), getVirtualAccounts);
router.get("/:id", checkTokenExpiry, checkTokenRole("user"), getVirtualAccountById);
router.put("/update/:id", checkTokenExpiry, checkTokenRole("user"), updateVirtualAccount);
router.delete("/delete/:id", checkTokenExpiry, checkTokenRole("user"), deleteVirtualAccount);

// Admin routes
router.get("/admin/all", checkTokenExpiry, checkTokenRole("admin"), getAllVirtualAccountsForAdmin);

module.exports = router;