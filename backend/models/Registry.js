const mongoose = require('mongoose')

const registrySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    item: {
      type: String,
      required: [true, 'Please add a text value'],
    },
    price: {
      type: Number, 
    }, 
    description: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Registry', registrySchema)