const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/usersController.js");

router.get("/getAllUsers", usersController);

module.exports = router;
