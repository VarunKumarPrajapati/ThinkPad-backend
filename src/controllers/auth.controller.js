const { registerUser, login } = require("../services/authService");

exports.registerUser = async (req, res) => {
  const user = await registerUser(req.body);
  res.status(201).send();
  // sendWelcomeMail({ to: user.email, username: user.username });
};

exports.login = async (req, res) => {
  const user = await login(req.body);
  const token = await user.generateAuthToken();

  const tokenOption = {
    domain: process.env.DOMAIN,
    httpOnly: true,
    maxAge: 15 * 60 * 1000,
    path: "/",
    sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax",
    secure: process.env.NODE_ENV === "production",
  };

  res.cookie("access_token", token, tokenOption);
  res.send();
};

exports.logout = async (req, res) => {
  req.user.token = "";
  await req.user.save();
  res.clearCookie("access_token", {
    domain: process.env.DOMAIN,
    httpOnly: true,
    path: "/",
    sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax",
    secure: process.env.NODE_ENV === "production",
  });
  res.status(204).send();
};
