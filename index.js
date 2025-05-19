const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");
require("dotenv").config();
const corsOptions = require("./config/corsOptions.js");

// middlewares
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// custom middlewares
const authenticateJWT = require("./middlewares/authenticateJWT.js");

//  mongoose database connection
const connectDB = require("./database/mongooseDB.js");
connectDB();

// routes
const routes = require("./routes/routes.js");
app.use("/", routes);

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

app.listen(port, () => {
  console.log(`RUNNING ON PORT 👉👉 ${port}`);
});
module.exports = app;
