const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId,
  carId: mongoose.Schema.Types.ObjectId,
  pickupDate: Date,
  returnDate: Date,
  pickupLocation: String, 
  returnLocation: String, 
});

const Reservation = mongoose.model("Reservation", reservationSchema);

class ReservationDB {
  static createReservation(
    userId,
    carId,
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
      userId: userId,
      carId: carId,
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
    userId,
    carId,
    reservationDate,
    returnDate,
    pickupLocation,
    returnLocation
  ) {
    return Reservation.findByIdAndUpdate(
      id,
      {
        userId: userId,
        carId: carId,
        reservationDate: reservationDate,
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

  static deleteReservationsMatchingVehicle(carId) {
    return Reservation.deleteMany({ carId: carId });
  }

  static deleteReservationsMatchingUser(userId) {
    return Reservation.deleteMany({ userId: userId });
  }
}

module.exports = ReservationDB;
