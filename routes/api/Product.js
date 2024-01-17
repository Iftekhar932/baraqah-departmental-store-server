const express = require("express");
const router = express.Router();
const productController = require("../../controllers/ProductController");

router.get("/getAllProductsCategoryWise/:category", productController);

module.exports = router;
