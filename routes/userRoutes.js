const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// [GET] /users/:id : Récupérer le profil utilisateur
router.get('/:id', userController.getUserProfile);
// [PUT] /users/:id : Modifier le profil utilisateur
router.put('/:id', userController.updateUserProfile);

module.exports = router;
