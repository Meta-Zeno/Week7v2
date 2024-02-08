const mongoose = require("mongoose");

const connection = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  // the below is grabbed from the mongodb server make sure to change the username and password in <> and delete the <> symbols
  console.log("DB conneciton is working");
};

module.exports = connection;
