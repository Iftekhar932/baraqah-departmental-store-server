const mongoose = require("mongoose");
const uri = `mongodb+srv://${process.env.mongoUSR}:${process.env.mongoPWD}@cluster0.hgty8ov.mongodb.net/${process.env.dbName}?retryWrites=true&w=majority`;

const connectDB = () => {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("We're connected to the database 👍👍👍!");
  });
};

module.exports = connectDB;
