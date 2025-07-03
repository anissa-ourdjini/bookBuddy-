const express = require('express');
const router = express.Router();
const { triggerReward, getUserRewards } = require('../controllers/rewardController');
const auth = require('../middleware/auth');
const Reward = require('../models/Reward');

router.post('/:type', auth, triggerReward);
router.get('/user/all', auth, getUserRewards);

// DELETE /rewards/:id - Supprimer une récompense
router.delete('/:id', auth, async (req, res) => {
  try {
    const reward = await Reward.findById(req.params.id);
    if (!reward) return res.status(404).json({ message: 'Reward not found' });
    // Optionnel : vérifier que l'utilisateur est bien le propriétaire
    if (reward.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await reward.deleteOne();
    res.json({ message: 'Reward deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
