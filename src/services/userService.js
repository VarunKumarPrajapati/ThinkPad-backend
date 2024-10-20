const User = require("../models/user");

exports.createUser = async ({ username, email, password }) => {
  const user = await User.create({ username, email, password });
  return user;
};

exports.login = async ({ email, password }) => {
  const user = await User.findByCredentials({ email, password });
  return user;
};

exports.updateUser = async ({ _id, username, email, password }) => {
  await User.updateOne({ _id }, { username, email, password });
};

exports.deleteUser = async (_id) => {
  await User.deleteOne({ _id });
};
