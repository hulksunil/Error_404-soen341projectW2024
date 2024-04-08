const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reservationSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId,
  carId: mongoose.Schema.Types.ObjectId,
  reservationDate: Date,
  returnDate: Date,
  location: String
})

const Reservation = mongoose.model('Reservation', reservationSchema)

class ReservationDB {
  static createReservation (userId, carId, reservationDate, returnDate, location) {
    if (returnDate <= reservationDate) {
      throw new Error('Return date must be after reservation date')
    }
    const reservation = new Reservation({
      _id: new mongoose.Types.ObjectId(),
      userId,
      carId,
      reservationDate,
      returnDate,
      location
    })
    return reservation.save()
  }

  static findReservationById (id) {
    return Reservation.findById(id)
  }

  static findAllReservations () {
    return Reservation.find()
  }

  static updateReservation (id, userId, carId, reservationDate, returnDate, location) {
    return Reservation.findByIdAndUpdate(
      id,
      {
        userId,
        carId,
        reservationDate,
        returnDate,
        location
      },
      { new: true }
    )
  }

  static deleteReservation (id) {
    return Reservation.findByIdAndDelete(id)
  }
}

module.exports = { Reservation, ReservationDB }
