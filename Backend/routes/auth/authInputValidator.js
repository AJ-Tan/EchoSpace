const { body, validationResult } = require("express-validator");
const { findUser } = require("../../config/database/login-query");
const { admin_pw } = require("../../utils/env-variables");

const msg = {
  requiredMsg: (name) => `${name} is required.`,
  lengthMsg: (name, len) => `${name} must be atleast ${len} long.`,
};

module.exports.validateUserInformation = [
  body("firstName")
    .notEmpty()
    .withMessage(msg.requiredMsg("First Name"))
    .isLength({ min: 2 })
    .withMessage(msg.lengthMsg("First Name", 2)),
  body("lastName")
    .notEmpty()
    .withMessage(msg.requiredMsg("Last Name"))
    .isLength({ min: 2 })
    .withMessage(msg.lengthMsg("Last Name", 2)),
];

module.exports.validateLoginCredentials = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage(msg.requiredMsg("Username"))
    .isLength({ min: 4 })
    .withMessage(msg.lengthMsg("Username", 4))
    .custom(async (username, _) => {
      const user = await findUser({ username });
      if (user) throw new Error("Username already exists.");
      return true;
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage(msg.requiredMsg("Password"))
    .isLength({ min: 6 })
    .withMessage(msg.lengthMsg("Password", 6)),
  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("Confirm password is required.")
    .custom((confirmPw, { req }) => {
      const password = req.body?.password;
      const isMatch = confirmPw === password;
      if (!isMatch) throw new Error("Passwords does not match.");

      return true;
    }),
];

module.exports.validateAvatar = [
  body("avatar")
    .isIn(["1", "2", "3", "4", "5", "6"])
    .withMessage("Invalid avatar."),
];

module.exports.validateAdmin = [
  body("admin")
    .optional({ checkFalsy: true })
    .equals(admin_pw)
    .withMessage("Invalid admin password."),
];

module.exports.validateRegister = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage(msg.requiredMsg("Username"))
    .isLength({ min: 4 })
    .withMessage(msg.lengthMsg("Username", 4))
    .custom(async (username, _) => {
      const user = await findUser({ username });
      if (user) throw new Error("Username already exists.");
      return true;
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage(msg.requiredMsg("Password"))
    .isLength({ min: 6 })
    .withMessage(msg.lengthMsg("Password", 6)),
  body("confirmPassword")
    .trim()
    .notEmpty()
    .custom((confirmPw, { req }) => {
      const password = req.body?.password;
      const isMatch = confirmPw === password;
      if (!isMatch) throw new Error("Passwords does not match.");

      return true;
    }),
  body("firstName")
    .notEmpty()
    .withMessage(msg.requiredMsg("Firstname"))
    .isLength({ min: 2 })
    .withMessage(msg.lengthMsg("Firstname", 2)),
  body("lastName")
    .notEmpty()
    .withMessage(msg.requiredMsg("lastName"))
    .isLength({ min: 2 })
    .withMessage(msg.lengthMsg("lastName", 2)),
  body("admin")
    .optional({ checkFalsy: true })
    .equals(admin_pw)
    .withMessage("Invalid admin password."),
];
