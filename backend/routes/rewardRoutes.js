const express = require('express');
const router = express.Router();
const rewardController = require('../controllers/rewardController');
const authenticateJWT = require('../middleware/authenticateJWT');

// [POST] /rewards/:type : Déclencher une action de gamification
router.post('/:type', authenticateJWT, rewardController.triggerReward);

module.exports = router;
