const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cors = require("cors");

// routes imports
const formRoutes = require("./routes/formRoute");
const resourceRoutes = require("./routes/resourceRoute");
const careerRoutes = require("./routes/careerRoute");
const userRoutes = require("./routes/userRoute");

// middleware for json parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorMiddleware);
app.use(cors());

app.use("/api/v1", formRoutes);
app.use("/api/v1", resourceRoutes);
app.use("/api/v1", careerRoutes);
app.use("/api/v1", userRoutes);

app.use(express.static('/build'));
app.get('*', (req,res) =>{
    res.sendFile('/build/index.html');
});

module.exports = app;
