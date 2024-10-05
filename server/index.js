require("dotenv").config({ path: "./config/.env" });
require("./config/conn");
const path = require("path");
const express = require("express");
const UserRouter = require("./routes/user.routes");
const AuthRouter = require("./routes/auth.routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 3001;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use("/api/users", UserRouter);
app.use("/api", AuthRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
