const CheckoutDB = require("../models/checkout");
const mongoose = require("mongoose");

// NOTE: this is a test database, meaning that it is not the same as the one used in the main application
const dbURI =
  "mongodb+srv://admin:soen341password@soen341cluster.kdvm7y4.mongodb.net/soen341_error404testdb?retryWrites=true&w=majority";

// Connect to the database before running the tests
beforeAll(async () => {
  await mongoose.connect(dbURI);
  console.log("Connected to DB");
});

// Need to clear the database after each test to avoid conflicts between tests
afterEach(async () => {
  await mongoose.connection.collections["checkouts"].drop();
});

// Need to close the connection after all the tests are done to avoid Jest open handle error
afterAll(async () => {
  await mongoose.connection.close();
});

//---------------------------------------- TESTS ----------------------------------------
test("testing createCheckout", async () => {
  checkout = await CheckoutDB.createCheckout(
    "reservationId",
    "trait",
    "action"
  );

  // Tests all the fields of the created user
  expect(checkout.reservationId).toBe("reservationId");
  expect(checkout.trait).toBe("trait");
  expect(checkout.action).toBe("action");
});

test("testing findAllCheckouts", async () => {
  createdCheckout1 = await CheckoutDB.createCheckout(
    "reservationId1",
    "trait1",
    "action1"
  );

  createdCheckout2 = await CheckoutDB.createCheckout(
    "reservationId2",
    "trait2",
    "action2"
  );

  const myCheckouts = [createdCheckout1, createdCheckout2];
  const foundCheckouts = await CheckoutDB.findAllCheckouts();

  expect(foundCheckouts.length).toBe(2);
  expect(foundCheckouts[0].reservationId).toBe(myCheckouts[0].reservationId);
  expect(foundCheckouts[1].reservationId).toBe(myCheckouts[1].reservationId);
});

test("testing findCheckoutById", async () => {
  createdCheckout = await CheckoutDB.createCheckout(
    "reservationId",
    "trait",
    "action"
  );

  const foundCheckouts = await CheckoutDB.findCheckoutById(createdCheckout._id);
  expect(foundCheckouts.reservationId).toBe(createdCheckout.reservationId);
});

test("testing deleteAllCheckout", async () => {
  createdCheckout1 = await CheckoutDB.createCheckout(
    "reservationId",
    "trait",
    "action"
  );

  createdCheckout2 = await CheckoutDB.createCheckout(
    "reservationId",
    "trait",
    "action"
  );
  const deletedCheckouts = await CheckoutDB.deleteAllCheckouts();
  expect(deletedCheckouts.deletedCount).toBe(2);
});
