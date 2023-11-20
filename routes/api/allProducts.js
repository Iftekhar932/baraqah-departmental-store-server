const express = require("express");
const router = express.Router();
const allProductsController = require("../../controllers/allProductsController.js");

router.get("/getAllProducts", allProductsController);

module.exports = router;
