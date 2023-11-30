const express = require("express");
const router = express.Router();
const adminGetUsersController = require("../../controllers/adminGetUsersController.js");

router.get("/adminGetUsers", adminGetUsersController);

module.exports = adminGetUsersController;
