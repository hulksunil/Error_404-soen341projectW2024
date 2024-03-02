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
 
 createdReservation = await ReservationDB.createReservation(
    "Steve Collins",
    "123456",
    new Date(2024, 2, 28, 13, 20),
    new Date(2024, 3, 5, 14, 40),
    "Montreal"
  );

  expect(createdReservation.userId).toStrictEqual("Steve Collins");
  expect(createdReservation.carId).toEqual("123456");
  expect(createdReservation.reservationDate).toStrictEqual(new Date(2024,2,28, 13, 20));
  expect(createdReservation.returnDate).toStrictEqual(new Date(2024, 3, 5, 14, 40),);
  expect(createdReservation.location).toEqual("Montreal");
});

test("Find all reservations", async () => {
  createdReservation1= await ReservationDB.createReservation(
    "Steve Collins1",
    "123456",
    new Date(2024, 2, 28, 13, 20),
    new Date(2024, 3, 5, 14, 40),
    "Montreal"
  );
  createdReservation2= await ReservationDB.createReservation(
    "Steve Collins2",
    "123456",
    new Date(2024, 2, 28, 13, 20),
    new Date(2024, 3, 5, 14, 40),
    "Montreal"
  );
  const myRes=[createdReservation1,createdReservation2];
  const foundRes=await ReservationDB.findAllReservations();
  expect(foundRes.length).toBe(2);
  expect(foundRes[0].userId).toBe(myRes[0].userId);
  expect(foundRes[1].userId).toBe(myRes[1].userId);
});

test("Find a reservation by ID", async () => {
    createdReservation = await ReservationDB.createReservation(
        "Steve Collins",
        "123456",
        new Date(2024, 2, 28, 13, 20),
        new Date(2024, 3, 5, 14, 40),
        "Montreal"
      );
      const foundRes=await ReservationDB.findReservationById(createdReservation._id);
      expect(foundRes.userId).toEqual(createdReservation.userId);
});

test("Update a reservation", async () => {
    createdReservation = await ReservationDB.createReservation(
        "Steve Collins",
        "123456",
        new Date(2024, 2, 28, 13, 20),
        new Date(2024, 3, 5, 14, 40),
        "Montreal"
      );
      updatedReservation = await ReservationDB.createReservation(
       
        "Kevin Collins",
        "121234",
        new Date(2024, 3, 20, 17, 20),
        new Date(2024, 4, 10, 18, 20),
        "Montreal"
      );
      expect(updatedReservation.userId).toStrictEqual("Kevin Collins");
      expect(updatedReservation.carId).toEqual("121234");
      expect(updatedReservation.reservationDate).toEqual(new Date(2024, 3, 20, 17, 20));
      expect(updatedReservation.returnDate).toEqual (new Date(2024, 4, 10, 18, 20));

});

test("Delete a reservation", async () => {
    createdReservation = await ReservationDB.createReservation(
        "Steve Collins",
        "123456",
        new Date(2024, 2, 28, 13, 20),
    new Date(2024, 3, 5, 14, 40),
        "Montreal"
      );
      deletedReservation=await ReservationDB.deleteReservation(createdReservation._id);
      expect(deletedReservation.userId).toEqual(createdReservation.userId);
  expect(deletedReservation.carId).toEqual(createdReservation.carId);
  expect(deletedReservation.reservationDate).toEqual(createdReservation.reservationDate);
  expect(deletedReservation.returnDate).toEqual(createdReservation.returnDate);
  expect(deletedReservation.location).toEqual(createdReservation.location);
  const foundRes= await ReservationDB.findReservationById(createdReservation._id);
  expect(foundRes).toEqual(null);
});
