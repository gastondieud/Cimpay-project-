const mongoose = require('mongoose');
const getNextSequence = require('../utils/counter');

const orderSchema = new mongoose.Schema({
  _id: { type: Number },
  userId: { type: Number, ref: 'User', required: true },
  products: [{ 
    productId: { type: Number, ref: 'Product' },
    quantity: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'pending' }
}, { timestamps: true });

orderSchema.pre('save', async function(next) {
  if (!this._id) {
    this._id = await getNextSequence('orderId');
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
