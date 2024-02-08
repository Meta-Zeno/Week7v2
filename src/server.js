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

//Get book by using <FIND> request function
app.get("/books/getfirstbook", async (request, response) => {
  try {
    const books = await Book.find();
    return response.status(200).json({ data: books[0] });
  } catch (error) {
    return response.status(400).json(error);
  }
});

//UPDATE a new book entry in the database using PUT request function.
app.put("/books/updateAuthor", async (request, response) => {
  try {
    const title = request.body.title;
    const updatedAuthor = request.body.author;

    // Find the book by title and update the author
    const updatedBook = await Book.findOneAndUpdate(
      { title: title },
      { $set: { author: updatedAuthor } },
      { new: true }
    );

    if (!updatedBook) {
      return response.status(404).send({ message: "Error: Book not found" });
    }

    response.send({ message: "Success: Author updated", book: updatedBook });
  } catch (error) {
    response.status(500).send({ message: "Error: Unable to update author" });
  }
});

// DELETE a book entry in the database using DELETE request function.
app.delete("/books", async (request, response) => {
  try {
    const deleteResult = await Book.findOneAndDelete({
      title: request.body.title,
    });
    return response.status(200).json({
      message: "You have deleted a book successfully",
      data: deleteResult,
    });
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
});

// DELETE MULTIPLE entry in the database using DELETEMANY> request function.
app.delete("/books", async (request, response) => {
  try {
    const deleteResult = await Book.deleteMany();
    return response
      .status(200)
      .json({ message: "All books deleted successfully", data: deleteResult });
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
});

app.listen(5001, () => {
  console.log("Server is listening on port 5001");
});

// // https://mongoosejs.com/docs/models.html (look at constructing documents)
// // https://mongoosejs.com/docs/api/model.html#Model.find()
// // https://mongoosejs.com/docs/api/model.html#Model.findOneAndUpdate()
// //              Or !!!!!!!!!!!!!!!!!!!!!
// // https://mongoosejs.com/docs/api/model.html#Model.updateOne()
// // https://mongoosejs.com/docs/guide.html - you'll have to look at the docs and figure this one out!
