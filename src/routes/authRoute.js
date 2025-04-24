const router = require("express").Router();
const {
  registerUser,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth.controller");

const auth = require("../middleware/auth");

router.post("/", registerUser);
router.post("/login", login);
router.get("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.use(auth);
router.get("/logout", logout);

module.exports = router;
