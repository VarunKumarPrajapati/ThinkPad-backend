const crypto = require("crypto");
const { Conflict, Unauthorized, NotFound } = require("http-errors");

const User = require("../models/user");
const {
  sendWelcomeMail,
  sendVerificationMail,
  sendResetPasswordMail,
} = require("../emails");

exports.registerUser = async ({ username, email, password }) => {
  let user = await User.findOne({
    email,
  });

  if (user) throw new Conflict("Email already in use.");

  const token = this.generateVerificationToken();
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  user = await User.create({
    username,
    email,
    password,
    emailVerification: {
      token: hashedToken,
      expiry: new Date(Date.now() + 10 * 60 * 1000),
    },
  });

  sendVerificationMail({ to: user.email, token, username: user.username });
  sendWelcomeMail({ to: user.email, username: user.username });
  return user;
};

exports.login = async ({ email, password }) => {
  const user = await User.findByCredentials({ email, password });
  const token = await user.generateAuthToken();

  if (!user.isVerified) {
    throw new Unauthorized("Email is not verified");
  }

  return { user, token };
};

exports.verifyEmail = async (token) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    "emailVerification.token": hashedToken,
    "emailVerification.expiry": { $gt: Date.now() },
  });

  if (!user) throw new Unauthorized("Token is invalid or expired");

  user.isVerified = true;
  user.emailVerification = undefined;
  await user.save();

  return true;
};

exports.generateVerificationToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

exports.forgotPassword = async ({ email }) => {
  const user = await User.findOne({ email });
  if (!user) throw new NotFound("User not found with given email");

  const token = this.generateVerificationToken();

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  user.resetPassword = {
    token: hashedToken,
    expiry: new Date(Date.now() + 10 * 60 * 1000),
  };
  await user.save();
  await sendResetPasswordMail({ to: email, token });
};

exports.resetPassword = async ({ password, token }) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    "resetPassword.token": hashedToken,
    "resetPassword.expiry": { $gt: Date.now() },
  });

  if (!user) throw new Unauthorized("Token expired or invalid");

  user.password = password;
  user.resetPassword = undefined;
  await user.save();
};
