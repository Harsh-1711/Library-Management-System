const jwt = require("jsonwebtoken");
const { findUserByEmail } = require("../repositories/userRepository");
const { createUser, loginUser } = require("../services/userService");

const handleSignup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      console.log("check", existingUser);
      return res
        .status(400)
        .json({ success: false, message: "Email is already registered" });
    }
    const user = await createUser({ name, email, password });
    return res
      .status(201)
      .json({ success: true, message: "Signup successful" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await loginUser(email, password);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 48 * 60 * 60 * 1000,
    });
    console.log("Token set in cookie:", token);

    return res.status(200).json({ success: true, user });
  } catch (error) {
    if (error.message === "User does not exist") {
      return res
        .status(404)
        .json({ success: false, error: "User does not exist" });
    } else if (error.message === "Invalid password") {
      return res
        .status(401)
        .json({ success: false, error: "Incorrect password" });
    } else {
      return res
        .status(500)
        .json({ success: false, error: "An unexpected error occurred" });
    }
  }
};

module.exports = { handleSignup, handleLogin };
