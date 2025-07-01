const mongoose = require('mongoose');
const Reward = require('./models/Reward');
const User = require('./models/User');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/BookBuddy';

async function restoreRewards() {
  await mongoose.connect(MONGODB_URI);
  const users = await User.find();
  for (const user of users) {
    const rewards = [
      { type: 'badge', description: '50 books read', img: 'cw.jpg', userId: user._id },
      { type: 'badge', description: '100 books read', img: 'M.jpg', userId: user._id },
      { type: 'badge', description: '150 books read', img: 'rl.png', userId: user._id },
      { type: 'badge', description: "300 books read - Maître de l'horreur", img: 'mh.jpg', userId: user._id },
    ];
    for (const reward of rewards) {
      // Évite les doublons
      const exists = await Reward.findOne({ userId: user._id, description: reward.description });
      if (!exists) {
        await Reward.create(reward);
      }
    }
  }
  console.log('Rewards restored for all users!');
  await mongoose.disconnect();
}

restoreRewards().catch(err => {
  console.error(err);
  process.exit(1);
}); 