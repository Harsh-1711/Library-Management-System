const express = require("express");
const router = express.Router();
const {
  handleSignup,
  handleLogin,
  handleUpdate,
} = require("../controllers/UserController.js");
const { authenticateToken } = require("../middlewares/auth.js");

router.post("/signup", handleSignup);
router.post("/login", handleLogin);
router.post("/updateProfile", authenticateToken, handleUpdate);

module.exports = router;
