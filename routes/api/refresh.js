const express = require("express");
const router = express.Router();
const refreshController = require("../../controllers/refreshController");

router.get("/refresh", refreshController);

module.exports = router;
