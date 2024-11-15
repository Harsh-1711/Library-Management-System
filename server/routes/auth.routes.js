const express = require("express");
const { authorizeUser, logoutUser } = require("../controllers/auth.controller");
const { authenticateToken } = require("../middlewares/auth");

const router = express.Router();

router.get("/auth", authenticateToken, authorizeUser);
router.get("/logout", authenticateToken, logoutUser);

module.exports = router;
