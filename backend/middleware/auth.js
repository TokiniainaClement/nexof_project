const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ message: 'Aucun token, autorisation refusée.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'votre_clé_secrète_très_forte_et_unique');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalide.' });
  }
};

module.exports = authMiddleware;