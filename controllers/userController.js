const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/sendToken");
const jwt = require("jsonwebtoken");

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { body } = req;
  const { id } = body;

  const user = await User.findOne({ id });
  if (user) {
    res.status(409).json({
      success: false,
      message: "User already exist",
    });
  } else {
    const registeredUser = await User.create(req.body);
    const token = registeredUser.getJWTToken();
    res.status(200).json({
      success: true,
      token,
      registeredUser,
    });
  }
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { id, password } = req.body;
  if (!id || !password) {
    res.status(400).json({
      success: false,
      message: "Please enter both email and password",
    });
  }

  const user = await User.findOne({ id });

  if (!user) {
    res.status(401).json({
      success: false,
      message: "Invalid id and password",
    });
  }
  if (password !== user.password) {
    res.status(401).json({
      success: false,
      message: "Invalid id and password",
    });
  }
  if (id === "techOne@boosted.in" && password === "password123") {
    sendToken(user, 200, res);
  } else {
    res.status(404).json({
      success: false,
      message: "Invalid id or password",
    });
  }
});

exports.logOut = catchAsyncError(async (req, res, next) => {
  var bearerToken = req.headers.authorization;
  var token = bearerToken.slice(7);

  jwt.sign(token, "", { expiresIn: 1 }, (logout, err) => {
    if (logout) {
      res.cookie("token", "");
      res.status(200);
      res.json({ success: true, message: "You have been Logged Out" });
    } else {
      res.send({ msg: "Error" });
    }
  });
});
