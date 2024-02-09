const Book = require("./model");

//Get All Books
const getAllBooks = async (request, response) => {
  try {
    const books = await Book.find({});
    response.json({ message: "success all the books", books: books });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

//CREATES A BOOK
const addBook = async (request, response) => {
  try {
    const book = await Book.create({
      title: request.body.title,
      author: request.body.author,
      genre: request.body.genre,
    });
    console.log("book: ", book);
    response.send({ message: "successfully created a new book", book: book });
  } catch (error) {
    response.send({ message: "its gone pete tong", error: error });
  }
};

const getFirstBook = async (request, response) => {
  try {
    const books = await Book.find();
    return response.status(200).json({ data: books[0] });
  } catch (error) {
    return response.status(400).json(error);
  }
};

const updateAuthor = async (request, response) => {
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
};

const findOneAndDelete = async (request, response) => {
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
};

const deleteResult = async (request, response) => {
  try {
    const deleteResult = await Book.deleteMany();
    return response
      .status(200)
      .json({ message: "All books deleted successfully", data: deleteResult });
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
};

//##############################################
// CAN ADD NEW FUNCTIONS IE DELETE, UPDATE
module.exports = {
  //##############################################
  getAllBooks: getAllBooks,
  addBook: addBook,
  getFirstBook: getFirstBook,
  updateAuthor: updateAuthor,
  findOneAndDelete: findOneAndDelete,
  deleteResult: deleteResult,

  //##############################################
};
