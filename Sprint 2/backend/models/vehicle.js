const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    model : String,
    type : String,
    transmission: String,
    numberOfSeats: String,
    fuelType: String,
    url: String,
    rentalPrice: String,
    hasBluetooth: String, 
    drivetrain: String,
  });
  
  const Vehicle = mongoose.model("Vehicle", vehicleSchema);
  
  class VehicleDB {
    static createVehicle( model, type, transmission, numberOfSeats, fuelType, url, rentalPrice, hasBluetooth, drivetrain) {
      const vehicle = new Vehicle({
        _id: new mongoose.Types.ObjectId(),
        model : model,
        type : type,
        transmission: transmission,
        numberOfSeats : numberOfSeats,
        fuelType : fuelType,
        url: url,
        rentalPrice: rentalPrice,
        hasBluetooth: hasBluetooth,
        drivetrain: drivetrain,
      });
      return vehicle.save();
    }
    static findVehicleById(id) {
      return Vehicle.findById(id);
    }
  
    static findAllVehicles() {
      return Vehicle.find();
    }
    static addReservation(id, reservationId) {
      return Vehicle.findByIdAndUpdate(
        id,
        { $push: { reservations: reservationId } },
        { new: true }
      );
    }
    static removeReservation(id, reservationId) {
      return Vehicle.findByIdAndUpdate(
        id,
        { $pull: { reservations: reservationId } },
        { new: true }
      );
    }
  
   static updateVehicle(id,model, type, transmission, numberOfSeats, fuelType, url, rentalPrice, hasBluetooth,drivetrain, ) {
      return Vehicle.findByIdAndUpdate(
        id,
        {
        model : model,
        type: type,
        transmission: transmission,
        numberOfSeats : numberOfSeats,
        fuelType : fuelType,
        url : url,
        rentalPrice : rentalPrice,
        hasBluetooth : hasBluetooth,
        drivetrain : drivetrain,
        },
        { new: true }
      );
    }

    static deleteVehicle(id) {
      return Vehicle.findByIdAndDelete(id);
    }
  }

module.exports = VehicleDB;