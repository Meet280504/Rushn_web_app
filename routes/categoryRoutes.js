// const express = require("express");
// const router = express.Router();
// const categoryController = require("../controllers/categoryController");
// const { checkTokenExpiry, checkTokenRole } = require("../middleware/authMiddleware");

// // 🔹 Public: Get categories
// router.get("/categories", categoryController.getAllCategories);
// router.get("/categories/:id", categoryController.getCategoryById);

// // 🔹 Protected (Admin/Editor can manage categories)
// router.post(
//   "/create",
//   checkTokenExpiry,
//   checkTokenRole(["admin", "editor"]),
//   categoryController.createCategory
// );

// router.put(
//   "/update/:id",
//   checkTokenExpiry,
//   checkTokenRole(["admin", "editor"]),
//   categoryController.updateCategory
// );

// router.delete(  
//   "/delete/:id",
//   checkTokenExpiry,
//   checkTokenRole(["admin"]),
//   categoryController.deleteCategory
// );

// module.exports = router;
const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { checkTokenExpiry, checkTokenRole } = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");

// Multer setup for icon uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// 🔹 Public: Get categories
router.get("/categories", categoryController.getAllCategories);
router.get("/categories/:id", categoryController.getCategoryById);

// 🔹 Protected (Admin/Editor can manage categories)

// Create category with optional icon upload
router.post(
  "/create",
  checkTokenExpiry,
  checkTokenRole(["admin", "editor"]),
  upload.single("icon"), // <--- multer middleware
  categoryController.createCategory
);

// Update category with optional icon upload
router.put(
  "/update/:id",
  checkTokenExpiry,
  checkTokenRole(["admin", "editor"]),
  upload.single("icon"), // <--- multer middleware
  categoryController.updateCategory
);

// Delete category
router.delete(
  "/delete/:id",
  checkTokenExpiry,
  checkTokenRole(["admin"]),
  categoryController.deleteCategory
);

module.exports = router;
