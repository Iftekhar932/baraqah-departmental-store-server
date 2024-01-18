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

app.use("/", require("./routes/api/register.js"));
app.use("/", require("./routes/api/login.js"));
app.use("/", require("./routes/api/forgotPassword.js"));

app.use("/", require("./routes/api/tokenGenerator.js")); // this one's for google or any other sign in method of firebase used in client side's "useFirebase" hook

app.use("/", require("./routes/api/refresh.js"));

app.use(authenticateJWT);

// admin APIs
app.use("/", require("./routes/api/adminGetUsers.js"));
app.use("/", require("./routes/api/adminUserDeletion.js"));

app.use("/", require("./routes/api/singleProduct")); // this one has param "productId"
app.use("/", require("./routes/api/Product")); // this one has param "category"
app.use("/", require("./routes/api/allProducts.js"));
// app.use("/", require("./routes/api/users.js")); // ? not needed right now

app.listen(port, () => {
  console.log(`RUNNING ON PORT 👉👉 ${port}`);
});
module.exports = app;
