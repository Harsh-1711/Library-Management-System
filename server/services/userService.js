const bcrypt = require("bcrypt");
const { saveUser, findUserByEmail } = require("../repositories/userRepository");

const createUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = await saveUser({ ...userData, password: hashedPassword });
  return user;
};

const loginUser = async (email, password) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("User does not exist");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error("Invalid password");
  }

  return user;
};

module.exports = { createUser, loginUser };
