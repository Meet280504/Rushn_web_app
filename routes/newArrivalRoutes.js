const express = require("express");
const router = express.Router();
const newArrivalController = require("../controllers/newArrivalController");
const { checkTokenExpiry, checkTokenRole } = require("../middleware/authMiddleware"); // verify token

// Public Routes
router.get("/get-all", newArrivalController.getAllArrivals);
router.get("/:arrival_id", newArrivalController.getArrivalById);

// Admin Routes (Protected)
router.post("/add", checkTokenExpiry, checkTokenRole(["admin", "editor"]), newArrivalController.createArrival);
router.put("/update/:arrival_id", checkTokenExpiry, checkTokenRole(["admin", "editor"]), newArrivalController.updateArrival);
router.delete("/delete/:arrival_id", checkTokenExpiry, checkTokenRole(["admin", "editor"]), newArrivalController.deleteArrival);

module.exports = router;
