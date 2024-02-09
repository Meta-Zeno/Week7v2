const Book = require("./model");
//##############################################
const addBook =
  //############################################

  //CREATES A BOOK
  async (request, response) => {
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

const findBook = async (request, response) => {
  try {
    const books = await Book.find();
    return response.status(200).json({ data: books });
  } catch (error) {
    return response.status(400).json(error);
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

//##############################################
// CAN ADD NEW FUNCTIONS IE DELETE, UPDATE
module.exports = {
  //##############################################
  addBook: addBook,
  findBook: findBook,
  getFirstBook: getFirstBook,
  updateAuthor: updateAuthor,

  //##############################################
};
