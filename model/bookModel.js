const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: { type: String, require: true },
  auther: { type: String, require: true },
  pages: { type: Number, require: true },
  noOfCopies: { type: Number, require: true },
  shelfNo: { type: Number, require: true },
  member: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }],
});
mongoose.model("Book", bookSchema);
