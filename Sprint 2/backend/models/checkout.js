const mongoose = require('mongoose')
const Schema = mongoose.Schema

const checkoutSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  reservationId: String,
  trait: String,
  action: String
})

const Checkout = mongoose.model('Checkout', checkoutSchema)

class CheckoutDB {
  static createCheckout (
    reservationId,
    trait,
    action
  ) {
    const checkout = new Checkout({
      _id: new mongoose.Types.ObjectId(),
      reservationId,
      trait,
      action
    })
    return checkout.save()
  }

  static findCheckoutById (id) {
    return Checkout.findById(id)
  }

  static findAllCheckouts () {
    return Checkout.find()
  }

  static deleteAllCheckouts () {
    return Checkout.deleteMany({})
  }
}

module.exports = CheckoutDB
