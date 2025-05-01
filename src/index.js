require("dotenv").config();
require("express-async-errors");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const auth = require("./middleware/auth");

const noteRoute = require("./routes/noteRoute");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const error = require("./middleware/error");

const corsOptions = require("./config/cors");

const express = require("express");
const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/notes", auth, noteRoute);

app.use(error);

require("./database/db");
app.listen(process.env.PORT);
