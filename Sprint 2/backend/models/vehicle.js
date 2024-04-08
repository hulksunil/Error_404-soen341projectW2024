const mongoose = require('mongoose')
const Schema = mongoose.Schema

const vehicleSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  model: String,
  type: String,
  transmission: String,
  numberOfSeats: String,
  fuelType: String,
  url: String,
  rentalPrice: String,
  hasBluetooth: String,
  drivetrain: String,
  year: String,
  licensePlate: String,
  color: String,
  branchId: mongoose.Schema.Types.ObjectID
})

const Vehicle = mongoose.model('Vehicle', vehicleSchema)

class VehicleDB {
  static createVehicle (
    model,
    type,
    transmission,
    numberOfSeats,
    fuelType,
    url,
    rentalPrice,
    hasBluetooth,
    drivetrain,
    year,
    licensePlate,
    color,
    branchId
  ) {
    const vehicle = new Vehicle({
      _id: new mongoose.Types.ObjectId(),
      model,
      type,
      transmission,
      numberOfSeats,
      fuelType,
      url,
      rentalPrice,
      hasBluetooth,
      drivetrain,
      year,
      licensePlate,
      color,
      branchId
    })
    return vehicle.save()
  }

  static findVehicleById (id) {
    return Vehicle.findById(id)
  }

  static findAllVehicles () {
    return Vehicle.find()
  }

  static addReservation (id, reservationId) {
    return Vehicle.findByIdAndUpdate(
      id,
      { $push: { reservations: reservationId } },
      { new: true }
    )
  }

  static removeReservation (id, reservationId) {
    return Vehicle.findByIdAndUpdate(
      id,
      { $pull: { reservations: reservationId } },
      { new: true }
    )
  }

  static updateVehicle (
    id,
    model,
    type,
    transmission,
    numberOfSeats,
    fuelType,
    url,
    rentalPrice,
    hasBluetooth,
    drivetrain,
    year,
    licensePlate,
    color,
    branchId
  ) {
    return Vehicle.findByIdAndUpdate(
      id,
      {
        model,
        type,
        transmission,
        numberOfSeats,
        fuelType,
        url,
        rentalPrice,
        hasBluetooth,
        drivetrain,
        year,
        licensePlate,
        color,
        branchId
      },
      { new: true }
    )
  }

  static deleteVehicle (id) {
    return Vehicle.findByIdAndDelete(id)
  }
}

module.exports = VehicleDB
