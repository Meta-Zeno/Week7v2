const Book = require("./model");

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

// CAN ADD NEW FUNCTIONS IE DELETE, UPDATE
module.exports = {
  addBook: addBook,
};
