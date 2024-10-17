const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const getNextSequence = require('../utils/counter');

const userSchema = new mongoose.Schema({
  _id: { type: Number },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this._id) {
    this._id = await getNextSequence('userId');
  }
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
