import jwt from 'jsonwebtoken';
import { JWT_HEADER, SECRET_KEY } from '../config/jwt.js';

/**
 * Middleware to authenticate requests using a JWT token.
 */
export const authenticateToken = (req, res, next) => {
  const authHeader = req.header(JWT_HEADER);

  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided.' });
  }

  // Handle both "Bearer <token>" and "<token>"
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  if (!token) {
    return res.status(401).json({ error: 'Invalid token format.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    // Attach user info to request (for profile/admin routes)
    req.user = decoded;
    next();
  } catch (err) {
    console.error('JWT Validation Error:', err.message);
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

/**
 * Middleware to restrict access based on user role.
 * Equivalent to Spring Security's .hasRole()
 */
export const restrictTo = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ error: 'Access Denied: Insufficient permissions.' });
    }
    next();
  };
};
