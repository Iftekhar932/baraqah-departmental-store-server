const express = require("express");
const productsController = require("../../controllers/productsController.js");
const router = express.Router();

router.get("/getAllProducts", productsController);

module.exports = router;
