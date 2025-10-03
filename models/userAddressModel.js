const pool = require("../config/db");

const UserAddresses = {
  // Get all addresses
  getAll: async () => {
    const [rows] = await pool.query("SELECT * FROM user_addresses");
    return rows;
  },

  // Get address by address_id
  getById: async (address_id) => {
    const [rows] = await pool.query("SELECT * FROM user_addresses WHERE address_id = ?", [address_id]);
    return rows[0];
  },

  // Get all addresses by user_id
  getByUserId: async (user_id) => {
    const [rows] = await pool.query("SELECT * FROM user_addresses WHERE user_id = ?", [user_id]);
    return rows;
  },

  // Get default address for a user
  getDefaultByUserId: async (user_id) => {
    const [rows] = await pool.query(
      "SELECT * FROM user_addresses WHERE user_id = ? AND is_default = 1 LIMIT 1",
      [user_id]
    );
    return rows[0];
  },

  // Create new address
  create: async (data) => {
    const { user_id, address_label, recipient_name, phone_number, full_address, is_default, address_url } = data;

    // if setting default, reset existing default
    if (is_default === 1) {
      await pool.query("UPDATE user_addresses SET is_default = 0 WHERE user_id = ?", [user_id]);
    }

    const [result] = await pool.query(
      `INSERT INTO user_addresses 
        (user_id, address_label, recipient_name, phone_number, full_address, is_default, address_url) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [user_id, address_label, recipient_name, phone_number, full_address, is_default, address_url]
    );
    return result.insertId;
  },

  // Update address
  update: async (address_id, data) => {
    const { address_label, recipient_name, phone_number, full_address, is_default, address_url, user_id } = data;

    if (is_default === 1 && user_id) {
      await pool.query("UPDATE user_addresses SET is_default = 0 WHERE user_id = ?", [user_id]);
    }

    const [result] = await pool.query(
      `UPDATE user_addresses 
       SET address_label=?, recipient_name=?, phone_number=?, full_address=?, 
           is_default=?, address_url=?, updated_at = CURRENT_TIMESTAMP
       WHERE address_id=?`,
      [address_label, recipient_name, phone_number, full_address, is_default, address_url, address_id]
    );
    return result.affectedRows;
  },

  // Delete address
  delete: async (address_id) => {
    const [result] = await pool.query("DELETE FROM user_addresses WHERE address_id = ?", [address_id]);
    return result.affectedRows;
  },
};

module.exports = UserAddresses;
