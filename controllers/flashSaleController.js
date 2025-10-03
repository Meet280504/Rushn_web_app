const FlashSale = require("../models/flashSaleModel");

// Get all sales
exports.getAllFlashSales = async (req, res) => {
    try {
        const sales = await FlashSale.getAll();
        res.json({ success: true, data: sales });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Get sale by ID
exports.getFlashSaleById = async (req, res) => {
    try {
        const sale = await FlashSale.getById(req.params.id);
        if (!sale) return res.status(404).json({ success: false, message: "Flash sale not found" });
        res.json({ success: true, data: sale });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Create sale
exports.createFlashSale = async (req, res) => {
    try {
        const data = {
            user_id: req.user.userId,
            sale_title: req.body.sale_title,
            created_by: req.user.userId
        };
        const saleId = await FlashSale.create(data);
        res.status(201).json({ success: true, message: "Flash sale created", saleId });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Update sale
exports.updateFlashSale = async (req, res) => {
    try {
        const data = {
            sale_title: req.body.sale_title,
            updated_by: req.user.userId
        };
        const affectedRows = await FlashSale.update(req.params.id, data);
        if (!affectedRows) return res.status(404).json({ success: false, message: "Flash sale not found" });
        res.json({ success: true, message: "Flash sale updated" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Delete sale
exports.deleteFlashSale = async (req, res) => {
    try {
        const affectedRows = await FlashSale.delete(req.params.id);
        if (!affectedRows) return res.status(404).json({ success: false, message: "Flash sale not found" });
        res.json({ success: true, message: "Flash sale removed" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
