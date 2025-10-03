const express = require("express");
const router = express.Router();
const {
    createCard,
    getCards,
    getCardById,
    updateCard,
    deleteCard
} = require("../controllers/creditDebitCardController");

const { checkTokenExpiry, checkTokenRole } = require("../middleware/authMiddleware");

// User routes
router.post("/add", checkTokenExpiry, checkTokenRole("user"), createCard);
router.get("/", checkTokenExpiry, checkTokenRole("user"), getCards);
router.get("/:id", checkTokenExpiry, checkTokenRole("user"), getCardById);
router.put("/update/:id", checkTokenExpiry, checkTokenRole("user"), updateCard);
router.delete("/delete/:id", checkTokenExpiry, checkTokenRole("user"), deleteCard);

module.exports = router;
