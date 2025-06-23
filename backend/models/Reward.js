const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
  type: { type: String, required: true }, // badge, succès, etc.
  description: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Reward', rewardSchema);
