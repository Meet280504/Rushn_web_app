const UserVirtualAccount = require("../models/UserVirtualAccountModel");

// Create
exports.createVirtualAccount = async (req, res) => {
    try {
        const user_id = req.user.userId; // from token
        const { bank_id, method_id, account_number, account_label, is_default } = req.body;

        const id = await UserVirtualAccount.create({
            user_id,
            bank_id,
            method_id,
            account_number,
            account_label,
            is_default
        });

        res.status(201).json({ success: true, message: "Virtual Account created successfully", id });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all for logged-in user
exports.getVirtualAccounts = async (req, res) => {
    try {
        const user_id = req.user.userId;
        const accounts = await UserVirtualAccount.getAllByUser(user_id);
        res.json({ success: true, data: accounts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get one by ID
exports.getVirtualAccountById = async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.user.userId;
        const account = await UserVirtualAccount.getById(id, user_id);
        if (!account) return res.status(404).json({ success: false, message: "Not found" });
        res.json({ success: true, data: account });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update
exports.updateVirtualAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.user.userId;
        const { account_label, is_default } = req.body;

        const affected = await UserVirtualAccount.update(id, user_id, { account_label, is_default });
        if (!affected) return res.status(404).json({ success: false, message: "Not found or no changes" });

        res.json({ success: true, message: "Virtual Account updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete
exports.deleteVirtualAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.user.userId;

        const affected = await UserVirtualAccount.delete(id, user_id);
        if (!affected) return res.status(404).json({ success: false, message: "Not found" });

        res.json({ success: true, message: "Virtual Account deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 🔹 Admin: Get all users’ VAs
exports.getAllVirtualAccountsForAdmin = async (req, res) => {
    try {
        const accounts = await UserVirtualAccount.getAllForAdmin();
        res.json({ success: true, data: accounts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
