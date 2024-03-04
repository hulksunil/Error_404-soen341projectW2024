const vehicleSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    transmission: String,
    numberOfSeats: String,
    fuelType: String,
    baggageSpace: String,
  });
  
  const Vehicle = mongoose.model("Vehicle", vehicleScheme);
  
  class VehicleDB {
    static createVehicle(transmission, numberOfSeats, fuelType, baggageSpace) {
      const user = new Vehicle({
        _id: new mongoose.Types.ObjectId(),
        transmission: transmission,
        numberOfSeats : numberOfSeats,
        fuelType : fuelType,
        baggageSpace: baggageSpace,
      });
      return Vehicle.save();
    }
    static findVehicleById(id) {
      return Vehicle.findById(id);
    }
  
    static findAllVehicles() {
      return Vehicle.find();
    }
  
   static updateVehicle(transmission, numberOfSeats, fuelType, baggageSpace) {
      return Vehicle.findByIdAndUpdate(
        id,
        {
          transmission: transmission,
        numberOfSeats : numberOfSeats,
        fuelType : fuelType,
        baggageSpace: baggageSpace,
        },
        { new: true }
      );
    }
}