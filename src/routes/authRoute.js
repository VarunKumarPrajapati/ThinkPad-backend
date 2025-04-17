const router = require("express").Router();
const {
  registerUser,
  login,
  logout,
  verifyEmail,
} = require("../controllers/auth.controller");

const auth = require("../middleware/auth");

router.post("/", registerUser);
router.post("/login", login);
router.get("/verify-email", verifyEmail);

router.use(auth);
router.get("/logout", logout);

module.exports = router;
