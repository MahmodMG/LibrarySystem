// const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

require("./model/memberModel");
require("./model/bookModel");

const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const memberRouter = require("./routes/member");
const bookRouter = require("./routes/book");
const authMW = require("./middleware/auth");

require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(express.json());
const notFoundMW = require("./middleware/404-mw");
const errorMW = require("./middleware/error-mw");

mongoose.connect("mongodb://127.0.0.1:27017/evaluate").then(() => {
  console.log(" db server connected .....");
  app.listen(8082, () => {
    console.log("8082 is listining ..............");
  });
});
app.use(registerRouter);
app.use(loginRouter);
app.use(authMW);

app.use(memberRouter);
app.use(bookRouter);

app.use(notFoundMW);
app.use(errorMW);
