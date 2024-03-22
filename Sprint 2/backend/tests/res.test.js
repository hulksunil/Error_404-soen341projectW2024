const ReservationDB = require("../models/res");
const mongoose = require("mongoose");

const dbURI =  "mongodb+srv://admin:soen341password@soen341cluster.kdvm7y4.mongodb.net/soen341_error404testdb?retryWrites=true&w=majority";

// Connect to the test database
beforeAll(async () => {
  await mongoose.connect(dbURI);
  console.log("Connected to test DB");
});

// Clear the database after each test
afterEach(async () => {
  await mongoose.connection.collections["reservations"].drop();
});

// Close the connection after all the tests are done
afterAll(async () => {
  await mongoose.connection.close();
});

// Test cases
test("Create a reservation", async () => {

  const userM = new mongoose.Types.ObjectId(123);
  const idM = new mongoose.Types.ObjectId(123456);

  const additionalServices = {
    wifi: true,
    gps: false,
    babySeat: true,
  };
  
 createdReservation = await ReservationDB.createReservation(
  userM,
  idM,
    new Date(2024, 2, 28, 13, 20),
    new Date(2024, 3, 5, 14, 40),
    "Montreal",
    "ReturnLocation",
    additionalServices
  );
  
  expect(createdReservation.userId).toBe(userM);
  expect(createdReservation.carId).toBe(idM);
  expect(createdReservation.reservationDate).toStrictEqual(new Date(2024,2,28, 13, 20));
  expect(createdReservation.returnDate).toStrictEqual(new Date(2024, 3, 5, 14, 40),);
  expect(createdReservation.location).toEqual("Montreal");
  expect(createdReservation.returnLocation).toEqual("ReturnLocation");
  expect(createdReservation.Additionalservices).toEqual(additionalServices);
});

test("Find all reservations", async () => {
  const userMM1=  new mongoose.Types.ObjectId(1231);
  const userMM2=  new mongoose.Types.ObjectId(1232);
  const idMM= new  mongoose.Types.ObjectId(123456);
  createdReservation1= await ReservationDB.createReservation(
    userMM1,
    idMM, 
    new Date(2024, 2, 28, 13, 20),
    new Date(2024, 3, 5, 14, 40),
    "Montreal",
    "NewReturnLocation",
    additionalServices
  );
  createdReservation2= await ReservationDB.createReservation(
    userMM2,
    idMM,
    new Date(2024, 2, 28, 13, 20),
    new Date(2024, 3, 5, 14, 40),
    "Montreal",
    "NewReturnLocation",
    additionalServices
  );
  const myRes=[createdReservation1,createdReservation2];
  const foundRes=await ReservationDB.findAllReservations();
  expect(foundRes.length).toStrictEqual(2);
  expect(foundRes[0].userId).toStrictEqual(myRes[0].userId);
  expect(foundRes[1].userId).toStrictEqual(myRes[1].userId);
});

test("Find a reservation by ID", async () => {
    createdReservation = await ReservationDB.createReservation(
      userM,
      idM,
        new Date(2024, 2, 28, 13, 20),
        new Date(2024, 3, 5, 14, 40),
        "Montreal",
        "NewReturnLocation",
        additionalServices
      );
      const foundRes=await ReservationDB.findReservationById(createdReservation._id);
      expect(foundRes.userId).toStrictEqual(createdReservation.userId);
});

test("Update a reservation", async () => {
    createdReservation = await ReservationDB.createReservation(
      userM,
      idM,
        new Date(2024, 2, 28, 13, 20),
        new Date(2024, 3, 5, 14, 40),
        "Montreal",
        "NewReturnLocation",
        additionalServices
      );
      updatedReservation = await ReservationDB.createReservation(
        
        userM,
        idM,
        new Date(2024, 3, 20, 17, 20),
        new Date(2024, 4, 10, 18, 20),
        "Montreal",
        "NewReturnLocation",
        additionalServices
      );
      expect(updatedReservation.userId).toBe(userM);
      expect(updatedReservation.carId).toBe(idM);
      expect(updatedReservation.reservationDate).toEqual(new Date(2024, 3, 20, 17, 20));
      expect(updatedReservation.returnDate).toEqual (new Date(2024, 4, 10, 18, 20));
      expect(updatedReservation.returnLocation).toEqual("NewReturnLocation");
      expect(updatedReservation.Additionalservices).toEqual(additionalServices);

});

test("Delete a reservation", async () => {
    createdReservation = await ReservationDB.createReservation(
      userM,
      idM,
        new Date(2024, 2, 28, 13, 20),
        new Date(2024, 3, 5, 14, 40),
        "Montreal",
        "ReturnLocation",
        additionalServices
      );
      deletedReservation=await ReservationDB.deleteReservation(createdReservation._id);
      expect(deletedReservation.userId).toEqual(createdReservation.userId);
  expect(deletedReservation.carId).toEqual(createdReservation.carId);
  expect(deletedReservation.reservationDate).toEqual(createdReservation.reservationDate);
  expect(deletedReservation.returnDate).toEqual(createdReservation.returnDate);
  expect(deletedReservation.location).toEqual(createdReservation.location);
  expect(deletedReservation.returnLocation).toEqual(createdReservation.returnLocation);
  expect(deletedReservation.Additionalservices).toEqual(createdReservation.Additionalservices);
  const foundRes= await ReservationDB.findReservationById(createdReservation._id);
  expect(foundRes).toEqual(null);
});
