const express = require("express");
const app = express();
const LoginController = require("../controllers/LoginController.js");

app.post("/login", LoginController);
module.exports = LoginController;
