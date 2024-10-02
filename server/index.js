require("dotenv").config({ path: "./config/.env" });
require("./config/conn");
const path = require("path");
const express = require("express");
const UserRouter = require("./routes/user.routes");
const cors = require("cors");

const port = process.env.PORT || 3001;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.get("/", (req, res) => {
  return res.json({ msg: "Hello Server" });
});
app.use("/api/users", UserRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
