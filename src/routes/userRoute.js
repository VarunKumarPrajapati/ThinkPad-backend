const auth = require("../middleware/auth");

const express = require("express");
const router = express.Router();
const {
  createUser,
  updateUser,
  login,
  deleteUser,
  getUser,
  logout,
} = require("../controllers/user.controller");

router.post("/", createUser);
router.post("/login", login);

router.use(auth); // Protect all routes after this middleware

router.get("/me", getUser);
router.patch("/update/me", updateUser);
router.delete("/delete/me", deleteUser);
router.get("/logout", logout);

module.exports = router;
