const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: {
    avatar: String,
    bio: String
  },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  rewards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reward' }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
