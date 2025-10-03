const express = require("express");
const router = express.Router();
const userEwalletController = require("../controllers/userEwalletController");
const { checkTokenExpiry, checkTokenRole } = require("../middleware/authMiddleware");

// Routes (only accessible to logged-in user)
router.get("/", checkTokenExpiry, checkTokenRole("user"), userEwalletController.getUserEwallets);
router.get("/:id", checkTokenExpiry, checkTokenRole("user"), userEwalletController.getUserEwalletById);
router.post("/add", checkTokenExpiry, checkTokenRole("user"), userEwalletController.createUserEwallet);
router.put("/update/:id", checkTokenExpiry, checkTokenRole("user"), userEwalletController.updateUserEwallet);
router.delete("/delete/:id", checkTokenExpiry, checkTokenRole("user"), userEwalletController.deleteUserEwallet);

// Admin: Get all users' ewallets
router.get("/admin/all", checkTokenExpiry, checkTokenRole("admin"), userEwalletController.getAllUserEwallets);

module.exports = router;
