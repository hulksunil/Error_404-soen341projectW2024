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
      "Gas",
      "https://www.youtube.com/watch?v=xm3YgoEiEDc",
      "50",
      "yes",
      "Four wheel drive",
      "2017",
      "L-7285",
      "Black",
    );

    expect(createdVehicle.model).toBe("Subaru Impreza");
    expect(createdVehicle.type).toBe("Hatchback");
    expect(createdVehicle.transmission).toBe("Manual");
    expect(createdVehicle.numberOfSeats).toBe("5");
    expect(createdVehicle.fuelType).toBe("Gas");
    expect(createdVehicle.url).toBe("https://www.youtube.com/watch?v=xm3YgoEiEDc");
    expect(createdVehicle.rentalPrice).toBe("50");
    expect(createdVehicle.hasBluetooth).toBe("yes");
    expect(createdVehicle.drivetrain).toBe("Four wheel drive")
    expect(createdVehicle.year).toBe("2017");
    expect(createdVehicle.licensePlate).toBe("L-7285");
    expect(createdVehicle.color).toBe("Black");
   
  });

  test("testing findAllVehicles", async () => {
    createdVehicle1 = await VehicleDB.createVehicle(
      "Subaru Impreza",
      "Hatchback",
      "Manual",
      "5",
      "Gas",
      "https://www.youtube.com/watch?v=xm3YgoEiEDc",
      "50",
      "yes",
      "2017",
      "L-7285",
      "Black",
    );
    createdVehicle2 = await VehicleDB.createVehicle(
      "Tesla Model S",
      "Sedan",
      "Automatic",
      "4",
      "Electric",
      "https://www.youtube.com/watch?v=xm3YgoEiEDc",
      "75",
      "yes",
      "2023",
      "L-5467",
      "White",
    );
  
    const myVehicles = [createdVehicle1, createdVehicle2];
    const foundVehicles = await VehicleDB.findAllVehicles();
  
    expect(foundVehicles.length).toBe(2);
    expect(foundVehicles[0].model).toBe(myVehicles[0].model);
    expect(foundVehicles[1].model).toBe(myVehicles[1].model);
  });

    test("testing findVehicleById", async () => {
      createdVehicle = await VehicleDB.createVehicle(
        "Subaru Impreza",
        "Hatchback",
        "Manual",
        "5",
        "Gas",
        "https://www.youtube.com/watch?v=xm3YgoEiEDc",
        "50",
        "yes",
        "L-7285",
        "2017",
        "Black",
      );
    
      const foundVehicle = await VehicleDB.findVehicleById(createdVehicle._id);
      expect(foundVehicle.model).toBe(createdVehicle.model);
    });

    test("testing updateVehicle", async () => {
      createdVehicle = await VehicleDB.createVehicle(
        "Subaru Impreza",
        "Hatchback",
        "Manual",
        "5",
        "Gas",
        "https://www.youtube.com/watch?v=xm3YgoEiEDc",
        "50",
        "yes",
        "2017",
        "L-5467",
        "White",
      );
    
      updatedVehicle = await VehicleDB.updateVehicle(
        createdVehicle._id,
        "Subaru Impreza",
        "Hatchback",
        "Manual",
        "5",
        "Gas",
        "https://www.youtube.com/watch?v=xm3YgoEiEDc",
        "50",
        "yes",
        "Four wheel drive",
        "2017", 
        "L-7285",
        "Black"
      );
    
      expect(updatedVehicle.licensePlate).toBe( "L-7285");
      expect(updatedVehicle.color).toBe("Black");
    });
 
    test("testing deleteVehicle", async () => {
      createdVehicle = await VehicleDB.createVehicle(
        "Subaru Impreza",
        "Hatchback",
        "Manual",
        "5",
        "Gas",
        "https://www.youtube.com/watch?v=xm3YgoEiEDc",
        "50",
        "yes",
        "Four wheel drive",
        "2017",
        "L-7285",
        "Black",
      );
    
      deletedVehicle = await VehicleDB.deleteVehicle(createdVehicle._id);
      expect(deletedVehicle.model).toBe(createdVehicle.model);
      expect(deletedVehicle.type).toBe(createdVehicle.type);
      expect(deletedVehicle.transmission).toBe(createdVehicle.transmission);
      expect(deletedVehicle.numberOfSeats).toBe(createdVehicle.numberOfSeats);
      expect(deletedVehicle.fuelType).toBe(createdVehicle.fuelType);
      expect(deletedVehicle.url).toBe(createdVehicle.url);
      expect(deletedVehicle.rentalPrice).toBe(createdVehicle.rentalPrice);
      expect(deletedVehicle.hasBluetooth).toBe(createdVehicle.hasBluetooth);
      expect(deletedVehicle.drivetrain).toBe(createdVehicle.drivetrain);
      expect(deletedVehicle.year).toBe(createdVehicle.year);
      expect(deletedVehicle.licensePlate).toBe(createdVehicle.licensePlate);
      expect(deletedVehicle.color).toBe(createdVehicle.color);
      expect(deletedVehicle.branchId).toBe(createdVehicle.branchId);
    
      const foundVehicle = await VehicleDB.findVehicleById(createdVehicle._id);
      expect(foundVehicle).toBe(null);
    });