const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key';

// Contrôleur d'authentification (squelette)
exports.register = (req, res) => { res.status(501).json({ message: 'Not implemented' }); };
exports.login = (req, res) => { res.status(501).json({ message: 'Not implemented' }); };
