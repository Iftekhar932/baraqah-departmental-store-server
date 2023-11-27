const express = require("express");
const router = express.Router();
const singleProductController = require("../../controllers/singleProductController");

router.get("/getAllProducts/:productId", singleProductController);

module.exports = router;
