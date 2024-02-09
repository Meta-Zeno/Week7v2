const { Router } = require("express");
const bookRouter = Router();
const Book = require("./model");

const { addBook } = require("./controllers");
const { findBook } = require("./controllers");
const { getFirstBook } = require("./controllers");
const { updateAuthor } = require("./controllers");

//Create a new book entry in the database using POST request function.
//##############################################
bookRouter.post("/books/addbook", addBook);
bookRouter.get("/books/findBooks", findBook);
bookRouter.get("/books/getFirstBook", getFirstBook);
bookRouter.put("/books/updateAuthor", updateAuthor);

//###############################################
//anatomy of a route

// bookRouter.httpMethod(route, fuinction)

module.exports = bookRouter;
