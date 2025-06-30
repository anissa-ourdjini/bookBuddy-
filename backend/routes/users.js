const express = require('express');
const router = express.Router();
const { updatePassword } = require('../controllers/userController');
const auth = require('../middleware/auth');

router.put('/:id/password', auth, updatePassword);

// Exemple : router.get('/:id', ...)

module.exports = router;
