const express = require("express");
const router = express.Router();
const validatorError = require("./../middleware/validation/validator");
const controller = require("../controller/bookController");
const { isAdmin, isMember } = require("./../middleware/auth");

router
  .route("/book")
  .get(isAdmin, validatorError, controller.getAllBooks)
  .post(isAdmin, validatorError, controller.addBook);
router
  .route("/book/admin")
  .get(isAdmin, validatorError, controller.getAvailableBook);
router
  .route("/book/title/:title")
  .get(validatorError, controller.getBookByTitle);
router
  .route("/book/auther/:auther")
  .get(validatorError, controller.getBookByTitle);
router
  .route("/book/:id")
  .get(isMember, validatorError, controller.getBorrowedBook);
module.exports = router;
