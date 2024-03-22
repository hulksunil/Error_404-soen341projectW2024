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
  address: String,
  contactNum: String,
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
    address,
    contactNum,
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
      address: address,
      contactNum: contactNum,
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
    address,
    contactNum,
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
        address: address,
        contactNum: contactNum,
        dob: dob,
        reservations: reservations,
      },
      { new: true }
    );
  }

  // Add a reservation to a user (using an update query to push the reservation id to the user's reservations array)
  static addReservation(id, reservationId) {
    return User.findByIdAndUpdate(
      id,
      { $push: { reservations: reservationId } },
      { new: true }
    );
  }
  static removeReservation(id, reservationId) {
    return User.findByIdAndUpdate(
      id,
      { $pull: { reservations: reservationId } },
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
