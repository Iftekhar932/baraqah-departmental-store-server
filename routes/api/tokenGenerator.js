const express = require("express");
const router = express.Router();
const tokenGeneratorController = require("../../controllers/tokenGeneratorController");

router.post("/jsonWebAccessToken", tokenGeneratorController);

module.exports = router;
