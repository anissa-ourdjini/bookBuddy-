const express = require('express');
const router = express.Router();
const rewardController = require('../backend/controllers/rewardController');

// [GET] /rewards : Récupérer toutes les récompenses
router.get('/', rewardController.getAllRewards);

// [POST] /rewards/:type : Déclencher une action de gamification
router.post('/:type', rewardController.triggerReward);

module.exports = router;
