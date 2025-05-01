const {
  registerUser,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../services/authService");

exports.registerUser = async (req, res) => {
  await registerUser(req.body);
  res.status(201).send();
};

exports.login = async (req, res) => {
  const { token } = await login(req.body);
  const isProd = process.env.NODE_ENV === "production";
  const tokenOption = {
    httpOnly: true,
    sameSite: isProd ? "None" : "Lax",
    secure: isProd,
  };

  res.cookie("access_token", token, tokenOption);
  res.send();
};

exports.logout = async (req, res) => {
  req.user.token = "";
  await req.user.save();
  const isProd = process.env.NODE_ENV === "production";
  const tokenOption = {
    httpOnly: true,
    sameSite: isProd ? "None" : "Lax",
    secure: isProd,
  };
  res.clearCookie("access_token", tokenOption);
  res.status(204).send();
};

exports.verifyEmail = async (req, res) => {
  await verifyEmail(req.query.token);
  res.status(204).send();
};

exports.forgotPassword = async (req, res) => {
  await forgotPassword(req.body);
  res.status(204).send();
};

exports.resetPassword = async (req, res) => {
  await resetPassword(req.body);
  res.status(204).send();
};
