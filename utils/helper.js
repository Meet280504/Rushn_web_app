const fs = require("fs").promises; // Use promises for async file operations
const path = require("path");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

// Helper functions
const helpers = {
  generateToken: (data, expiresIn = "7d") => {
    return jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn,
    });
  },

  decodeToken: (token) => {
    try {
      return jwt.decode(token);
    } catch (error) {
      return null;
    }
  },

  // Validate email
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email && emailRegex.test(email);
  },

  // Validate phone
  isValidPhone: (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phone && phoneRegex.test(phone);
  },

  // Delete files safely
  async deleteFiles(files, uploadDir) {
    if (!files || !Array.isArray(files)) return;

    for (const filename of files) {
      try {
        const filePath = path.join(uploadDir, filename);
        if (fs.access(filePath)) {
          await fs.unlink(filePath);
        }
      } catch (err) {
        console.error(`Error deleting file ${filename}:`, err);
      }
    }
  },

  // Send email
  async sendEmail(to, subject, html) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    return transporter.sendMail({
      from: `"No Reply" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
  },

  // Format date to MySQL format
  formatDate: (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return null;
    return date.toISOString().split("T")[0];
  },

  // Response handlers
  response: {
    success: (res, status, message, data = {}) => {
      return res.status(status).json({
        status: true,
        message,
        ...data,
      });
    },
    error: (res, status, message, error = null) => {
      return res.status(status).json({
        status: false,
        message,
        ...(process.env.NODE_ENV === "development" && error && { error }),
      });
    },
  },
};

module.exports = { helpers }; // Keep exports consistent
