const { HttpError } = require("http-errors");

module.exports = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).send({ error: err.name, message: err.message });
  }

  if (err.code === 11000) {
    res
      .status(409)
      .send({ error: "ConflictError", message: "Email already in use." });
  }
  next();
};
