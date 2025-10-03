const EwalletProvider = require("../models/ewalletProviderModel");

// Get all providers
exports.getAllProviders = async (req, res) => {
    try {
        const providers = await EwalletProvider.getAll();
        res.status(200).json(providers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get provider by ID
exports.getProviderById = async (req, res) => {
    try {
        const provider = await EwalletProvider.getById(req.params.id);
        if (!provider) return res.status(404).json({ message: "Provider not found" });
        res.status(200).json(provider);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create provider (created_by from token)
exports.createProvider = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { method_id, name, method_type = "wallet", is_active = true } = req.body;

        const newId = await EwalletProvider.create({
            method_id,
            name,
            method_type,
            is_active,
            created_by: userId
        });

        res.status(201).json({ message: "Provider addeded successfully", provider_id: newId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update provider
// exports.updateProvider = async (req, res) => {
//     try {
//         const { name, is_active } = req.body;
//         const updated = await EwalletProvider.update(req.params.id, { name, is_active });

//         if (!updated) return res.status(404).json({ message: "Provider not found" });
//         res.status(200).json({ message: "Provider updated successfully" });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// Delete provider
exports.deleteProvider = async (req, res) => {
    try {
        const deleted = await EwalletProvider.delete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Provider not found" });
        res.status(200).json({ message: "Provider deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
