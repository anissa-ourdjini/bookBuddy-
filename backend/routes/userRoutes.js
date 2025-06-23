const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateJWT = require('../middleware/authenticateJWT');

// [GET] /users/:id : Récupérer le profil utilisateur
router.get('/:id', authenticateJWT, userController.getUserProfile);
// [PUT] /users/:id : Modifier le profil utilisateur
router.put('/:id', authenticateJWT, userController.updateUserProfile);

module.exports = router;
