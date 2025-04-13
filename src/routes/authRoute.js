const router = require("express").Router();
const {
  registerUser,
  login,
  logout,
} = require("../controllers/auth.controller");

const auth = require("../middleware/auth");

router.post("/", registerUser);
router.post("/login", login);

router.use(auth);
router.get("/logout", logout);

module.exports = router;
