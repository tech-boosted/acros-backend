const mongoose = require("mongoose");

const resourceSchema = mongoose.Schema({

  type: String,
  title: String,
  imgSrc: String,
  shortDescription: String,
  description: String,
  date:String
});

const ResourceModel = mongoose.model("ResourceModel", resourceSchema);
module.exports = ResourceModel;
