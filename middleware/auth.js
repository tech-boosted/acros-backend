const jwt = require("jsonwebtoken");
const catchAsyncError = require("./catchAsyncError");
const UserModel = require("../models/userModel");

const secretKey = process.env.JWT_SECRET;

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  var token;

  if (req?.cookies?.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization) {
    var bearerToken = req.headers.authorization;
    if (bearerToken === null || bearerToken === "") {
      res.status(403).json({
        success: false,
        message: "A token is required for authentication",
      });
    }
    if (bearerToken != "" && bearerToken != undefined && bearerToken != null) {
      token = bearerToken.slice(7);
    }
  } else {
    res.status(403).json({
      success: false,
      message: "A token is required for authentication",
    });
  }

  if (!token || token === "j:null") {
    res.status(403).json({
      success: false,
      message: "Please Login to access this resource",
    });
  } else if (token) {
    const decodeData = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("decoded Data : ", decodeData);

    req.user = await UserModel.findById(decodeData.id);
    req.token = token;

    next();
  }
});

