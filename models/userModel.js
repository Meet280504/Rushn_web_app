const db = require("../config/db");

const userModel = {
  // 🔹 Check if email already exists
  checkEmailExists: async (email) => {
    const [rows] = await db.query(
      "SELECT COUNT(*) AS emailExists FROM Users WHERE email = ?",
      [email]
    );
    return rows[0].emailExists > 0;
  },

  // 🔹 Find user by ID
  findByUserId: async (id) => {
    const [rows] = await db.query("SELECT * FROM Users WHERE user_id = ?", [id]);
    return rows[0];
  },

  // 🔹 Find user by Email
  findByEmail: async (email) => {
    const [rows] = await db.query("SELECT * FROM Users WHERE email = ?", [email]);
    return rows[0];
  },

  // 🔹 Register new user
  registerUser: async (
    firstName,
    lastName,
    dateOfBirth,
    gender,
    email,
    phone,
    password,
    role,
    isActive = true
  ) => {
    try {
      // Check if email exists
      const emailExists = await userModel.checkEmailExists(email);
      if (emailExists) {
        throw new Error("Email already registered");
      }

      const [result] = await db.query(
        `INSERT INTO Users (firstName, lastName, dateOfBirth, gender, email, phone, password, role, isActive)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [firstName, lastName, dateOfBirth, gender, email, phone, password, role, isActive]
      );

      // Return the newly created user
      return await userModel.findByUserId(result.insertId);
    } catch (error) {
      console.error("Error in registerUser:", error);
      throw error;
    }
  },

  // 🔹 Admin: Get all users
  getAllUsers: async () => {
    const [rows] = await db.query("SELECT * FROM Users");
    return rows;
  },

  // 🔹 Admin: Get single user by ID
  getUserById: async (userId) => {
    const [rows] = await db.query("SELECT * FROM Users WHERE user_id = ?", [userId]);
    return rows[0];
  },
};

module.exports = userModel;
