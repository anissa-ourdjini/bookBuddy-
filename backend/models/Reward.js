const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
  type: { type: String, required: true }, // ex: badge, trophy
  name: { type: String, required: true },
  description: String,
  icon: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: { createdAt: true, updatedAt: false } });

module.exports = mongoose.model('Reward', rewardSchema);
