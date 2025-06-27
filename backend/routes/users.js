const express = require('express');
const router = express.Router();
const { updatePassword, getProfile } = require('../controllers/userController');
const auth = require('../middleware/auth');

router.put('/:id/password', auth, updatePassword);

// Route pour récupérer le profil utilisateur connecté
router.get('/me', auth, getProfile);

// Exemple : router.get('/:id', ...)

module.exports = router;
