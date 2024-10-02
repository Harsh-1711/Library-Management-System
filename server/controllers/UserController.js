const { createUser, loginUser } = require("../services/userService");

const handleSignup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await createUser({ name, email, password });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await loginUser(email, password);
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
