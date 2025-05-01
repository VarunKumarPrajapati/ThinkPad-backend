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

  const { token, hashedToken } = this.generateVerificationToken();

  user = await User.create({
    username,
    email,
    password,
    emailVerification: {
      token: hashedToken,
      expiry: new Date(Date.now() + 24 * 60 * 1000),
    },
  });

  await sendWelcomeMail({ to: user.email, username: user.username });
  await sendVerificationMail({
    to: user.email,
    token,
    username: user.username,
  });
  return user;
};

exports.login = async ({ email, password }) => {
  const user = await User.findByCredentials({ email, password });
  const token = await user.generateAuthToken();

  if (!user.isVerified) {
    if (!(user?.emailVerification?.expiry > new Date())) {
      const { token, hashedToken } = this.generateVerificationToken();

      user.emailVerification = {
        token: hashedToken,
        expiry: new Date(Date.now() + 24 * 60 * 1000),
      };

      await user.save();
      await sendVerificationMail({ to: user.email, token });
      throw new Unauthorized("Email is not verified & Verification Mail sent.");
    }
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
  const token = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  return { token, hashedToken };
};

exports.forgotPassword = async ({ email }) => {
  const user = await User.findOne({ email });
  if (!user) throw new NotFound("User not found with given email");

  const { token, hashedToken } = this.generateVerificationToken();

  user.resetPassword = {
    token: hashedToken,
    expiry: new Date(Date.now() + 15 * 60 * 1000),
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
