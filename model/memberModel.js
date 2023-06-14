const mongoose = require("mongoose");

const memberSchema = mongoose.Schema({
  fullName: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  book: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
});
mongoose.model("Member", memberSchema);
