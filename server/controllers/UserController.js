const jwt = require("jsonwebtoken");
const { findUserByEmail } = require("../repositories/userRepository");
const { createUser, loginUser } = require("../services/userService");
const UserSchema = require("../models/UserSchema");
const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcrypt");

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

const handleUpdate = async (req, res) => {
  try {
    let { name, password, img } = req.body;
    console.log("Body: ", req.body);
    const user = req.user;

    let updateFields = {}; // Initialize an object to store updated fields

    // Update name if provided
    if (name) {
      updateFields.name = name;
    }

    // Update password if provided
    if (password) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      updateFields.password = hashedPassword;
    }

    // Update avatar if provided
    console.log("Local Image: ", img);
    if (img) {
      if (user.avatar) {
        await cloudinary.uploader.destroy(
          user.avatar.split("/").pop().split(".")[0]
        );
      }
      const uploadedResponse = await cloudinary.uploader.upload(img);
      console.log(uploadedResponse);
      updateFields.avatar = uploadedResponse.secure_url;
    }

    console.log("Avatar: ", updateFields.avatar);

    // Update user in the database
    let updatedUser = await UserSchema.findByIdAndUpdate(
      user._id,
      updateFields,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    await updatedUser.save();

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the user" });
  }
};

module.exports = { handleSignup, handleLogin, handleUpdate };
