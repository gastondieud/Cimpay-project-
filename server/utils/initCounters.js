const Counter = require('../models/Counter');

async function initializeCounters() {
  const counters = ['productId', 'userId', 'orderId'];
  for (const counterId of counters) {
    const counter = await Counter.findById(counterId);
    if (!counter) {
      await new Counter({ _id: counterId, seq: 0 }).save();
      console.log(`${counterId} counter initialized`);
    }
  }
}

module.exports = initializeCounters;

