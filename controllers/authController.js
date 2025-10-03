const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const { helpers } = require("../utils/helper");

// 🔹 Email verification (OTP send)
exports.EmailVerify = async (req, res) => {
  try {
    const { email } = req.body;

    if (!helpers.isValidEmail(email)) {
      return helpers.response.error(res, 400, "Valid email is required");
    }

    const verifyMail = await userModel.checkEmailExists(email);

    if (verifyMail) {
      return helpers.response.error(res, 409, "Email already registered");
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>OTP Verification</h2>
        <h1 style="color: #333; letter-spacing: 5px;">${otp}</h1>
        <p>This code will expire in 10 minutes.</p>
        <hr>
        <p style="font-size: 12px; color: #666;">
          If you didn't request this code, please ignore this email.
        </p>
      </div>
    `;

    await helpers.sendEmail(email, "Your OTP Code", html);

    const token = helpers.generateToken({ email }, "7d");

    return helpers.response.success(res, 200, "OTP sent successfully", {
      otp: hashedOtp,
      token,
    });
  } catch (err) {
    console.error("Email verify error:", err);
    return helpers.response.error(res, 500, "Failed to send OTP", {
      error: err.message,
    });
  }
};

// 🔹 Register user
exports.registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      email,
      phone,
      password,
      role = "user",
      isActive = true,
    } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return helpers.response.error(res, 400, "First name, last name, email, and password are required");
    }

    const formattedDate = helpers.formatDate(dateOfBirth);
    if (dateOfBirth && !formattedDate) {
      return helpers.response.error(res, 400, "Invalid date format. Use YYYY-MM-DD or MM-DD-YYYY");
    }

    const verifyMail = await userModel.checkEmailExists(email);
    if (verifyMail) {
      return helpers.response.error(res, 409, "Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await userModel.registerUser(
      firstName,
      lastName,
      formattedDate,
      gender,
      email,
      phone,
      hashedPassword,
      role,
      isActive
    );

    const payload = {
      userId: result.user_id,   // ✅ fixed (schema uses user_id)
      role: result.role,
    };

    const token = helpers.generateToken(payload);
    if (!token) {
      return helpers.response.error(res, 500, "Failed to generate token");
    }

    return helpers.response.success(res, 200, "User registered successfully", {
      token,
      user: result,
    });
  } catch (error) {
    console.error("Error in user register controller:", error);
    return helpers.response.error(res, 500, "Failed to register user", {
      error: error.message,
    });
  }
};

// 🔹 User login
exports.userlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return helpers.response.error(res, 400, "Email and password are required");
    }

    const user = await userModel.findByEmail(email);
    if (!user) {
      return helpers.response.error(res, 404, "Email not found");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return helpers.response.error(res, 401, "Invalid Password");
    }

    const payload = {
      userId: user.user_id,   // ✅ fixed
      role: user.role,
    };

    delete user.password;
    delete user.isActive;
    delete user.createdAt;
    delete user.updatedAt;

    const token = helpers.generateToken(payload);
    if (!token) {
      return helpers.response.error(res, 500, "Failed to generate token");
    }

    return helpers.response.success(res, 200, "Login successful", { token, user });
  } catch (error) {
    console.error("Login error:", error);
    return helpers.response.error(res, 500, "Login failed", error.message);
  }
};

// 🔹 Verify JWT token
exports.userTokenVerify = async (req, res) => {
  try {
    const user = await userModel.findByUserId(req.user.userId);

    if (!user) {
      return helpers.response.error(res, 404, "User not found");
    }

    if (!user.isActive) {
      return helpers.response.error(res, 403, "User is not active");
    }

    if (user.role === req.user.role) {
      const payload = {
        userId: user.user_id,   // ✅ fixed
        role: user.role,
      };

      delete user.password;
      delete user.isActive;
      delete user.createdAt;
      delete user.updatedAt;

      const token = helpers.generateToken(payload);
      if (!token) {
        return helpers.response.error(res, 500, "Failed to generate token");
      }

      return helpers.response.success(res, 200, "Login token verified", {
        token,
        user,
      });
    }

    return helpers.response.error(res, 403, "Access denied");
  } catch (error) {
    console.error("Token verify error:", error);
    return helpers.response.error(res, 500, "Internal server error");
  }
};

// 🔹 Admin: Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();

    if (!users || users.length === 0) {
      return helpers.response.error(res, 404, "No users found");
    }

    return helpers.response.success(res, 200, "Users fetched successfully", users);
  } catch (error) {
    console.error("Get All Users Error:", error);
    return helpers.response.error(res, 500, "Failed to fetch users", error.message);
  }
};

// 🔹 Admin: Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await userModel.getUserById(userId);

    if (!user) {
      return helpers.response.error(res, 404, "User not found");
    }

    return helpers.response.success(res, 200, "User fetched successfully", user);
  } catch (error) {
    console.error("Get User By ID Error:", error);
    return helpers.response.error(res, 500, "Failed to fetch user", error.message);
  }
};
