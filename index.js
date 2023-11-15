const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");
require("dotenv").config();

// middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const authenticateJWT = require("./middlewares/authenticateJWT.js");

//  mongoose schema and database connection
const connectDB = require("./database/mongooseDB.js");
connectDB();

app.use("/register", require("./controllers/registerController.js"));
app.use("/login", require("./controllers/loginController.js"));

// app.use(authenticateJWT);

app.use("/getAllProducts", require("./routes/api/product")); // this one has param "category"
const Product = require("./Schemas/ProductSchema.js");

app.use("/getAllProducts", require("./controllers/productsController.js"));

app.get("/getAllUsers", require("./routes/api/users.js"));

app.listen(port, () => {
  console.log(`RUNNING ON PORT 👉👉 ${port}`);
});
