const catchAsyncError = require("../middleware/catchAsyncError");
const ResourceModel = require("../models/resourceModel");

exports.createResource = catchAsyncError(async (req, res, next) => {
  const resource = await ResourceModel.create(req.body);

  if (!resource) {
    res.status(500).json({
      success: false,
      message: "Server error occured",
    });
  }

  res.status(201).json({
    success: true,
    message: "Resource created successfully",
  });
});

exports.getAllResource = catchAsyncError(async (req, res, next) => {
  const resources = await ResourceModel.find();

  if (!resources) {
    res.status(404).json({
      success: false,
      message: "Resource doesn't exists",
    });
  }

  res.status(200).json({
    success: true,
    resources: resources,
  });
});

exports.getResource = catchAsyncError(async (req, res, next) => {
  let resource = await ResourceModel.findById(req.params.id);

  if (!resource) {
    res.status(404).json({
      success: false,
      message: "Resource doesn't exists",
    });
  }

  res.status(200).json({
    success: true,
    resource: resource,
  });
});

exports.updateResource = catchAsyncError(async (req, res, next) => {
  let resource = await ResourceModel.findById(req.params.id);

  if (!resource) {
    res.status(404).json({
      success: false,
      message: "Resource doesn't exists",
    });
  }

  resource = await ResourceModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });

  res.status(202).json({
    success: true,
    message: "Resource has been updated successfully",
    resource,
  });
});

exports.deleteResource = catchAsyncError(async (req, res, next) => {
  console.log(req.params.id);
  let resource = await ResourceModel.findByIdAndDelete(req.params.id);
  console.log(resource);

  let { title, type } = resource;

  if (!resource) {
    res.status(404).json({
      success: false,
      message: "Resource doesn't exists",
    });
  }

  res.status(200).json({
    success: true,
    message: `Resource with title : ${title} and type : ${type}`,
  });
});
