const express = require("express");
const app = express();
const RegisterController = require("../controllers/registerController.js");

app.post("/register", RegisterController);

module.exports = RegisterController;
