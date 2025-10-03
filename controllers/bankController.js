const Bank = require("../models/bankModel");

// Get all banks
exports.getAllBanks = async (req, res) => {
    try {
        const banks = await Bank.getAll();
        res.json(banks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get bank by ID
exports.getBankById = async (req, res) => {
    try {
        const bank = await Bank.getById(req.params.id);
        if (!bank) return res.status(404).json({ message: "Bank not found" });
        res.json(bank);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create bank
exports.createBank = async (req, res) => {
    try {
        const created_by = req.user.userId; // from token
        const { method_id, name, is_active = true } = req.body;

        const bankId = await Bank.create({
            method_id,
            name,
            is_active,
            created_by
        });

        res.status(201).json({ message: "Bank added successfully", bankId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update bank
// exports.updateBank = async (req, res) => {
//     try {
//         const { name, is_active } = req.body;

//         const affected = await Bank.update(req.params.id, {
//             name,
//             is_active
//         });

//         if (!affected) return res.status(404).json({ message: "Bank not found" });
//         res.json({ message: "Bank updated successfully" });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// Delete bank
exports.deleteBank = async (req, res) => {
    try {
        const affected = await Bank.delete(req.params.id);
        if (!affected) return res.status(404).json({ message: "Bank not found" });
        res.json({ message: "Bank deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
