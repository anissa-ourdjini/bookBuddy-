const Reward = require('../models/Reward');

// Déclencher une action de gamification (ajouter un badge)
exports.triggerReward = async (req, res) => {
  try {
    const { type } = req.params;
    const { description } = req.body;
    const reward = new Reward({
      type,
      description,
      userId: req.user.id
    });
    await reward.save();
    res.status(201).json(reward);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Récupérer les récompenses de l'utilisateur
exports.getUserRewards = async (req, res) => {
  try {
    const rewards = await Reward.find({ userId: req.user.id });
    res.json(rewards);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};
