const mongoose = require("mongoose");

const formSchema = mongoose.Schema({
  category: String,
  name: {
    type: String,
    required: [true, "Please enter the  name"],
  },
  email: {
    type: String,
    required: [true, "Please enter the email"],
  },
  phoneNumber: {
    type: Number,
  },
  city: String,
  qualification: String,
  file: String,
  position: String,
  experience: String,
  description: String,
  website: String,
}
, {
  timestamps: true,
});

module.exports = mongoose.model("FormModel", formSchema);
