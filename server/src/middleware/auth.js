import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.warn('⚠️  WARNING: JWT_SECRET is not set. Using a default for development only.');
}

const getSecret = () => JWT_SECRET || 'dev-only-fallback-change-me';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, getSecret(), (err, user) => {
    if (err) return res.status(403).json({ error: 'Forbidden' });
    req.user = user;
    next();
  });
};

export const adminOnly = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'super_user')) {
    next();
  } else {
    res.status(403).json({ error: 'Forbidden: Admin check failed' });
  }
};
