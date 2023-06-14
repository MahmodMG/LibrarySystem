const { param, body } = require("express-validator");
module.exports.register = [
  body("fullName")
    .notEmpty()
    .withMessage("fullname cant be empty")
    .isAlpha()
    .withMessage("fullname must be string"),
  body("email").isEmail().withMessage("email must be email"),
  body("password").isStrongPassword().withMessage("password must be Strong"),
];
