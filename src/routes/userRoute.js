const auth = require("../middleware/auth");

const express = require("express");
const router = express.Router();
const {
  updateUser,
  deleteUser,
  getUser,
} = require("../controllers/user.controller");

router.use(auth); // Protect all routes after this middleware

router.get("/me", getUser);
router.patch("/update/me", updateUser);
router.delete("/delete/me", deleteUser);

module.exports = router;
