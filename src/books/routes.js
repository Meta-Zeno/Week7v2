const { Router } = require("express");
const bookRouter = Router();
const Book = require("./model");

const { addBook } = require(".controllers");

//Create a new book entry in the database using POST request function.
bookRouter.post("/books/addbook", addBook);

//anatomy of a route

// bookRouter.httpMethod(route, fuinction)

module.exports = bookRouter;
