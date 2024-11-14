const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");

async function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedUser.id).select("-password");

    req.user = user;

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(403).json({ error: "Unauthorized" });
  }
}

module.exports = { authenticateToken };
