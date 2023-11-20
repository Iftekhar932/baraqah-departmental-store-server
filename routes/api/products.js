const express = require("express");
const router = express.Router();
const productsController = require("../../controllers/productsController.js");

router.get("/getAllProducts", productsController);

module.exports = router;
