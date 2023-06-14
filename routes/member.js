const express = require("express");
const router = express.Router();
const validatorError = require("./../middleware/validation/validator");
const controller = require("../controller/memberController");
const { isAdmin, isMember } = require("./../middleware/auth");

router.route("/member").get(isAdmin, validatorError, controller.getAllMembers);
router
  .route("/member/borrowed")
  .get(isAdmin, validatorError, controller.getMemberBorrowing);
router
  .route("/member/borrow/:id")
  .get(isAdmin, validatorError, controller.borrow);
router
  .route("/member/return/:id")
  .get(isAdmin, validatorError, controller.return);
module.exports = router;
