const { Router } = require("express");
const bookRouter = Router();
const Book = require("./model");

const { addBook, findBooks } = require(".controllers");

//Create a new book entry in the database using POST request function.
//##############################################
bookRouter.post("/books/addbook", addBook);
bookRouter.get("/books/findBooks", findBooks);
//###############################################
//anatomy of a route

// bookRouter.httpMethod(route, fuinction)

module.exports = bookRouter;
