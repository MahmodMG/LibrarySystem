const mongoose = require("mongoose");
const Book = mongoose.model("Book");
const Member = mongoose.model("Member");

exports.getAllMembers = (req, res, next) => {
  // admin
  Member.find()
    .then((member) => {
      res.status(200).json(member);
    })
    .catch((error) => {
      next(error);
    });
};

exports.register = (req, res, next) => {
  // member
  Member.create(req.body)
    .then((member) => {
      res.status(201).json(member);
    })
    .catch((error) => {
      next(error);
    });
};

exports.getMemberBorrowing = (req, res, next) => {
  // member
  Member.find({ book: { $size: 1 } })
    .then((member) => {
      res.status(201).json(member);
    })
    .catch((error) => {
      next(error);
    });
};
exports.borrow = (req, res, next) => {
  console.log("***********");
  //req.params.id:{$all:member}

  Book.updateMany(
    {
      title: req.body.title,
      noOfCopies: { $gt: 1 },
      member: { $not: { $all: req.params.id } },
    },
    { $inc: { noOfCopies: -1 }, $addToSet: { member: req.params.id } }
  )
    .then((book) => {
      if (book.modifiedCount == 1) {
        res.status(201).json("u can borrow the book");
      } else {
        res.status(201).json("the book is already with u");
      }
    })
    .catch((error) => {
      next(error);
    });
};
exports.return = (req, res, next) => {
  // admin
  Book.updateOne(
    { title: req.body.title, member: { $all: req.params.id } },
    { $inc: { noOfCopies: +1 }, $pull: { member: req.params.id } }
  )
    .then((book) => {
      if (book.modifiedCount == 1) {
        res.status(201).json("u return the book");
      } else {
        res.status(201).json("the book is not borrowed");
      }
    })
    .catch((error) => {
      next(error);
    });
};
