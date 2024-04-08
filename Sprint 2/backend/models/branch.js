const mongoose = require('mongoose')
const Schema = mongoose.Schema

const branchSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  locationName: String,
  long: String,
  lat: String
})

const Branch = mongoose.model('Branch', branchSchema)

class BranchDB {
  static createBranch (locationName, lat, long) {
    const branch = new Branch({
      _id: new mongoose.Types.ObjectId(),
      locationName,
      lat,
      long
    })
    return branch.save()
  }

  static findBranchById (id) {
    return Branch.findById(id)
  }

  static findAllBranches () {
    return Branch.find()
  }

  static deleteBranch (id) {
    return Branch.findByIdAndDelete(id)
  }
}

module.exports = BranchDB
