const express = require("express");
const authenticateJWT = require("../middlewares/authenticateJWT");
const router = express.Router();

// Public APIs
router.use("/", require("./api/register"));
router.use("/", require("./api/login"));
router.use("/", require("./api/forgotPassword"));
router.use("/", require("./api/tokenGenerator"));
router.use("/", require("./api/refresh"));

// custom middlewares to authenticate JWT
router.use(authenticateJWT);

// Admin APIs
router.use("/", require("./api/adminGetUsers"));
router.use("/", require("./api/adminUserDeletion"));

// product APIs
router.use("/", require("./api/singleProduct"));
router.use("/", require("./api/Product"));
router.use("/", require("./api/allProducts"));

module.exports = router;
