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
const userM=  new mongoose.Types.ObjectId(123);
const idM= new  mongoose.Types.ObjectId(123456);
// Test cases
test("Create a reservation", async () => {

  
 createdReservation = await ReservationDB.createReservation(
    userM,
    idM,
    new Date(2024, 2, 28, 13, 20),
    new Date(2024, 3, 5, 14, 40),
    "Montreal",
    "Toronto"
  );

  


  expect(createdReservation.userID).toBe(userM);
  expect(createdReservation.carID).toBe(idM);
  expect(createdReservation.pickupDate).toStrictEqual(new Date(2024,2,28, 13, 20));
  expect(createdReservation.returnDate).toStrictEqual(new Date(2024, 3, 5, 14, 40),);
  expect(createdReservation.pickupLocation).toEqual("Montreal");
  expect(createdReservation.returnLocation).toEqual("Toronto");
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
    "Toronto"
  );
  createdReservation2= await ReservationDB.createReservation(
    userMM2,
    idMM,
    new Date(2024, 2, 28, 13, 20),
    new Date(2024, 3, 5, 14, 40),
    "Montreal",
    "Toronto"
  );
  const myRes=[createdReservation1,createdReservation2];
  const foundRes=await ReservationDB.findAllReservations();
  expect(foundRes.length).toStrictEqual(2);
  expect(foundRes[0].userID).toStrictEqual(myRes[0].userID);
  expect(foundRes[1].userID).toStrictEqual(myRes[1].userID);
});

test("Find a reservation by ID", async () => {
    createdReservation = await ReservationDB.createReservation(
      userM,
      idM,
        new Date(2024, 2, 28, 13, 20),
        new Date(2024, 3, 5, 14, 40),
        "Montreal",
        "Toronto"
      );
      const foundRes=await ReservationDB.findReservationById(createdReservation._id);
      expect(foundRes.userID).toStrictEqual(createdReservation.userID);
});

test("Update a reservation", async () => {
    createdReservation = await ReservationDB.createReservation(
      userM,
      idM,
        new Date(2024, 2, 28, 13, 20),
        new Date(2024, 3, 5, 14, 40),
        "Montreal",
        "Toronto"
      );
      updatedReservation = await ReservationDB.createReservation(
        
        userM,
        idM,
        new Date(2024, 3, 20, 17, 20),
        new Date(2024, 4, 10, 18, 20),
        "Montreal",
        "Toronto"
      );
      expect(updatedReservation.userID).toBe(userM);
      expect(updatedReservation.carID).toBe(idM);
      expect(updatedReservation.pickupDate).toEqual(new Date(2024, 3, 20, 17, 20));
      expect(updatedReservation.returnDate).toEqual (new Date(2024, 4, 10, 18, 20));

});

test("Delete a reservation", async () => {
    createdReservation = await ReservationDB.createReservation(
      userM,
      idM,
      new Date(2024, 2, 28, 13, 20),
      new Date(2024, 3, 5, 14, 40),
      "Montreal",
      "Toronto"
      );
      deletedReservation=await ReservationDB.deleteReservation(createdReservation._id);
      expect(deletedReservation.userID).toEqual(createdReservation.userID);
  expect(deletedReservation.carID).toEqual(createdReservation.carID);
  expect(deletedReservation.pickupDate).toEqual(createdReservation.pickupDate);
  expect(deletedReservation.returnDate).toEqual(createdReservation.returnDate);
  expect(deletedReservation.pickupLocation).toEqual(createdReservation.pickupLocation);
  expect(deletedReservation.returnLocation).toEqual(createdReservation.returnLocation);
  const foundRes= await ReservationDB.findReservationById(createdReservation._id);
  expect(foundRes).toEqual(null);
});
