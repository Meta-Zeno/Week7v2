require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

//import connection from db/connection#######
const connection = require("./db/connection");
//import connection from books/router########
const bookRouter = require("./books/routes");

const app = express();

app.use(express.json());

connection();

//Use the books/router #######
app.use(bookRouter);

// DELETE MULTIPLE entry in the database using DELETEMANY> request function

app.listen(5001, () => {
  console.log("Server is listening on port 5001");
});

// // https://mongoosejs.com/docs/models.html (look at constructing documents)
// // https://mongoosejs.com/docs/api/model.html#Model.find()
// // https://mongoosejs.com/docs/api/model.html#Model.findOneAndUpdate()
// //              Or !!!!!!!!!!!!!!!!!!!!!
// // https://mongoosejs.com/docs/api/model.html#Model.updateOne()
// // https://mongoosejs.com/docs/guide.html - you'll have to look at the docs and figure this one out!
