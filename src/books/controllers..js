const Book = require("./model");
//##############################################
const addBook =
  //##############################################

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

// CAN ADD NEW FUNCTIONS IE DELETE, UPDATE
module.exports = {
  //##############################################
  addBook: addBook,
  findBook: findBook,
  //##############################################
};
