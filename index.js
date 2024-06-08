const express = require("express");
const app = express();
const port = 3000;

require("dotenv").config();

const cors = require("cors"); // Import the cors middleware

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_PW);

//check if the connection is established
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connection Successful!");
});

//import the routes
const renovationsRouter = require("./routes/api/v1/renovations");
const promotorsRouter = require("./routes/api/v1/promotors");
const users = require("./routes/api/v1/users");
const userRenovation = require("./routes/api/v1/userRenovation");
const locationRouter = require("./routes/api/v1/locations");
const tasksRouter = require("./routes/api/v1/tasks");
const reviewsRouter = require("./routes/api/v1/reviews");

//json body parser
app.use(express.json());
app.use(cors()); // Use the cors middleware
app.use("/api/v1/users", users);
app.use("/api/v1/renovations", renovationsRouter);
app.use("/api/v1/promotors", promotorsRouter);
app.use("/api/v1/", userRenovation);
app.use("/api/v1/locations", locationRouter);
app.use("/api/v1/tasks", tasksRouter);
app.use("/api/v1/reviews", reviewsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
