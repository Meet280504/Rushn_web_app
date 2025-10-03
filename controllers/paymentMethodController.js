const PaymentMethod = require("../models/paymentMethodModel");

// Get all
exports.getAllPaymentMethods = async (req, res) => {
    try {
        const methods = await PaymentMethod.getAll();
        res.json(methods);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get by ID
exports.getPaymentMethodById = async (req, res) => {
    try {
        const method = await PaymentMethod.getById(req.params.id);
        if (!method) return res.status(404).json({ message: "Payment Method not found" });
        res.json(method);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create
exports.createPaymentMethod = async (req, res) => {
    try {
        const created_by = req.user.userId; // from token middleware
        const { name, description, icon_url, method_type, is_active = true } = req.body;

        const methodId = await PaymentMethod.create({
            name,
            description,
            icon_url,
            method_type,
            is_active,
            created_by
        });

        res.status(201).json({ message: "Payment Method created successfully", methodId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update
exports.updatePaymentMethod = async (req, res) => {
    try {
        const { name, description, icon_url, method_type, is_active } = req.body;

        const affected = await PaymentMethod.update(req.params.id, {
            name,
            description,
            icon_url,
            method_type,
            is_active
        });

        if (!affected) return res.status(404).json({ message: "Payment Method not found" });
        res.json({ message: "Payment Method updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete
exports.deletePaymentMethod = async (req, res) => {
    try {
        const affected = await PaymentMethod.delete(req.params.id);
        if (!affected) return res.status(404).json({ message: "Payment Method not found" });
        res.json({ message: "Payment Method removed successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
