require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");
const uri_DB = process.env.uri_DB;


mongoose.connect(uri_DB).then(() => console.log("connected to MongoDB"));

const app = express();
app.use(express.json());
// CRUD (create - read - update - delete)

const coursesRouter = require("./routes/coursesRoutes");

app.use("/api/courses", coursesRouter);



app.listen(4000, () => {
  console.log("listening on port: 4000");
});
