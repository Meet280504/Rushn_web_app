// // authRoutes.js
// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController');
// const {checkTokenExpiry , checkTokenRole} = require("../middleware/authMiddleware");

// router.post('/user/email/verify', authController.EmailVerify);
// router.post('/user/register' , authController.registerUser);
// router.post('/user/login', authController.userlogin);
// router.post('/user/token-verify', checkTokenExpiry , checkTokenRole(['user' , 'admin'  , 'viewer' ,'editor']) , authController.userTokenVerify);
// router.post('/user/login', authController.userlogin);
// router.put('/user/reset-password', checkTokenExpiry,  authController.resetpassword);

// router.post('/user/check/mail',  authController.checkeMail);
// router.post('/user/forget-password', checkTokenExpiry,  authController.forgetpassword);


// router.get('/user/get/all', checkTokenExpiry , checkTokenRole(['admin'  , 'viewer' ,'editor']), authController.getAllUsers);
// router.post('/user/:id', checkTokenExpiry ,  authController.getUserById);

// module.exports = router;

/// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/authController");
const { checkTokenExpiry, checkTokenRole } = require("../middleware/authMiddleware");

// 🔹 Public routes
router.post("/user/email/verify", userController.EmailVerify);
router.post("/user/register", userController.registerUser);
router.post("/user/login", userController.userlogin);

// 🔹 Authenticated routes
router.post(
  "/user/token-verify",
  checkTokenExpiry,
  checkTokenRole(["user", "admin", "viewer", "editor"]),
  userController.userTokenVerify
);

// 🔹 Admin-only routes
router.get(
  "/admin/users",
  checkTokenExpiry,
  checkTokenRole(["admin"]),
  userController.getAllUsers
);

router.get(
  "/admin/users/:userId",
  checkTokenExpiry,
  checkTokenRole(["admin"]),
  userController.getUserById
);

module.exports = router;










