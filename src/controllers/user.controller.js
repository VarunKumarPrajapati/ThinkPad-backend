const {
  createUser,
  updateUser,
  login,
  deleteUser,
  logOut,
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
  res.cookie("session", token, { http: true, sameSite: "None", secure: true });
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

exports.logout = async (req, res) => {
  req.user.token = "";
  await req.user.save();
  res.clearCookie("session", { http: true, sameSite: "None", secure: true });
  res.status(204).send();
};
