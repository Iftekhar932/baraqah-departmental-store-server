const express = require("express");
const router = express.Router();
const productController = require("../../controllers/productController");

router.get("/:category", productController);

module.exports = router;
