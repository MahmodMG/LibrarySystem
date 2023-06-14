const mongoose = require("mongoose");
const Book = mongoose.model("Book");
const Member = mongoose.model("Member");

exports.getAllBooks = (req, res, next) => {
  // admin
  Book.find()
    .then((book) => {
      res.status(200).json(book);
    })
    .catch((error) => {
      next(error);
    });
};

exports.addBook = (req, res, next) => {
  // admin
  Book.create(req.body)
    .then((book) => {
      res.status(201).json(book);
    })
    .catch((error) => {
      next(error);
    });
};

exports.getBorrowedBook = (req, res, next) => {
  // member
  Book.find({ member: req.params.id })
    .then((book) => {
      res.status(200).json(book);
    })
    .catch((error) => {
      next(error);
    });
};

exports.getBookByTitle = (req, res, next) => {
  // member
  console.log("sdadsad");
  Book.findOne({
    $or: [{ title: req.params.title }, { auther: req.params.auther }],
  })
    .then((book) => {
      res.status(200).json(book);
    })
    .catch((error) => {
      next(error);
    });
};

exports.getAvailableBook = (req, res, next) => {
  // admin
  Book.find({ noOfCopies: { $gt: 1 } })
    .then((book) => {
      res.status(200).json(book);
    })
    .catch((error) => {
      next(error);
    });
};
