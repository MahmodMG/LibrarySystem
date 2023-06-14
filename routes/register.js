const express = require("express");
const router = express.Router();
const controller = require("../controller/memberController");
const validatorError = require("./../middleware/validation/validator");
const validator = require("../middleware/validation/member");
router
  .route("/register")
  .post(validator.register, validatorError, controller.register);

module.exports = router;
