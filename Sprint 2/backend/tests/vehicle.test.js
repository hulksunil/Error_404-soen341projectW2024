const VehicleDB = require("../models/vehicle");
const mongoose = require("mongoose");

const dbURI =
  "mongodb+srv://admin:soen341password@soen341cluster.kdvm7y4.mongodb.net/soen341_error404testdb?retryWrites=true&w=majority";

  beforeAll(async () => {
    await mongoose.connect(dbURI);
    console.log("Connected to DB");
  });

  afterEach(async () => {
    await mongoose.connection.collections["vehicles"].drop();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("testing createVehicle", async () => {
    createdVehicle = await VehicleDB.createVehicle(
      "Subaru Impreza",
      "Hatchback",
      "Manual",
      "5",
      "Gas"
    );

    expect(createdVehicle.model).toBe("Subaru Impreza");
    expect(createdVehicle.type).toBe("Hatchback");
    expect(createdVehicle.transmission).toBe("Manual");
    expect(createdVehicle.numberOfSeats).toBe("5");
    expect(createdVehicle.fuelType).toBe("Gas");
  });

  test("testing findAllVehicles", async () => {
    createdVehicle1 = await VehicleDB.createVehicle(
      "Subaru Impreza",
      "Hatchback",
      "Manual",
      "5",
      "Gas"
    );
    createdVehicle2 = await VehicleDB.createVehicle(
      "Tesla Model S",
      "Sedan",
      "Automatic",
      "4",
      "Electric"
    );
  
    const myVehicles = [createdVehicle1, createdVehicle2];
    const foundVehicles = await VehicleDB.findAllVehicles();
  
    expect(foundVehicles.length).toBe(2);
    expect(foundVehicles[0].model).toBe(myVehicles[0].model);
    expect(foundVehicles[1].model).toBe(myVehicles[1].model);
  });