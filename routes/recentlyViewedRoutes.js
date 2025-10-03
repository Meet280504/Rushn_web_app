const express = require("express");
const router = express.Router();
const recentlyViewedController = require("../controllers/recentlyViewedController");
const { checkTokenExpiry, checkTokenRole } = require("../middleware/authMiddleware");

router.get("/get-all", checkTokenExpiry, checkTokenRole("admin"), recentlyViewedController.getAll);
router.get("/user/:user_id", checkTokenExpiry, checkTokenRole("user"), recentlyViewedController.getByUserId);
router.post("/add", checkTokenExpiry, checkTokenRole("user"), recentlyViewedController.addOrUpdate);
router.delete("/delete/:view_id", checkTokenExpiry, checkTokenRole("user"), recentlyViewedController.deleteById);

module.exports = router;
