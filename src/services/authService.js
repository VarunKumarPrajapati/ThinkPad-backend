const crypto = require("crypto");
const { Conflict, Unauthorized } = require("http-errors");

const User = require("../models/user");
const { sendWelcomeMail, sendVerificationMail } = require("../emails");

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
    emailVerificationToken: hashedToken,
    emailVerificationTokenExpires: new Date(Date.now() + 10 * 60 * 1000),
  });

  sendVerificationMail({ to: user.email, token, username: user.username });
  sendWelcomeMail({ to: user.email, username: user.username });
  return user;
};

exports.login = async ({ email, password }) => {
  const user = await User.findByCredentials({ email, password });

  if (!user.isVerified) {
    throw new Unauthorized("Email is not verified");
  }

  return user;
};

exports.verifyEmail = async (token) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationTokenExpires: { $gt: Date.now() },
  });

  if (!user) throw new Unauthorized("Token is invalid or expired");

  user.isVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationTokenExpires = undefined;
  await user.save();

  return true;
};

exports.generateVerificationToken = () => {
  return crypto.randomBytes(32).toString("hex");
};
