const UserEwallet = require("../models/userEwalletModel");

// Get all wallets for logged-in user
exports.getUserEwallets = async (req, res) => {
    try {
        const user_id = req.user.userId;
        const wallets = await UserEwallet.getByUserId(user_id);
        res.json(wallets);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Admin: Get all users' ewallets
exports.getAllUserEwallets = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    const ewallets = await UserEwallet.getAll();
    res.status(200).json({ success: true, count: ewallets.length, data: ewallets });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
};

// Get wallet by ID
exports.getUserEwalletById = async (req, res) => {
    try {
        const user_id = req.user.userId;
        const wallet = await UserEwallet.getById(req.params.id, user_id);
        if (!wallet) return res.status(404).json({ message: "Wallet not found" });
        res.json(wallet);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create wallet
exports.createUserEwallet = async (req, res) => {
    try {
        const user_id = req.user.userId; // from token
        const { provider_id, email, method_id, method_type = "wallet", is_default = false } = req.body;

        const walletId = await UserEwallet.create({
            user_id,
            provider_id,
            email,
            method_id,
            method_type,
            is_default
        });

        res.status(201).json({ message: "Wallet created", walletId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update wallet
exports.updateUserEwallet = async (req, res) => {
    try {
        const user_id = req.user.userId;
        const { provider_id, method_id, email, is_default = false } = req.body;

        const affected = await UserEwallet.update(req.params.id, user_id, {
            provider_id,
            method_id,
            email,
            is_default
        });

        if (!affected) return res.status(404).json({ message: "Wallet not found" });
        res.json({ message: "Wallet updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete wallet
exports.deleteUserEwallet = async (req, res) => {
    try {
        const user_id = req.user.userId;
        const affected = await UserEwallet.delete(req.params.id, user_id);

        if (!affected) return res.status(404).json({ message: "Wallet not found" });
        res.json({ message: "Wallet deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
