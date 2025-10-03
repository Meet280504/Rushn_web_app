// const categoryModel = require("../models/categoryModel");
// const { helpers } = require("../utils/helper");

// // Create category
// exports.createCategory = async (req, res) => {
//   try {
//     const { category_name, icon } = req.body;

//     if (!category_name) {
//       return helpers.response.error(res, 400, "Category name is required");
//     }

//     const newCategory = await categoryModel.createCategory(
//       category_name,
//       icon || null,
//       req.user.userId,
//       req.user.userId
//     );

//     return helpers.response.success(res, 201, "Category created successfully", newCategory);
//   } catch (error) {
//     console.error("Create Category Error:", error);
//     return helpers.response.error(res, 500, "Failed to create category", error.message);
//   }
// };

// // Get all categories
// exports.getAllCategories = async (req, res) => {
//   try {
//     const categories = await categoryModel.getAllCategories();
//     return helpers.response.success(res, 200, "Categories fetched successfully", categories);
//   } catch (error) {
//     console.error("Get All Categories Error:", error);
//     return helpers.response.error(res, 500, "Failed to fetch categories", error.message);
//   }
// };

// // Get category by ID
// exports.getCategoryById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const category = await categoryModel.getCategoryById(id);

//     if (!category) {
//       return helpers.response.error(res, 404, "Category not found");
//     }

//     return helpers.response.success(res, 200, "Category fetched successfully", category);
//   } catch (error) {
//     console.error("Get Category By ID Error:", error);
//     return helpers.response.error(res, 500, "Failed to fetch category", error.message);
//   }
// };

// // Update category
// exports.updateCategory = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { category_name, icon } = req.body;

//     const updated = await categoryModel.updateCategory(
//       id,
//       category_name,
//       icon || null,
//       req.user.userId
//     );

//     if (!updated) {
//       return helpers.response.error(res, 404, "Category not found or not updated");
//     }

//     return helpers.response.success(res, 200, "Category updated successfully");
//   } catch (error) {
//     console.error("Update Category Error:", error);
//     return helpers.response.error(res, 500, "Failed to update category", error.message);
//   }
// };

// // Delete category
// exports.deleteCategory = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deleted = await categoryModel.deleteCategory(id);

//     if (!deleted) {
//       return helpers.response.error(res, 404, "Category not found");
//     }

//     return helpers.response.success(res, 200, "Category deleted successfully");
//   } catch (error) {
//     console.error("Delete Category Error:", error);
//     return helpers.response.error(res, 500, "Failed to delete category", error.message);
//   }
// };
const categoryModel = require("../models/categoryModel");
const { helpers } = require("../utils/helper");

// Create category
exports.createCategory = async (req, res) => {
  try {
    const { category_name } = req.body;
    // icon comes from uploaded file
    const icon = req.file ? req.file.filename : null;

    if (!category_name) {
      return helpers.response.error(res, 400, "Category name is required");
    }

    const newCategory = await categoryModel.createCategory(
      category_name,
      icon,
      req.user.userId,
      req.user.userId
    );

    return helpers.response.success(res, 201, "Category created successfully", newCategory);
  } catch (error) {
    console.error("Create Category Error:", error);
    return helpers.response.error(res, 500, "Failed to create category", error.message);
  }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.getAllCategories();
    console.log("Categories from DB:", categories); // <--- add this
    return helpers.response.success(res, 200, "Categories fetched successfully", categories);
  } catch (error) {
    console.error("Get All Categories Error:", error);
    return helpers.response.error(res, 500, "Failed to fetch categories", error.message);
  }
};

// Get category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.getCategoryById(id);

    if (!category) {
      return helpers.response.error(res, 404, "Category not found");
    }

    return helpers.response.success(res, 200, "Category fetched successfully", category);
  } catch (error) {
    console.error("Get Category By ID Error:", error);
    return helpers.response.error(res, 500, "Failed to fetch category", error.message);
  }
};

// Update category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { category_name } = req.body;
    // icon may be updated via file upload
    const icon = req.file ? req.file.filename : req.body.icon || null;

    const updated = await categoryModel.updateCategory(
      id,
      category_name,
      icon,
      req.user.userId
    );

    if (!updated) {
      return helpers.response.error(res, 404, "Category not found or not updated");
    }

    return helpers.response.success(res, 200, "Category updated successfully");
  } catch (error) {
    console.error("Update Category Error:", error);
    return helpers.response.error(res, 500, "Failed to update category", error.message);
  }
};

// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await categoryModel.deleteCategory(id);

    if (!deleted) {
      return helpers.response.error(res, 404, "Category not found");
    }

    return helpers.response.success(res, 200, "Category deleted successfully");
  } catch (error) {
    console.error("Delete Category Error:", error);
    return helpers.response.error(res, 500, "Failed to delete category", error.message);
  }
};
