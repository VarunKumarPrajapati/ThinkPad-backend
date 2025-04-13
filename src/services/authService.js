const User = require("../models/user");

exports.registerUser = async ({ username, email, password }) => {
  const user = await User.create({ username, email, password });
  return user;
};

exports.login = async ({ email, password }) => {
  const user = await User.findByCredentials({ email, password });
  return user;
};
