const Voucher = require("../models/voucherModel");

// Get all vouchers
exports.getAllVouchers = async (req, res) => {
    try {
        const vouchers = await Voucher.getAll();
        res.json({ success: true, data: vouchers });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Get voucher by ID
exports.getVoucherById = async (req, res) => {
    try {
        const voucher = await Voucher.getById(req.params.id);
        if (!voucher) return res.status(404).json({ success: false, message: "Voucher not found" });
        res.json({ success: true, data: voucher });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Create voucher
exports.createVoucher = async (req, res) => {
    try {
        const voucherId = await Voucher.create(req.body);
        res.status(201).json({ success: true, message: "Voucher created", voucherId });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Update voucher
exports.updateVoucher = async (req, res) => {
    try {
        const affectedRows = await Voucher.update(req.params.id, req.body);
        if (!affectedRows) return res.status(404).json({ success: false, message: "Voucher not found" });
        res.json({ success: true, message: "Voucher updated" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Delete voucher
exports.deleteVoucher = async (req, res) => {
    try {
        const affectedRows = await Voucher.delete(req.params.id);
        if (!affectedRows) return res.status(404).json({ success: false, message: "Voucher not found" });
        res.json({ success: true, message: "Voucher deleted" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Get active vouchers (valid today)
exports.getActiveVouchers = async (req, res) => {
    try {
        const vouchers = await Voucher.getActive();
        res.json({ success: true, data: vouchers });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Apply voucher by code
exports.applyVoucher = async (req, res) => {
    try {
        const { code, purchaseAmount, isFirstPurchase } = req.body;
        const voucher = await Voucher.getByCode(code);

        if (!voucher) {
            return res.status(400).json({ success: false, message: "Invalid or expired voucher" });
        }

        if (voucher.first_purchase_only && !isFirstPurchase) {
            return res.status(400).json({ success: false, message: "Voucher valid only on first purchase" });
        }

        if (voucher.min_purchase && purchaseAmount < voucher.min_purchase) {
            return res.status(400).json({ success: false, message: `Minimum purchase should be ${voucher.min_purchase}` });
        }

        return res.json({ success: true, data: voucher, message: "Voucher applied successfully" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
