const FormModel = require("../models/formModel");
const catchAsyncError = require("../middleware/catchAsyncError");

// creating data into the database
exports.addFormData = catchAsyncError(async (req, res, next) => {
  const formData = await FormModel.create(req.body);

  if (!formData) {
    res.status(500).json({
      success: false,
      message: "Server Error Occured",
    });
  }

  res.status(201).json({
    success: true,
    message: "Form Data uploaded successfully",
    formData,
  });
});

// get the form data
exports.getFormData = catchAsyncError(async (req, res, next) => {
  const formData = await FormModel.find();

  if (!formData) {
    res.status(404).json({
      success: false,
      message: "No Forms Found",
    });
  }
  res.status(200).json({
    success: true,
    formData,
  });
});
