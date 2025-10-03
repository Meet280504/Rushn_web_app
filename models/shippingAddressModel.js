const pool = require("../config/db");

const ShippingAddress = {
  // Get all addresses (Admin view)
  getAll: async () => {
    const [rows] = await pool.query(`
      SELECT sa.*, u.firstName AS user_name, u.email AS user_email 
      FROM shipping_address sa
      JOIN users u ON sa.user_id = u.user_id
    `);
    return rows;
  },

  // Get address by address_id
  getById: async (address_id) => {
    const [rows] = await pool.query(
      "SELECT * FROM shipping_address WHERE address_id = ?",
      [address_id]
    );
    return rows[0];
  },

  // Get all addresses by user_id
  getByUserId: async (user_id) => {
    const [rows] = await pool.query(
      "SELECT * FROM shipping_address WHERE user_id = ?",
      [user_id]
    );
    return rows;
  },

  // Get default address for a user
  getDefaultByUserId: async (user_id) => {
    const [rows] = await pool.query(
      "SELECT * FROM shipping_address WHERE user_id = ? AND is_default = 1 LIMIT 1",
      [user_id]
    );
    return rows[0];
  },

  // Create new address
  create: async (data) => {
    const {
      user_id,
      address_label,
      recipient_name,
      phone_number,
      full_address,
      is_default,
    } = data;

    // If setting default, reset existing default
    if (is_default === 1) {
      await pool.query(
        "UPDATE shipping_address SET is_default = 0 WHERE user_id = ?",
        [user_id]
      );
    }

    const [result] = await pool.query(
      `INSERT INTO shipping_address 
        (user_id, address_label, recipient_name, phone_number, full_address, is_default) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [user_id, address_label, recipient_name, phone_number, full_address, is_default]
    );

    return result.insertId;
  },

  // Update address
  update: async (address_id, data) => {
    const {
      address_label,
      recipient_name,
      phone_number,
      full_address,
      is_default,
      user_id,
    } = data;

    if (is_default === 1 && user_id) {
      await pool.query(
        "UPDATE shipping_address SET is_default = 0 WHERE user_id = ?",
        [user_id]
      );
    }

    const [result] = await pool.query(
      `UPDATE shipping_address 
       SET address_label=?, recipient_name=?, phone_number=?, full_address=?, 
           is_default=?, updated_at = CURRENT_TIMESTAMP
       WHERE address_id=?`,
      [address_label, recipient_name, phone_number, full_address, is_default, address_id]
    );
    return result.affectedRows;
  },

  // Delete address
  delete: async (address_id) => {
    const [result] = await pool.query(
      "DELETE FROM shipping_address WHERE address_id = ?",
      [address_id]
    );
    return result.affectedRows;
  },
};

module.exports = ShippingAddress;
