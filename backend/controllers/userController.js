const User = require('../models/User');

// Contrôleur des utilisateurs (squelette)
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.updateUserProfile = (req, res) => { res.status(501).json({ message: 'Not implemented' }); };

// Récupérer le profil de l'utilisateur connecté
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Modifier le profil de l'utilisateur connecté
exports.updateCurrentUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { username, email },
      { new: true }
    ).select('-password');
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};
