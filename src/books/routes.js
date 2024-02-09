const { Router } = require("express");
const bookRouter = Router();
const Book = require("./model");

const { getAllBooks } = require("./controllers");
const { addBook } = require("./controllers");
const { findBook } = require("./controllers");
const { getFirstBook } = require("./controllers");
const { updateAuthor } = require("./controllers");
const { findOneAndUpdate } = require("./controllers");
const { deleteResult } = require("./controllers");

//Create a new book entry in the database using POST request function.
//##############################################
bookRouter.get("/books/getAllBooks", getAllBooks);
bookRouter.post("/books/addBook", addBook);
bookRouter.get("/books/findBook", findBook);
bookRouter.get("/books/getFirstBook", getFirstBook);
bookRouter.put("/books/updateAuthor", updateAuthor);
bookRouter.put("/books/findOneAndUpdate", findOneAndUpdate);
bookRouter.delete("/books/deleteResult", deleteResult);
//###############################################
//anatomy of a route

// bookRouter.httpMethod(route, function)

module.exports = bookRouter;
