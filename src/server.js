const express = require("express");
// the above is same as import just an  older version

const app = express();

// app.get("/health", (req, res) => {
//   res.send("healthy");
// });

//static.exaple will be a folder
// app.use("/example", express.static("example"));
// when hosting, use the first <app.use("here")>, after 5001/"<inserthere"
// app.use("/anything", express.static("dbz"));

//HTTP Verbs - GET, POST, PUT, DELETE

// const responce = await fetch("http://someaddress.com");// sends GET request

const fakeArr = [];
//use json data above requests
app.use(express.json());

//HTTP Verb GET
app.get("/getAllBooks", (request, response) => {
  response.send({ message: "success", fakeArr: fakeArr });
});

app.post("/addBook", (request, response) => {
  fakeArr.push(request.body);
  console.log(fakeArr);
  response.send({ message: "success", newBook: fakeArr[fakeArr.length - 1] });
});

app.post("/book", (request, response) => {
  console.log(request.body);
  const newBook = {
    title: request.body.title,
    author: request.body.author,
    genre: request.body.genre,
  };

  fakeArr.push(newBook);

  const successResponse = {
    message: "Book successfully added!",
    book: newBook,
  };

  response.send(successResponse);
});

app.listen(5001, () => {
  console.log("Server is listening on port 5001");
});

// app.put("/books", (request, response) => {
//   console.log("fakArr", fakeArr);

// const bookToUpdate = fakeArr.find(
//   (book) => book.title === request.body.title
// );
// console.log("book to update: ", bookToUpdate);

// bookToUpdate.author = request.body.newAuthor;

// console.log("book to update: ", bookToUpdate);

// response.send({ message: "book has been updated "});
// })

// app.delete("/books", (request, response) ={
//   const bookToDelete = fakeArr.find(
//     (book) => book.title === request.body.title
//   );

//   const index = fakeArr.indexOf(bookToDelete);
//   fakeArr.splice(index, 1);

//     response.send({ message: "Book has been deleted"});
// });
//

//instructions to do after the server setup
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
