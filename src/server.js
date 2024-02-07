require("dotenv").config();
const express = require("express");
// const { default: mongoose } = require("mongoose");
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

app.put("/books", (request, reponse) => {});

app.delete("/books", (request, response) => {});

app.listen(5001, () => {
  console.log("Server is listening on port 5001");
});

// MICHAELS WORKS

// const express = require("express");
// const mongoose = require("mongoose");

// const app = express();

// app.use(express.json());

// const connection = async () => {
//   await mongoose.connect("");
//   console.log("DB connection is working");
// };

// connection();

// // mongoose docs: https://mongoosejs.com/docs/guide.html

// const bookSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   author: {
//     type: String,
//   },
//   genre: {
//     type: String,
//   },
// });

// const Book = mongoose.model("Book", bookSchema);

// const logTypeOfResult = async (result) => {
//   console.log(`Typeof result: ${typeof result} - result: ${result}`);
// };

// // https://mongoosejs.com/docs/models.html (look at constructing documents)
// // Add a single book to the db
// app.post("/books", (request, response) => {
//   // Add a single book to the db
// });

// // https://mongoosejs.com/docs/api/model.html#Model.find()
app.get("/books/getAllBooks", async (request, response) => {
  //   // get all books from the db
  const books = await Book.find({});
  response.send({ message: "success all the books", books: books });
});

// // https://mongoosejs.com/docs/api/model.html#Model.findOneAndUpdate()
// //              Or !!!!!!!!!!!!!!!!!!!!!
// // https://mongoosejs.com/docs/api/model.html#Model.updateOne()
// app.put("/books", (request, reponse) => {
//   // update a single book's author by title
// });

// // https://mongoosejs.com/docs/guide.html - you'll have to look at the docs and figure this one out!
// app.delete("/books", (request, response) => {});

// app.listen(5001, () => {
//   console.log("Server is listening on port 5001");
// });
