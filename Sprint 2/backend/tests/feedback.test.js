const FeedbackDB = require('../models/feedback')
const mongoose = require('mongoose')

const dbURI = 'mongodb+srv://admin:soen341password@soen341cluster.kdvm7y4.mongodb.net/soen341_error404testdb?retryWrites=true&w=majority'

beforeAll(async () => {
  await mongoose.connect(dbURI)
  console.log('Connected to DB')
})

afterEach(async () => {
  await mongoose.connection.collections.feedbacks.drop()
})

afterAll(async () => {
  await mongoose.connection.close()
})

test('createFeedback - create a new feedback entry', async () => {
  const feedback = await FeedbackDB.createFeedback('5', 'Great time')
  expect(feedback.rating).toBe('5')
  expect(feedback.comments).toBe('Great time')
})

test('findAllFeedback - find all feedback entries', async () => {
  await FeedbackDB.createFeedback('4', 'Good service')
  await FeedbackDB.createFeedback('3', 'I got the Batmobile!')

  const foundFeedback = await FeedbackDB.findAllFeedback()
  expect(foundFeedback.length).toBe(2)
})

test('deleteAllFeedback - delete all feedback entries', async () => {
  await FeedbackDB.createFeedback('2', 'Worst rental experience ever')
  await FeedbackDB.createFeedback('1', 'Terrible, just terrible')

  const deletedFeedback = await FeedbackDB.deleteAllFeedback()
  expect(deletedFeedback.deletedCount).toBe(2)
})
