const {
  createUser,
  updateUser,
  login,
  deleteUser,
} = require("../services/userService");

exports.getUser = async (req, res) => {
  res.send(req.user);
};

exports.createUser = async (req, res) => {
  const user = await createUser(req.body);
  res.status(201).send();
};

exports.login = async (req, res) => {
  const user = await login(req.body);
  const token = await user.generateAuthToken();
  res.cookie("session", token, { http: true });
  res.send();
};

exports.updateUser = async (req, res) => {
  await updateUser({ _id: req.user._id, ...req.body });
  res.send();
};

exports.deleteUser = async (req, res) => {
  await deleteUser(req.user._id);
  res.status(204).send();
};
