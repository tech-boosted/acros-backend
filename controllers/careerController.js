const catchAsyncError = require("../middleware/catchAsyncError");
const CareerModel = require("../models/careerModel");

exports.createCareer = catchAsyncError(async (req, res, next) => {
  const career = await CareerModel.create(req.body);

  if (!career) {
    res.status(500).json({
      success: false,
      message: "Server error occured.",
    });
  }

  res.status(201).json({
    success: true,
    message: "Career created successfully",
  });
});

exports.getAllCareer = catchAsyncError(async (req, res, next) => {
  const careers = await CareerModel.find();

  if (!careers) {
    res.status(404).json({
      success: false,
      message: "Career doesn't exist..",
    });
  }

  res.status(200).json({
    success: true,
    careers: careers,
  });
});

exports.getCareer = catchAsyncError(async (req, res, next) => {
  let career = await CareerModel.findById(req.params.id);

  if (!career) {
    res.status(404).json({
      success: false,
      message: "Career doesn't exist",
    });
  }

  res.status(200).json({
    success: true,
    career: career,
  });
});

exports.updateCareer = catchAsyncError(async (req, res, next) => {
  let career = await CareerModel.findById(req.params.id);

  if (!career) {
    res.status(404).json({
      success:false,
      message:"Career doesn't exist"
    })
  }

  career = await CareerModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });

  res.status(202).json({
    success: true,
    message: "career has been updated successfully",
    career,
  });
});

exports.deleteCareer = catchAsyncError(async (req, res, next) => {
  let career = await CareerModel.findByIdAndDelete(req.params.id);

  let { position, category } = career;

  if (!career) {
    res.status(404).json({
      success:false,
      message:"Career doesn't exist"
    })
  }

  res.status(200).json({
    success: true,
    message: `Career with position : "${position}" and category: "${category}" has been removed from the database`,
  });
});
