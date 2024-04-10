const ReservationDB = require('../models/res')
const mongoose = require('mongoose')

const dbURI =
  'mongodb+srv://admin:soen341password@soen341cluster.kdvm7y4.mongodb.net/soen341_error404testdb?retryWrites=true&w=majority'

// Connect to the test database
beforeAll(async () => {
  await mongoose.connect(dbURI)
  console.log('Connected to test DB')
})

// Clear the database after each test
afterEach(async () => {
  await mongoose.connection.collections.reservations.drop()
})

// Close the connection after all the tests are done
afterAll(async () => {
  await mongoose.connection.close()
})

const userIdMock = new mongoose.Types.ObjectId(123)
const carIdMock = new mongoose.Types.ObjectId(123456)

const additionalServices = {
  portableWiFi: true,
  gps: false,
  childSafetySeats: true
}

// Test cases
test('Create a reservation', async () => {
  const createdReservation = await ReservationDB.createReservation(
    userIdMock,
    carIdMock,
    new Date(2024, 2, 28, 13, 20),
    new Date(2024, 3, 5, 14, 40),
    'Montreal',
    'ReturnLocation',
    additionalServices
  )

  expect(createdReservation.userId).toBe(userIdMock)
  expect(createdReservation.carId).toBe(carIdMock)
  expect(createdReservation.reservationDate).toStrictEqual(
    new Date(2024, 2, 28, 13, 20)
  )
  expect(createdReservation.returnDate).toStrictEqual(
    new Date(2024, 3, 5, 14, 40)
  )
  expect(createdReservation.location).toEqual('Montreal')
  expect(createdReservation.returnLocation).toEqual('ReturnLocation')
  expect(createdReservation.additionalServices).toEqual(additionalServices)
})

test('Find all reservations', async () => {
  const userMM1 = new mongoose.Types.ObjectId(1231)
  const userMM2 = new mongoose.Types.ObjectId(1232)
  const idMM = new mongoose.Types.ObjectId(123456)
  const createdReservation1 = await ReservationDB.createReservation(
    userMM1,
    idMM,
    new Date(2024, 2, 28, 13, 20),
    new Date(2024, 3, 5, 14, 40),
    'Montreal',
    'NewReturnLocation',
    additionalServices
  )
  const createdReservation2 = await ReservationDB.createReservation(
    userMM2,
    idMM,
    new Date(2024, 2, 28, 13, 20),
    new Date(2024, 3, 5, 14, 40),
    'Montreal',
    'NewReturnLocation',
    additionalServices
  )
  const myRes = [createdReservation1, createdReservation2]
  const foundRes = await ReservationDB.findAllReservations()
  expect(foundRes.length).toStrictEqual(2)
  expect(foundRes[0].userId).toStrictEqual(myRes[0].userId)
  expect(foundRes[1].userId).toStrictEqual(myRes[1].userId)
})

test('Find a reservation by ID', async () => {
  const createdReservation = await ReservationDB.createReservation(
    userIdMock,
    carIdMock,
    new Date(2024, 2, 28, 13, 20),
    new Date(2024, 3, 5, 14, 40),
    'Montreal',
    'NewReturnLocation',
    additionalServices
  )
  const foundRes = await ReservationDB.findReservationById(
    createdReservation._id
  )
  expect(foundRes.userId).toStrictEqual(createdReservation.userId)
})

test('Update a reservation', async () => {
  const createdReservation = await ReservationDB.createReservation(
    userIdMock,
    carIdMock,
    new Date(2024, 2, 28, 13, 20),
    new Date(2024, 3, 5, 14, 40),
    'Montreal',
    'OldReturnLocation',
    additionalServices
  )
  const updatedReservation = await ReservationDB.updateReservation(
    createdReservation._id,
    userIdMock,
    carIdMock,
    new Date(2024, 3, 20, 17, 20),
    new Date(2024, 4, 10, 18, 20),
    'Montreal',
    'NewReturnLocation',
    additionalServices
  )

  const newFoundReservation = await ReservationDB.findReservationById(
    createdReservation._id
  )

  expect(newFoundReservation.userId).toStrictEqual(updatedReservation.userId)
  expect(newFoundReservation.carId).toStrictEqual(updatedReservation.carId)
  expect(newFoundReservation.reservationDate).toEqual(
    updatedReservation.reservationDate
  )
  expect(newFoundReservation.returnDate).toEqual(updatedReservation.returnDate)
  expect(newFoundReservation.returnLocation).toEqual(
    updatedReservation.returnLocation
  )
  expect(newFoundReservation.additionalServices).toEqual(additionalServices)
})

test('Delete a reservation', async () => {
  const createdReservation = await ReservationDB.createReservation(
    userIdMock,
    carIdMock,
    new Date(2024, 2, 28, 13, 20),
    new Date(2024, 3, 5, 14, 40),
    'Montreal',
    'ReturnLocation',
    additionalServices
  )
  const deletedReservation = await ReservationDB.deleteReservation(
    createdReservation._id
  )
  expect(deletedReservation.userId).toEqual(createdReservation.userId)
  expect(deletedReservation.carId).toEqual(createdReservation.carId)
  expect(deletedReservation.reservationDate).toEqual(
    createdReservation.reservationDate
  )
  expect(deletedReservation.returnDate).toEqual(createdReservation.returnDate)
  expect(deletedReservation.location).toEqual(createdReservation.location)
  expect(deletedReservation.returnLocation).toEqual(
    createdReservation.returnLocation
  )
  expect(deletedReservation.additionalServices).toEqual(
    createdReservation.additionalServices
  )
  const foundRes = await ReservationDB.findReservationById(
    createdReservation._id
  )
  expect(foundRes).toEqual(null)
})
