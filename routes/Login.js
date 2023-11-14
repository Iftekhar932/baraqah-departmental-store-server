const express = require("express");
const app = express();
const LoginController = require("../controllers/loginController.js");

app.post("/login", LoginController);
// module.exports = LoginController;
