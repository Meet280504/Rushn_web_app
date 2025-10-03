const CreditDebitCard = require("../models/creditDebitCardModel");

// Create card
exports.createCard = async (req, res) => {
    try {
        const user_id = req.user.userId; // from token
        const {
            method_id,
            method_type,
            card_number,
            cardholder_name,
            expiry_date,
            security_code,
            billing_address,
            is_default
        } = req.body;

        const id = await CreditDebitCard.create({
            user_id,
            method_id,
            method_type,
            card_number,
            cardholder_name,
            expiry_date,
            security_code,
            billing_address,
            is_default
        });

        res.status(201).json({ success: true, message: "Card added successfully", id });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all cards for logged-in user
exports.getCards = async (req, res) => {
    try {
        const user_id = req.user.userId;
        const cards = await CreditDebitCard.getAllByUser(user_id);
        res.json({ success: true, data: cards });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get one card
exports.getCardById = async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.user.userId;
        const card = await CreditDebitCard.getById(id, user_id);
        if (!card) return res.status(404).json({ success: false, message: "Card not found" });
        res.json({ success: true, data: card });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update card
exports.updateCard = async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.user.userId;
        const { cardholder_name, expiry_date, billing_address, is_default } = req.body;

        const affected = await CreditDebitCard.update(id, user_id, {
            cardholder_name,
            expiry_date,
            billing_address,
            is_default
        });

        if (!affected) return res.status(404).json({ success: false, message: "Card not found or no changes" });

        res.json({ success: true, message: "Card updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete card
exports.deleteCard = async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.user.userId;

        const affected = await CreditDebitCard.delete(id, user_id);
        if (!affected) return res.status(404).json({ success: false, message: "Card not found" });

        res.json({ success: true, message: "Card deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
