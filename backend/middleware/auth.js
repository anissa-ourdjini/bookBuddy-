const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log('TOKEN:', token);
  if (!token) return res.status(401).json({ message: 'Accès refusé. Token manquant.' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log('DECODED USER:', req.user);
    next();
  } catch (err) {
    res.status(400).json({ message: 'Token invalide.' });
  }
};
