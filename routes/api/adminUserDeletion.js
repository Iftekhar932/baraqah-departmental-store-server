const express = require("express");
const router = express.Router();
const adminUserDeletionController = require("../../controllers/adminUserDeletionController.js");

router.post("/adminUserDeletion", adminUserDeletionController);

module.exports = router;
