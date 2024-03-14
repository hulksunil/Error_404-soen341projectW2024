const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userID: mongoose.Schema.Types.ObjectId, 
  carID: mongoose.Schema.Types.ObjectId, 
  pickupDate: Date,
  returnDate: Date,
  pickupLocation: String, 
  returnLocation: String, 
});

const Reservation = mongoose.model("Reservation", reservationSchema);

class ReservationDB {
  static createReservation(
    userID,
    carID,
    pickupDate,
    returnDate,
    pickupLocation,
    returnLocation
) {
    if (returnDate <= pickupDate) {
        throw new Error("Return date must be after pickup date");
    }
    const reservation = new Reservation({
      _id: new mongoose.Types.ObjectId(),
      userID: userID, 
      carID: carID, 
      pickupDate: pickupDate,
      returnDate: returnDate,
      pickupLocation: pickupLocation,
      returnLocation: returnLocation
  });
  
    return reservation.save();
}

  static findReservationById(id) {
    return Reservation.findById(id);
  }

  static findAllReservations() {
    return Reservation.find();
  }

  static updateReservation(
    id,
    userID,
    carID,
    pickupDate,
    returnDate,
    pickupLocation, 
    returnLocation
  ) {
    return Reservation.findByIdAndUpdate(
      id,
      {
        userID: userID,
        carID: carID,
        pickupDate: pickupDate,
        returnDate: returnDate,
        pickupLocation: pickupLocation, 
        returnLocation: returnLocation
      },
      { new: true }
    );
  }

  static deleteReservation(id) {
    return Reservation.findByIdAndDelete(id);
  }

  static deleteReservationsMatchingVehicle(carID) {
    return Reservation.deleteMany({ carID: carID });
  }

  static deleteReservationsMatchingUser(userID) {
    return Reservation.deleteMany({ userID: userID });
  }
}

module.exports = ReservationDB;
