const mongoose = require('mongoose');
const getNextSequence = require('../utils/counter');

const productSchema = new mongoose.Schema({
  _id: { type: Number },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  }
}, { timestamps: true });

productSchema.pre('save', async function(next) {
  if (!this._id) {
    this._id = await getNextSequence('productId');
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
