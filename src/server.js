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

app.listen(5001, () => {
  console.log("Server is listening on port 5001");
});
