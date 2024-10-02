const express = require("express");
const router = express.Router();
const {
  handleSignup,
  handleLogin,
} = require("../controllers/UserController.js");

//Sign-up
// console.log("I m in route");
router.post("/signup", handleSignup);

//login
router.post("/login", handleLogin);

module.exports = router;
