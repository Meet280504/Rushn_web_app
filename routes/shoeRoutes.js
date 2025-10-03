// const express = require("express");
// const router = express.Router();
// const shoeController = require("../controllers/shoeController");

// router.get("/get-all", shoeController.getShoes);
// router.get("/:shoes_id", shoeController.getShoeById);
// router.get("/category/:category_id", shoeController.getShoesByCategory);
// router.post("/add", shoeController.createShoe);
// router.put("/update/:shoes_id", shoeController.updateShoe);
// router.delete("/delete/:shoes_id", shoeController.deleteShoe);

// module.exports = router;
const express = require("express");
const router = express.Router();
const shoeController = require("../controllers/shoeController");
const { checkTokenExpiry, checkTokenRole } = require("../middleware/authMiddleware");

// Public
router.get("/shoes", shoeController.getAllShoes);
router.get("/shoes/:shoes_id", shoeController.getShoeById);
router.get("/shoes/category/:category_id", shoeController.getShoesByCategory);

// Protected (only logged-in users can create/update/delete)
router.post("/add", checkTokenExpiry, checkTokenRole(["admin", "editor"]), shoeController.createShoe);
router.put("/update/:shoes_id", checkTokenExpiry, checkTokenRole(["admin", "editor"]), shoeController.updateShoe);
router.delete("/delete/:shoes_id", checkTokenExpiry, checkTokenRole(["admin"]), shoeController.deleteShoe);

module.exports = router;
