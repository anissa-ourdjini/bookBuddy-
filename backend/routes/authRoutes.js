const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// [POST] /auth/register : Créer un compte utilisateur
router.post('/register', authController.register);
// [POST] /auth/login : Authentifier un utilisateur
router.post('/login', authController.login);

module.exports = router;
