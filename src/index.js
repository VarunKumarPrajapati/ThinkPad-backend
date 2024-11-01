require("./database/db");
require("dotenv").config();
require("express-async-errors");
const cors = require("cors");

const auth = require("./middleware/auth");

const noteRoute = require("./routes/noteRoute");
const userRoute = require("./routes/userRoute");
const error = require("./middleware/error");

const express = require("express");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://varun-thinkpad.vercel.app"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

app.use("/api/notes", auth, noteRoute);
app.use("/api/users", userRoute);
app.use(error);

app.listen(process.env.PORT);
