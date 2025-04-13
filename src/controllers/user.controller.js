const {
  createUser,
  updateUser,
  login,
  deleteUser,
  logOut,
} = require("../services/userService");

// const sendWelcomeMail = require("../emails/services/welcomeService");

exports.getUser = async (req, res) => {
  res.send(req.user);
};

exports.createUser = async (req, res) => {
  const user = await createUser(req.body);
  res.status(201).send();
  // sendWelcomeMail({ to: user.email, username: user.username });
};

exports.login = async (req, res) => {
  const user = await login(req.body);
  const token = await user.generateAuthToken();

  const tokenOption = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax",
    maxAge: 15 * 60 * 1000,
    domain: process.env.DOMAIN,
    path: "/",
  };
  res.cookie("access_token", token, tokenOption);
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
  res.clearCookie("access_token", {
    http: true,
    sameSite: "None",
    secure: true,
  });
  res.status(204).send();
};
