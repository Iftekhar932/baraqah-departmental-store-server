const express = require("express");
const router = express.Router();
const forgotPasswordController = require("../../controllers/forgotPasswordController.js");

router.post("/passwordReset", forgotPasswordController);

module.exports = router;
