const UserDB = require('../models/user')
const mongoose = require('mongoose')

// NOTE: this is a test database, meaning that it is not the same as the one used in the main application
const dbURI =
  'mongodb+srv://admin:soen341password@soen341cluster.kdvm7y4.mongodb.net/soen341_error404testdb?retryWrites=true&w=majority'

// Connect to the database before running the tests
beforeAll(async () => {
  await mongoose.connect(dbURI)
  console.log('Connected to DB')
})

// Need to clear the database after each test to avoid conflicts between tests
afterEach(async () => {
  await mongoose.connection.collections.users.drop()
})

// Need to close the connection after all the tests are done to avoid Jest open handle error
afterAll(async () => {
  await mongoose.connection.close()
})

// ---------------------------------------- TESTS ----------------------------------------
test('testing createUser', async () => {
  const createdUser = await UserDB.createUser(
    'John',
    'Doe',
    'admin',
    'email',
    'password',
    'licenseNum',
    'address',
    '514-123-4567',
    new Date(1999, 1, 1)
  )

  // Tests all the fields of the created user
  expect(createdUser.firstName).toBe('John')
  expect(createdUser.lastName).toBe('Doe')
  expect(createdUser.accType).toBe('admin')
  expect(createdUser.email).toBe('email')
  expect(createdUser.hashedPass).toBe('password')
  expect(createdUser.licenseNum).toBe('licenseNum')
  expect(createdUser.address).toBe('address')
  expect(createdUser.contactNum).toBe('514-123-4567')
  expect(createdUser.dob).toStrictEqual(new Date(1999, 1, 1))
})

test('testing findAllUsers', async () => {
  const createdUser1 = await UserDB.createUser(
    'John1',
    'Doe',
    'admin',
    'email',
    'password'
  )
  const createdUser2 = await UserDB.createUser(
    'John2',
    'Doe',
    'admin',
    'email',
    'password'
  )

  const myUsers = [createdUser1, createdUser2]
  const foundUsers = await UserDB.findAllUsers()

  expect(foundUsers.length).toBe(2)
  expect(foundUsers[0].firstName).toBe(myUsers[0].firstName)
  expect(foundUsers[1].firstName).toBe(myUsers[1].firstName)
})

test('testing findUserById', async () => {
  const createdUser = await UserDB.createUser(
    'John',
    'Doe',
    'admin',
    'email',
    'password'
  )

  const foundUser = await UserDB.findUserById(createdUser._id)
  expect(foundUser.firstName).toBe(createdUser.firstName)
})

test('testing updateUser', async () => {
  const createdUser = await UserDB.createUser(
    'John',
    'Doe',
    'admin',
    'email',
    'password'
  )

  const updatedUser = await UserDB.updateUser(
    createdUser._id,
    'Jane',
    'Doe',
    'admin',
    'newEmail',
    'newPassword'
  )

  expect(updatedUser.firstName).toBe('Jane')
  expect(updatedUser.email).toBe('newEmail')
  expect(updatedUser.hashedPass).toBe('newPassword')
})

test('testing deleteUser', async () => {
  const createdUser = await UserDB.createUser(
    'John',
    'Doe',
    'admin',
    'email',
    'password'
  )

  const deletedUser = await UserDB.deleteUser(createdUser._id)
  expect(deletedUser.firstName).toBe(createdUser.firstName)
  expect(deletedUser.email).toBe(createdUser.email)
  expect(deletedUser.hashedPass).toBe(createdUser.hashedPass)

  const foundUser = await UserDB.findUserById(createdUser._id)
  expect(foundUser).toBe(null)
})
