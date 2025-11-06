// const ShippingAddress = require("../models/shippingAddressModel");

// // Create new shipping address
// exports.createAddress = async (req, res) => {
//   try {
//     const user_id = req.user.userId; // fetched from authMiddleware
//     const { address_label, recipient_name, phone_number, full_address, is_default } = req.body;

//     if (!recipient_name || !phone_number || !full_address) {
//       return res.status(400).json({ success: false, message: "Missing required fields" });
//     }

//     const insertId = await ShippingAddress.create({
//       user_id,
//       address_label,
//       recipient_name,
//       phone_number,
//       full_address,
//       is_default: is_default ? 1 : 0,
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Address created successfully",
//       address_id: insertId,
//     });
//   } catch (error) {
//     console.error("Error creating address:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// // Get all addresses for logged-in user
// exports.getUserAddresses = async (req, res) => {
//   try {
//     const user_id = req.user.userId;
//     const addresses = await ShippingAddress.getByUserId(user_id);

//     res.status(200).json({
//       success: true,
//       message: "Addresses fetched successfully",
//       data: addresses,
//     });
//   } catch (error) {
//     console.error("Error fetching addresses:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// // Get default address for user
// exports.getDefaultAddress = async (req, res) => {
//   try {
//     const user_id = req.user.userId;
//     const address = await ShippingAddress.getDefaultByUserId(user_id);

//     if (!address) {
//       return res.status(404).json({ success: false, message: "Default address not found" });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Default address fetched successfully",
//       data: address,
//     });
//   } catch (error) {
//     console.error("Error fetching default address:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// // Update address
// exports.updateAddress = async (req, res) => {
//   try {
//     const { address_id } = req.params;
//     const user_id = req.user.userId;
//     const { address_label, recipient_name, phone_number, full_address, is_default } = req.body;

//     const affectedRows = await ShippingAddress.update(address_id, {
//       user_id,
//       address_label,
//       recipient_name,
//       phone_number,
//       full_address,
//       is_default: is_default ? 1 : 0,
//     });

//     if (affectedRows === 0) {
//       return res.status(404).json({ success: false, message: "Address not found or not updated" });
//     }

//     res.status(200).json({ success: true, message: "Address updated successfully" });
//   } catch (error) {
//     console.error("Error updating address:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// // Delete address
// exports.deleteAddress = async (req, res) => {
//   try {
//     const { address_id } = req.params;

//     const affectedRows = await ShippingAddress.delete(address_id);
//     if (affectedRows === 0) {
//       return res.status(404).json({ success: false, message: "Address not found" });
//     }

//     res.status(200).json({ success: true, message: "Address deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting address:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// // Admin - Get all users' addresses
// exports.getAllAddresses = async (req, res) => {
//   try {
//     const addresses = await ShippingAddress.getAll();
//     res.status(200).json({
//       success: true,
//       message: "All users' addresses fetched successfully",
//       data: addresses,
//     });
//   } catch (error) {
//     console.error("Error fetching all addresses:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };


// const ShippingAddress = require("../models/shippingAddressModel");

// // Create new shipping address
// exports.createAddress = async (req, res) => {
//   try {
//     const user_id = req.user.userId; // fetched from authMiddleware
//     const { address_label, recipient_name, phone_number, full_address, is_default } = req.body;

//     if (!recipient_name || !phone_number || !full_address) {
//       return res.status(400).json({ success: false, message: "Missing required fields" });
//     }

//     const insertId = await ShippingAddress.create({
//       user_id,
//       address_label,
//       recipient_name,
//       phone_number,
//       full_address,
//       is_default: is_default ? 1 : 0,
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Address created successfully",
//       address_id: insertId,
//     });
//   } catch (error) {
//     console.error("Error creating address:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// // Get all addresses for logged-in user
// exports.getUserAddresses = async (req, res) => {
//   try {
//     const user_id = req.user.userId;
//     const addresses = await ShippingAddress.getByUserId(user_id);

//     res.status(200).json({
//       success: true,
//       message: "Addresses fetched successfully",
//       data: addresses,
//     });
//   } catch (error) {
//     console.error("Error fetching addresses:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// // Get default address for user
// exports.getDefaultAddress = async (req, res) => {
//   try {
//     const user_id = req.user.userId;
//     const address = await ShippingAddress.getDefaultByUserId(user_id);

//     if (!address) {
//       return res.status(404).json({ success: false, message: "Default address not found" });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Default address fetched successfully",
//       data: address,
//     });
//   } catch (error) {
//     console.error("Error fetching default address:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// // Update address
// exports.updateAddress = async (req, res) => {
//   try {
//     const { address_id } = req.params;
//     const user_id = req.user.userId;
//     const { address_label, recipient_name, phone_number, full_address, is_default } = req.body;

//     const affectedRows = await ShippingAddress.update(address_id, {
//       user_id,
//       address_label,
//       recipient_name,
//       phone_number,
//       full_address,
//       is_default: is_default ? 1 : 0,
//     });

//     if (affectedRows === 0) {
//       return res.status(404).json({ success: false, message: "Address not found or not updated" });
//     }

//     res.status(200).json({ success: true, message: "Address updated successfully" });
//   } catch (error) {
//     console.error("Error updating address:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// // Delete address
// exports.deleteAddress = async (req, res) => {
//   try {
//     const { address_id } = req.params;

//     const affectedRows = await ShippingAddress.delete(address_id);
//     if (affectedRows === 0) {
//       return res.status(404).json({ success: false, message: "Address not found" });
//     }

//     res.status(200).json({ success: true, message: "Address deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting address:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// // Admin - Get all users' addresses
// exports.getAllAddresses = async (req, res) => {
//   try {
//     const addresses = await ShippingAddress.getAll();
//     res.status(200).json({
//       success: true,
//       message: "All users' addresses fetched successfully",
//       data: addresses,
//     });
//   } catch (error) {
//     console.error("Error fetching all addresses:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };


const pool = require("../config/db"); // make sure this exports a promise-based MySQL pool

// GET all addresses
exports.getAllAddresses = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM shipping_address");
    res.json({ data: rows });
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ADD address
exports.addAddress = async (req, res) => {
  try {
    let {
      user_id,
      address_label,
      recipient_name,
      phone_number,
      full_address,
      is_default
    } = req.body;

    if (!user_id) {
      user_id = 3; // Default if missing
    }

    const [result] = await pool.query(
      `INSERT INTO shipping_address (user_id, address_label, recipient_name, phone_number, full_address, is_default)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [user_id, address_label, recipient_name, phone_number, full_address, is_default || false]
    );

    res.status(201).json({
      message: "Address added successfully",
      id: result.insertId
    });
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ error: "Database error" });
  }
};

// UPDATE address
exports.updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { address_label, recipient_name, phone_number, full_address, is_default } = req.body;

    const [result] = await pool.query(
      `UPDATE shipping_address SET address_label=?, recipient_name=?, phone_number=?, full_address=?, is_default=? WHERE address_id=?`,
      [address_label, recipient_name, phone_number, full_address, is_default, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Address not found" });
    }

    res.json({ message: "Address updated successfully" });
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// DELETE address
exports.deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "DELETE FROM shipping_address WHERE address_id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Address not found" });
    }

    res.json({ message: "Address deleted successfully" });
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ error: err.message });
  }
};