require("dotenv").config();
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  let token = req.header("Cookie");
  if (!token) throw Unauthorized("Unauthorized");

  token = token.replace("session=", "");
  const { _id } = jwt.decode(token);
  const user = await User.findById(_id);
  if (!user) throw Unauthorized("Unauthorized");

  req.user = user;
  next();
};

module.exports = auth;
