const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/TestingDb", {
      // useUnifiedTopology : true,
      // useCreateIndex :true,
    })
    .then((data) => {
      console.log("MongoDB connected with the server " + data.connection.host);
    })
    .catch((err) => {
      console.log("Error occured in MongoDB connection :: " + err);
    });
};

module.exports = connectDatabase;
