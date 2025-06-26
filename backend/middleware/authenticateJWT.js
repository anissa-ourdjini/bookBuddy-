const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware d'authentification JWT
module.exports = async function authenticateJWT(req, res, next) {
  console.log('authenticateJWT appelé', req.headers.authorization);
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token manquant ou invalide.' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET );
    req.user = { id: decoded.id };
    console.log('JWT décodé, req.user =', req.user);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalide.' });
  }
};
