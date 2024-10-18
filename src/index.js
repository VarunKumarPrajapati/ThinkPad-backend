require("dotenv");
require("express-async-errors");

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

app.listen(process.env.PORT);
