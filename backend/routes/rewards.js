const express = require('express');
const router = express.Router();
const { triggerReward, getUserRewards } = require('../controllers/rewardController');
const auth = require('../middleware/auth');

router.post('/:type', auth, triggerReward);
router.get('/user/all', auth, getUserRewards);

module.exports = router;
