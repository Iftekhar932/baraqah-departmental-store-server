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

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  /* res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  ); */
  next();
});

// got firebase for register/login
app.use("/register", require("./controllers/registerController.js"));
app.use("/login", require("./controllers/loginController.js"));

app.use(
  "/jsonWebAccessToken",
  require("./controllers/tokenGeneratorController")
); // this one's for google or any other sign in method of firebase used in client side's "useFirebase" hook

// todo uncomment it later
// app.use(authenticateJWT);
const firebaseAdmin = require("./firebase/firebaseAdmin.js"); // Adjust the path accordingly

app.get("/adminGetUsers", async function getAllUsers(req, res) {
  try {
    const listUsersResult = await firebaseAdmin.auth().listUsers();
    const users = listUsersResult.users;

    /* users.forEach((user) => {
      console.log("User ID:", user.uid);
      console.log("Email:", user.email);
      console.log("Display Name:", user.displayName || "N/A");
      console.log("---");
    }); */

    // Send the users as a JSON response
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error listing users:", error);

    // Handle the error and send an appropriate response
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use("/", require("./routes/api/singleProduct")); // this one has param "productId"
app.use("/", require("./routes/api/product")); // this one has param "category"
app.use("/", require("./routes/api/allProducts.js"));

app.use("/", require("./routes/api/users.js"));

app.listen(port, () => {
  console.log(`RUNNING ON PORT 👉👉 ${port}`);
});
