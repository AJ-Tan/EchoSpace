const { body } = require("express-validator");

module.exports.validateMessage = [
  body("title").notEmpty().withMessage("Title is required."),
  body("message").notEmpty().withMessage("Message is required"),
];
