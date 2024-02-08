require("dotenv").config();
const express = require("express");

const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const connection = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  // the below is grabbed from the mongodb server make sure to change the username and password in <> and delete the <> symbols
  console.log("DB conneciton is working");
};

connection();

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
  },
  genre: {
    type: String,
  },
});

const Book = mongoose.model("Book", bookSchema);

app.get("/books", async (request, response) => {
  try {
    const books = await Book.find();
    return response.status(200).json({ data: books });
  } catch (error) {
    return response.status(400).json(error);
  }
});

app.get("/books/getfirstbook", async (request, response) => {
  try {
    const books = await Book.find();
    return response.status(200).json({ data: books[0] });
  } catch (error) {
    return response.status(400).json(error);
  }
});

app.post("/books", async (request, response) => {
  const book = await Book.create({
    title: request.body.title,
    author: request.body.author,
    genre: request.body.genre,
  });
  console.log("book: ", book);
  response.send({ message: "successfully created a new book", book: book });
  //PUT THE BELOW AFTER BOOK.CREATE({PLACE IT HERE!!!!})
  // try {
  //   const newBook = await Book.create(request.body);
  //   return response.status(201).json(newBook);
  // } catch (error) {
  //   return response.status(400).json(error);
  // }
});

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
