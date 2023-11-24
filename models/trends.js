const mongoose = require('mongoose');

const trendSchema = mongoose.Schema({
  trend: String,
  count: Number,
});

const Trend = mongoose.model('trends', trendSchema);

module.exports = Trend;