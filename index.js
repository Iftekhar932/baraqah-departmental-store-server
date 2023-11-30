const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
// const corsOptions = require("./config/corsOptions.js");

// middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const authenticateJWT = require("./middlewares/authenticateJWT.js");

//  mongoose schema and database connection
const connectDB = require("./database/mongooseDB.js");
connectDB();

/* app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  
  next();
});
 */

app.use("/register", require("./controllers/registerController.js"));
app.use("/login", require("./controllers/loginController.js"));

app.use(
  "/jsonWebAccessToken",
  require("./controllers/tokenGeneratorController")
); // this one's for google or any other sign in method of firebase used in client side's "useFirebase" hook

// todo uncomment it later
// app.use(authenticateJWT);

app.use("/", require("./routes/api/adminGetUsers.js"));

app.use("/", require("./routes/api/singleProduct")); // this one has param "productId"
app.use("/", require("./routes/api/product")); // this one has param "category"
app.use("/", require("./routes/api/allProducts.js"));

app.use("/", require("./routes/api/users.js"));

app.listen(port, () => {
  console.log(`RUNNING ON PORT 👉👉 ${port}`);
});
