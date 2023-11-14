const express = require("express");
const productController = require("../../controllers/productController");
const router = express.Router();

router.get("/:category", productController);

module.exports = router;
