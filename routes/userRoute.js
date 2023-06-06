const express = require("express");
const {
  registerUser,
  loginUser,
  logOut,
} = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logOut, isAuthenticatedUser);

module.exports = router;
