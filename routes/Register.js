const express = require("express");
const app = express();
const RegisterController = require("../controllers/RegisterController.js");

app.post("/register", RegisterController);

module.exports = RegisterController;
