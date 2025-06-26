const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware d'authentification JWT
module.exports = async function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token manquant ou invalide.' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'votre_secret_jwt');
    // On peut stocker l'id utilisateur dans req.user
    req.user = { id: decoded.id };
    console.log('JWT décodé, req.user =', req.user);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalide.' });
  }
};
