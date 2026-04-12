const express = require("express");
const router = express.Router();
const { indexController } = require("./protectedController");

router.get("/", indexController);

module.exports = router;
