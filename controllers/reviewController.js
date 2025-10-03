const Review = require("../models/reviewModel");

// ✅ Get all reviews (admin/general)
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.getAll();
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching all reviews:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get review by ID
exports.getReviewById = async (req, res) => {
  try {
    const { review_id } = req.params;
    const review = await Review.getById(review_id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json(review);
  } catch (error) {
    console.error("Error fetching review:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get reviews by Shoe ID
exports.getReviewsByShoe = async (req, res) => {
  try {
    const { shoes_id } = req.params;
    const reviews = await Review.getByShoeId(shoes_id);
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews by shoe:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get reviews by User ID (from token)
exports.getReviewsByUser = async (req, res) => {
  try {
    const user_id = req.user.userId; // from token middleware
    const reviews = await Review.getByUserId(user_id);
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching user reviews:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Create new review
exports.createReview = async (req, res) => {
  try {
    const user_id = req.user.userId; // from token middleware
    const { shoes_id, review_text, rating } = req.body;

    if (!shoes_id || !review_text || !rating) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const reviewId = await Review.create({ user_id, shoes_id, review_text, rating });
    res.status(201).json({ message: "Review added successfully", review_id: reviewId });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update review
exports.updateReview = async (req, res) => {
  try {
    const { review_id } = req.params;
    const { review_text, rating } = req.body;

    const updated = await Review.update(review_id, { review_text, rating });

    if (updated === 0) {
      return res.status(404).json({ message: "Review not found or not updated" });
    }

    res.status(200).json({ message: "Review updated successfully" });
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete review
exports.deleteReview = async (req, res) => {
  try {
    const { review_id } = req.params;

    const deleted = await Review.delete(review_id);

    if (deleted === 0) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get stats for a shoe
exports.getShoeStats = async (req, res) => {
  try {
    const { shoes_id } = req.params;
    const stats = await Review.getStatsByShoeId(shoes_id);
    res.status(200).json(stats);
  } catch (error) {
    console.error("Error fetching shoe stats:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get overall stats
exports.getOverallStats = async (req, res) => {
  try {
    const stats = await Review.getOverallStats();
    res.status(200).json(stats);
  } catch (error) {
    console.error("Error fetching overall stats:", error);
    res.status(500).json({ message: "Server error" });
  }
};
