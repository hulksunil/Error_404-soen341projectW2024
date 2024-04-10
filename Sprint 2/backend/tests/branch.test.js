const BranchDB = require('../models/branch')
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
  await mongoose.connection.collections.branches.drop()
})

// Need to close the connection after all the tests are done to avoid Jest open handle error
afterAll(async () => {
  await mongoose.connection.close()
})

// ---------------------------------------- TESTS ----------------------------------------
test('testing createBranch', async () => {
  const branch = await BranchDB.createBranch(
    'locationName',
    '0123123',
    '5435432'
  )

  // Tests all the fields of the created branch
  expect(branch.locationName).toBe('locationName')
  expect(branch.lat).toBe('0123123')
  expect(branch.long).toBe('5435432')
})

test('testing findAllBranches', async () => {
  const createdBranch1 = await BranchDB.createBranch(
    'locationName1',
    '0123123',
    '5435432'
  )

  const createdBranch2 = await BranchDB.createBranch(
    'locationName2',
    '0123123',
    '5435432'
  )

  const myBranches = [createdBranch1, createdBranch2]
  const foundBranches = await BranchDB.findAllBranches()

  expect(foundBranches.length).toBe(2)
  expect(foundBranches[0].locationName).toBe(myBranches[0].locationName)
  expect(foundBranches[1].locationName).toBe(myBranches[1].locationName)
})

test('testing findBranchById', async () => {
  const createdBranch = await BranchDB.createBranch(
    'locationName',
    '0123123',
    '5435432'
  )

  const foundBranches = await BranchDB.findBranchById(createdBranch._id)
  expect(foundBranches.locationName).toBe(createdBranch.locationName)
})

test('testing deleteBranch', async () => {
  const createBranch = await BranchDB.createBranch(
    'locationName',
    '0123123',
    '5435432'
  )

  const deletedBranch = await BranchDB.deleteBranch(createBranch._id)
  expect(deletedBranch.locationName).toBe(createBranch.locationName)
  expect(deletedBranch.lat).toBe(createBranch.lat)
  expect(deletedBranch.long).toBe(createBranch.long)

  const foundBranch = await BranchDB.findBranchById(createBranch._id)
  expect(foundBranch).toBe(null)
})
