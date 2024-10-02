const User = require("../models/UserSchema");

const saveUser = async (userData) => {
  const user = new User(userData);

  try {
    return await user.save();
  } catch (error) {
    console.error("Error saving user to the database:", error);
    throw new Error("Error saving user");
  }
};

const findUserByEmail = async (email) => {
  // console.log("Searching for user in MongoDB with email:", email);

  try {
    return await User.findOne({ email });
  } catch (error) {
    console.error("Error finding user in the database:", error);
    throw new Error("Error finding user");
  }
};

module.exports = { saveUser, findUserByEmail };
