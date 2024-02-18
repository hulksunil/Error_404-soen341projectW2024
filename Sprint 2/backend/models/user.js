const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: String,
  lastName: String,
  accType: String,
  email: String,
  hashedPass: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
