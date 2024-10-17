const mongoose = require('mongoose');
const getNextSequence = require('../utils/counter');

const paymentSchema = new mongoose.Schema({
  _id: { type: Number },
  orderId: {
    type: Number,
    ref: 'Order',
    required: true
  },
  userId: {
    type: Number,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['completed', 'pending', 'failed'],
    default: 'pending'
  },
  transactionId: {
    type: String,
    required: true
  }
}, { timestamps: true });

paymentSchema.pre('save', async function(next) {
  if (!this._id) {
    this._id = await getNextSequence('paymentId');
  }
  next();
});

module.exports = mongoose.model('Payment', paymentSchema);
