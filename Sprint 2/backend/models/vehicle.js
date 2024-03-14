const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    model : String,
    type : String,
    transmission: String,
    numberOfSeats: String,
    fuelType: String,
  });
  
  const Vehicle = mongoose.model("Vehicle", vehicleSchema);
  
  class VehicleDB {
    static createVehicle( model, type, transmission, numberOfSeats, fuelType) {
      const vehicle = new Vehicle({
        _id: new mongoose.Types.ObjectId(),
        model : model,
        type : type,
        transmission: transmission,
        numberOfSeats : numberOfSeats,
        fuelType : fuelType,
      });
      return vehicle.save();
    }
    static findVehicleById(id) {
      return Vehicle.findById(id);
    }
  
    static findAllVehicles() {
      return Vehicle.find();
    }
  
   static updateVehicle(id,model, type, transmission, numberOfSeats, fuelType, ) {
      return Vehicle.findByIdAndUpdate(
        id,
        {
        model : model,
        type: type,
        transmission: transmission,
        numberOfSeats : numberOfSeats,
        fuelType : fuelType,
        },
        { new: true }
      );
    }

    static deleteVehicle(id) {
      return Vehicle.findByIdAndDelete(id);
    }
  }

module.exports = VehicleDB;