const app = require("./app");
const dotenv = require("dotenv");

const connectDatabase = require("./database/connect");

// config for env variables
// dotenv.config({ path: "./config/config.env" });
dotenv.config({ path: ".env" });

// database connection
connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(
    `Sever is working on the http://localhost:${process.env.PORT}`
  );
});
