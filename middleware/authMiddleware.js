// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const { helpers } = require("../utils/helper");

const checkTokenExpiry = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return helpers.response.error(res, 400, "Authorization token missing or malformed");
  }

  const token = authHeader.split(" ")[1];

  try {
    // Fully verify token with signature
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.exp) {
      return helpers.response.error(res, 400, "Invalid token format");
    }

    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decoded.exp < currentTimestamp) {
      return helpers.response.error(res, 401, "Token has expired");
    }

    // Attach user info to request for further use
    req.user = {
      userId: decoded.userId || decoded.id, // support both field names
      role: decoded.role || "user",
      email: decoded.email || null,
    };

    next();
  } catch (err) {
    console.error("Token Verification Error:", err.message);
    return helpers.response.error(res, 401, "Invalid or expired token");
  }
};

const checkTokenRole = (role) => (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return helpers.response.error(res, 400, "Authorization token missing or malformed");
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.exp) {
      return helpers.response.error(res, 400, "Invalid token format");
    }

    const allowedRoles = Array.isArray(role) ? role : [role];

    if (!allowedRoles.includes(decoded.role)) {
      return helpers.response.error(res, 403, "Access denied: insufficient role");
    }

    req.user = {
      userId: decoded.userId || decoded.id,
      role: decoded.role,
      email: decoded.email || null,
    };

    next();
  } catch (err) {
    console.error("Token Verification Error:", err.message);
    return helpers.response.error(res, 401, "Invalid or expired token");
  }
};

module.exports = { checkTokenExpiry, checkTokenRole };
