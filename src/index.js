require("./database/db");
require("dotenv").config();
require("express-async-errors");

const noteRoute = require("./routes/noteRoute");

const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

app.use("/api/notes", noteRoute);

app.listen(process.env.PORT);
