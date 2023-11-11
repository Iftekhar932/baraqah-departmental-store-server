const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect(process.env.mongoDBHost, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("We're connected to the database!");
  });
};

module.exports = connectDB;
