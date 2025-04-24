const User = require("../models/user");

exports.updateUser = async ({ _id, ...data }) => {
  await User.updateOne({ _id }, data);
};

exports.deleteUser = async (_id) => {
  await User.deleteOne({ _id });
};

exports.findUser = async ({ email }) => {
  const user = await User.findOne({ email });
  return user;
}