const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
// const corsOptions = require("./config/corsOptions.js");

// middleware
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
// app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const authenticateJWT = require("./middlewares/authenticateJWT.js");

//  mongoose schema and database connection
const connectDB = require("./database/mongooseDB.js");
connectDB();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// got firebase for register/login
app.use("/register", require("./controllers/registerController.js"));
app.use("/login", require("./controllers/loginController.js"));

app.use(
  "/jsonWebAccessToken",
  require("./controllers/tokenGeneratorController")
);

app.use(authenticateJWT);
app.use("/", require("./routes/api/product")); // this one has param "category"
app.use("/", require("./routes/api/allProducts.js"));

app.use("/", require("./routes/api/users.js"));

app.listen(port, () => {
  console.log(`RUNNING ON PORT 👉👉 ${port}`);
});

/* 
* using postman it works
todo: check if it works using website



*/
