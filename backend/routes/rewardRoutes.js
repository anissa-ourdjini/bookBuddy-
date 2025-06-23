const express = require('express');
const router = express.Router();
const rewardController = require('../controllers/rewardController');

// [POST] /rewards/:type : Déclencher une action de gamification
router.post('/:type', rewardController.triggerReward);

module.exports = router;
