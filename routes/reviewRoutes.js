const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const { checkTokenExpiry, checkTokenRole } = require("../middleware/authMiddleware");
// Public routes
router.get("/", reviewController.getAllReviews);             // GET all reviews
router.get("/:review_id", checkTokenExpiry, checkTokenRole("user"), reviewController.getReviewById);   // GET review by ID
router.get("/shoe/:shoes_id", reviewController.getReviewsByShoe); // GET reviews for a shoe
router.get("/stats/shoe/:shoes_id", reviewController.getShoeStats); // GET stats for a shoe
router.get("/stats/overall", reviewController.getOverallStats);     // GET overall stats

// Protected routes (need login)
router.get("/user/my", checkTokenExpiry, checkTokenRole("user"), reviewController.getReviewsByUser); // GET my reviews
router.post("/add", checkTokenExpiry, checkTokenRole("user"), reviewController.createReview);           // CREATE review
router.put("/update/:review_id", checkTokenExpiry, checkTokenRole("admin"), reviewController.updateReview);  // UPDATE review
router.delete("/delete/:review_id", checkTokenExpiry, checkTokenRole("admin"), reviewController.deleteReview); // DELETE review

module.exports = router;
