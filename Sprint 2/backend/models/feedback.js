const mongoose = require('mongoose')
const Schema = mongoose.Schema

const feedbackSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  rating: String,
  comments: String
})

const Feedback = mongoose.model('Feedback', feedbackSchema)

class FeedbackDB {
  static createFeedback (rating, comments) {
    const feedback = new Feedback({
      _id: new mongoose.Types.ObjectId(),
      rating,
      comments
    })
    return feedback.save()
  }

  // Find all feedback entries
  static findAllFeedback () {
    return Feedback.find()
  }

  // Delete all feedback entries
  static deleteAllFeedback () {
    return Feedback.deleteMany({})
  }
}

module.exports = FeedbackDB
