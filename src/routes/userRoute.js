const auth = require("../middleware/auth");

const express = require("express");
const router = express.Router();
const {
  createUser,
  updateUser,
  login,
  deleteUser,
  getUser,
} = require("../controllers/user.controller");

router.get("/me", auth, getUser);
router.post("/", createUser);
router.post("/login", login);
router.patch("/update/me", auth, updateUser);
router.delete("/delete/me", auth, deleteUser);

module.exports = router;
