const express = require('express');
const router = express.Router();
const userController = require('../backend/controllers/userController');
const authenticateJWT = require('../backend/middleware/authenticateJWT');

// [GET] /users/me : Récupérer le profil de l'utilisateur connecté
router.get('/me', authenticateJWT, userController.getCurrentUser);
// [PUT] /users/me : Modifier le profil de l'utilisateur connecté
router.put('/me', authenticateJWT, userController.updateCurrentUser);

// [GET] /users/:id : Récupérer le profil utilisateur
router.get('/:id', userController.getUserProfile);
// [PUT] /users/:id : Modifier le profil utilisateur
router.put('/:id', userController.updateUserProfile);

module.exports = router;
