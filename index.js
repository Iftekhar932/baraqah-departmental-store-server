const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
require("dotenv").config();

// middleware
const authenticateJWT = require("./middlewares/authenticateJWT.js");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//  mongoose schema and database connection
const Product = require("./Schemas/ProductSchema.js");
const connectDB = require("./database/mongooseDB.js");
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(authenticateJWT);

app.get("/getAllProducts", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});
