const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
require("dotenv").config();

// middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const authenticateJWT = require("./middlewares/authenticateJWT.js");

// controllers
const LoginController = require("./controllers/LoginController.js");
const RegisterController = require("./controllers/RegisterController.js");

//  mongoose schema and database connection
const Product = require("./Schemas/ProductSchema.js");
const UserSchema = require("./Schemas/UserSchema.js");
const connectDB = require("./database/mongooseDB.js");
connectDB();

app.use("/register", RegisterController);
app.use("/login", LoginController);

// app.use(authenticateJWT);

app.get("/getAllProducts", require("./routes/api/products"));

app.get("/getAllUsers", require("./routes/api/users.js"));

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});
