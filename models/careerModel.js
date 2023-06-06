const mongoose = require("mongoose");

const careerSchema = mongoose.Schema({
  category: String,
  position: String,
  shortDescription: String,
  description: String,
});

module.exports = mongoose.model("CareerModel", careerSchema);
