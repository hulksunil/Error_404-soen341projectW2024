const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: String,
  lastName: String,
  accType: String,
  email: String,
  hashedPass: String,
  licenseNum: String,
  dob: Date,
  reservations: [{ type: Schema.Types.ObjectId, ref: "Reservation" }],
});

const User = mongoose.model("User", userSchema);

class UserDB {
  static createUser(
    firstName,
    lastName,
    accType,
    email,
    hashedPass,
    licenseNum,
    dob
  ) {
    if (dob >= Date.now()) {
      throw new Error("Date of valid birth must be in the past");
    }
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      firstName: firstName,
      lastName: lastName,
      accType: accType,
      email: email,
      hashedPass: hashedPass,
      licenseNum: licenseNum,
      dob: dob,
      reservations: [],
    });
    return user.save();
  }
  static findUserById(id) {
    return User.findById(id);
  }

  static findAllUsers() {
    return User.find();
  }

  static updateUser(
    id,
    firstName,
    lastName,
    accType,
    email,
    hashedPass,
    licenseNum,
    dob,
    reservations
  ) {
    return User.findByIdAndUpdate(
      id,
      {
        firstName: firstName,
        lastName: lastName,
        accType: accType,
        email: email,
        hashedPass: hashedPass,
        licenseNum: licenseNum,
        dob: dob,
        reservations: reservations,
      },
      { new: true }
    );
  }

  static deleteUser(id) {
    return User.findByIdAndDelete(id);
  }

  static findUserByEmail(passedEmail) {
    return User.find({ email: passedEmail });
  }
}

module.exports = UserDB;
