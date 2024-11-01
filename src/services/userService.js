const User = require("../models/user");

exports.createUser = async ({ username, email, password }) => {
  const user = await User.create({ username, email, password });
  return user;
};

exports.login = async ({ email, password }) => {
  const user = await User.findByCredentials({ email, password });
  return user;
};

exports.updateUser = async ({ _id, ...data }) => {
  await User.updateOne({ _id }, data);
};

exports.deleteUser = async (_id) => {
  await User.deleteOne({ _id });
};
