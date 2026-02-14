const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  food: { type: String, required: true },
  grams: { type: Number, required: true },
  mode: { type: String, enum: ['normal', 'diabetes', 'pre-diabetes', 'weight-loss'], required: true },
  nutrition: {
    carbsPerServing: Number,
    servingSizeInGrams: Number,
    totalCarbs: Number
  },
  decision: { type: String, enum: ['Comfortable', 'Moderate', 'High'], required: true },
  score: Number,
  message: String,
  timestamp: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Log', LogSchema);
