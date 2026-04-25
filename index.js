const express = require("express");

const mongoose = require("mongoose");
// const uri = 'mongodb+srv://ahmed:node_123@learn-mongo-db.o7bpiq4.mongodb.net/?appName=learn-mongo-DB';

const uri = 'mongodb+srv://ahmed:ahmed_123@learn-mongo-db.o7bpiq4.mongodb.net/coursesCRUD?retryWrites=true&w=majority';
mongoose.connect(uri).then(() => console.log("connected to MongoDB"));

const app = express();
app.use(express.json());
// CRUD (create - read - update - delete)

const coursesRouter = require("./routes/coursesRoutes");

app.use("/api/courses", coursesRouter);



app.listen(4000, () => {
  console.log("listening on port: 4000");
});
