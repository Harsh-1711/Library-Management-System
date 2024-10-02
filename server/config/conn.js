const mongoose = require("mongoose");
const conn = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Database.");
  } catch (err) {
    console.log(err);
  }
};
conn();
