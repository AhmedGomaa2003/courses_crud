require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");
const httpStatusText = require("./utils/httpStatusText");
const port = process.env.port;
const uri_DB = process.env.uri_DB;
const cors = require("cors");


mongoose.connect(uri_DB).then(() => console.log("connected to MongoDB"));
  
const app = express();
app.use(express.json());
app.use(cors());
// CRUD (create - read - update - delete)

const coursesRouter = require("./routes/coursesRoutes");
const usersRouter = require("./routes/usersRoutes");
app.use("/api/courses", coursesRouter);
app.use("/api/users", usersRouter);

// global error handling for undefined routes and 
app.all('{*splat}', (req, res) => {
  res.status(404).json({ status: httpStatusText.ERROR, data: null, message: "Route not found", code: 404 });
})

// global error handling for async functions
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ status: err.statusText || httpStatusText.ERROR, data: null, message: err.message, code: err.statusCode || 500 });
});



app.listen(process.env.port || 4000, () => {
  console.log("listening on port: 4000");
});

