const jwt = require("jsonwebtoken");

const authorizeUser = (req, res) => {
  console.log("Request Received");
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const user = req.user;
    console.log("Auth User: ", user);
    return res.status(200).json({ msg: "Authorized", user: user });
  } catch (error) {
    res.clearCookie("token");
    console.log("JWT Error:", error);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      path: "/",
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ error: "Failed to log out" });
  }
};

module.exports = { authorizeUser, logoutUser };
