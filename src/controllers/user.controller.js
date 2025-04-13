const { updateUser, deleteUser } = require("../services/userService");

exports.getUser = async (req, res) => {
  res.send(req.user);
};

exports.updateUser = async (req, res) => {
  await updateUser({ _id: req.user._id, ...req.body });
  res.send();
};

exports.deleteUser = async (req, res) => {
  await deleteUser(req.user._id);
  res.status(204).send();
};
