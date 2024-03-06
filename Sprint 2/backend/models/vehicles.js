const vehicleSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    transmission: String,
    numberOfSeats: String,
    fuelType: String,
    baggageSpace: String,
  });
  
  const Vehicle = mongoose.model("Vehicle", vehicleScheme);
  
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
        model : model,
        type: type,
        transmission: transmission,
        numberOfSeats : numberOfSeats,
        fuelType : fuelType,
        },
        { new: true }
      );
    }
}