const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const { SECRET_KEY } = process.env;
const auth = async (req, res, next) => {
  let accessToken = req.cookies.access_token;
  if (!accessToken) throw Unauthorized("No Access Token Provided");

  const { _id } = jwt.verify(accessToken, SECRET_KEY);
  const user = await User.findById(_id);
  if (!user) throw Unauthorized("Unauthorized");

  req.user = user;
  next();
};

module.exports = auth;
