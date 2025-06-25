const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware d'authentification JWT
module.exports = async function authenticateJWT(req, res, next) {
  console.log('Authorization header:', req.headers.authorization);
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token manquant ou invalide.' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret_key');
    // On peut stocker l'id utilisateur dans req.user
    req.user = { id: decoded.id };
    // Optionnel : charger l'utilisateur complet
    // req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalide.' });
  }
};
