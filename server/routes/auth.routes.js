const express = require("express");
const { authorizeUser } = require("../controllers/auth.controller");
const { authenticateToken } = require("../middlewares/auth");

const router = express.Router();

router.get("/auth", authenticateToken, authorizeUser);

module.exports = router;
