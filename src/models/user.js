const { Schema, model } = require("mongoose");
const { Unauthorized } = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      trim: true,
      required: true,
    },

    avatar: {
      type: String,
      default: "none",
    },

    token: {
      type: String,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.token;
  delete user.password;
  delete user.__v;
  return user;
};

userSchema.statics.findByCredentials = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Unauthorized("Email & password are invalid.");

  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) throw new Unauthorized("Email & password are invalid.");

  return user;
};

userSchema.methods.generateAuthToken = async function () {
  const _id = this._id.toString();
  const token = jwt.sign({ _id }, process.env.SECRET_KEY);
  this.token = token;
  await this.save();
  return token;
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

userSchema.pre("updateOne", async function (next) {
  const update = this.getUpdate();
  if (update.password) {
    update.password = await bcrypt.hash(update.password, 8);
    this.setUpdate(update);
  }
  next();
});

const User = model("User", userSchema);

module.exports = User;
