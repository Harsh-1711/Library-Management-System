const jwt = require("jsonwebtoken");

const authorizeUser = (req, res) => {
  console.log("Request Received");
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ msg: "Authorized", user });
  } catch (error) {
    console.log("JWT Error:", error);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = { authorizeUser };
