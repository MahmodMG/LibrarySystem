const mongoose = require("mongoose");
const Member = mongoose.model("Member");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.loginAdmin = (req, res, next) => {
  if (
    req.body.email !== "admin@a.a" ||
    !bcrypt.compareSync(
      req.body.password,
      "$2a$12$GAi4.X2W1GHbvEx5ypF3MeuESh2Ul48B1CCgTauJgOXfRv5diuD2m"
    )
  ) {
    let error = new Error("Email or password is wrong!!");
    error.status = 401;
    next(error);
  } else {
    let token = jwt.sign(
      {
        role: "admin",
      },
      process.env.secretJWT,
      { expiresIn: "72h" }
    );
    res.status(200).json({ message: "ok", token });
  }
};

exports.login = (req, res, next) => {
  Member.findOne({ email: req.body.email })
    .then((user) => {
      if (!user || user.password !== req.body.password) {
        let error = new Error("Email or password is wrong!!");
        error.status = 401;
        next(error);
      } else {
        console.log("sadsa");
        let token = jwt.sign(
          {
            id: user._id,
            role: "user",
          },
          process.env.secretJWT,
          { expiresIn: "72h" }
        );
        res.status(200).json({ message: "ok", token });
      }
    })
    .catch((error) => {
      next(error);
    });
};
