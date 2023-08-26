const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Configure environment variables
dotenv.config();

// Setting up port
console.log(
  "process.env.MONGO_LOCAL_CONN_URL",
  process.env.MONGO_LOCAL_CONN_URL
);

let PORT = process.env.PORT || 3000;

// Creating express app and configuring middleware needed for authentication
const app = express();

app.use(cors());
app.use(express.json());
// // for parsing application/xwww-
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);

//Set up Database

mongoose.connect(process.env.MONGO_LOCAL_CONN_URL);

mongoose.connection.on("connected", () => {
  console.log("successfully connected to mongoDB");
});

mongoose.connection.on("error", () => {
  console.log("something went wrong");
  process.exit();
});

//Configure Route
require("./routes/index")(app);

//  START SERVER
app.listen(PORT, () =>
  console.log("Server running on http://localhost:" + PORT + "/")
);
