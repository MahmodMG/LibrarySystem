const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token = req.get("Authorization");
  if (!token) {
    let error = new Error("Not have token!!");
    error.status = 403;
    next(error);
  } else {
    req.decodedToken = jwt.verify(token.split(" ")[1], process.env.secretJWT);
    next();
  }
};

module.exports.isAdmin = (req, res, next) => {
  if (req.decodedToken.role === "admin") {
    next();
  } else {
    let error = new Error("Not authorized!!");
    error.status = 403;
    next(error);
  }
};

module.exports.isMember = (req, res, next) => {
  if (req.decodedToken.role === "user") {
    next();
  } else {
    let error = new Error("Not authorized!!");
    error.status = 403;
    next(error);
  }
};
