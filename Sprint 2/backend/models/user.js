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

class UserDB {
  static createUser(firstName, lastName, accType, email, hashedPass) {
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      firstName: firstName,
      lastName: lastName,
      accType: accType,
      email: email,
      hashedPass: hashedPass,
    });
    return user.save();
  }
  static findUserById(id) {
    return User.findById(id);
  }

  static findAllUsers() {
    return User.find();
  }

  static updateUser(id, firstName, lastName, accType, email, hashedPass) {
    return User.findByIdAndUpdate(
      id,
      {
        firstName: firstName,
        lastName: lastName,
        accType: accType,
        email: email,
        hashedPass: hashedPass,
      },
      { new: true }
    );
  }

  // static updateUser(id, updatedUser) {
  //   return User.findByIdAndUpdate(id, updatedUser, {
  //     new: true,
  //   });
  // }

  static deleteUser(id) {
    return User.findByIdAndDelete(id);
  }

  static findUserByEmail(passedEmail){
    return User.find({email: passedEmail});
  }
}

module.exports = UserDB;
