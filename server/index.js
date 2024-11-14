require("dotenv").config({ path: "./config/.env" });
require("./config/conn");
const path = require("path");
const express = require("express");
const UserRouter = require("./routes/user.routes");
const AuthRouter = require("./routes/auth.routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;
const bodyParser = require("body-parser");
const multer = require("multer");

const port = process.env.PORT || 3001;
const app = express();
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use("/api/users", UserRouter);
app.use("/api", AuthRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
