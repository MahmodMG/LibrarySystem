const express = require("express");
const router = express.Router();
const validatorError = require("./../middleware/validation/validator");
const controller = require("../controller/loginController");
router.route("/login/member").post(validatorError, controller.login);
router.route("/login/admin").post(validatorError, controller.loginAdmin);
module.exports = router;
