const NewArrival = require("../models/newArrivalModel");

// ✅ Get all arrivals
exports.getAllArrivals = async (req, res) => {
    try {
        const arrivals = await NewArrival.getAll();
        res.json({ success: true, data: arrivals });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching arrivals", error: error.message });
    }
};

// ✅ Get by ID
exports.getArrivalById = async (req, res) => {
    try {
        const { arrival_id } = req.params;
        const arrival = await NewArrival.getById(arrival_id);
        if (!arrival) return res.status(404).json({ success: false, message: "Arrival not found" });
        res.json({ success: true, data: arrival });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching arrival", error: error.message });
    }
};

// ✅ Create new arrival (admin)
exports.createArrival = async (req, res) => {
    try {
        const userId = req.user.userId; // from token
        const { product_name, product_category, image_url } = req.body;

        if (!product_name || !product_category || !image_url) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const newId = await NewArrival.create({
            user_id: userId,
            product_name,
            product_category,
            image_url,
            created_by: userId
        });

        res.status(201).json({ success: true, message: "Arrival created successfully", arrival_id: newId });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating arrival", error: error.message });
    }
};

// ✅ Update arrival (admin)
exports.updateArrival = async (req, res) => {
    try {
        const { arrival_id } = req.params;
        const userId = req.user.userId; // from token
        const { product_name, product_category, image_url } = req.body;

        const updated = await NewArrival.update(arrival_id, {
            product_name,
            product_category,
            image_url,
            updated_by: userId
        });

        if (!updated) return res.status(404).json({ success: false, message: "Arrival not found" });

        res.json({ success: true, message: "Arrival updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating arrival", error: error.message });
    }
};

// ✅ Delete arrival (admin)
exports.deleteArrival = async (req, res) => {
    try {
        const { arrival_id } = req.params;
        const deleted = await NewArrival.delete(arrival_id);

        if (!deleted) return res.status(404).json({ success: false, message: "Arrival not found" });

        res.json({ success: true, message: "Arrival deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting arrival", error: error.message });
    }
};
