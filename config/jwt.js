import jwt from 'jsonwebtoken';

// Corresponds to JwtConstant.java
const SECRET_KEY = "wpembytrwcvnryxksdbqwjebruyGHyudqgwveytrtrCSnwifoesarjbwe";
const JWT_HEADER = "Authorization";

/**
 * Generates a JWT token for a user.
 * Corresponds to JwtProvider.java's generateToken method.
 */
export const generateToken = (user) => {
  const payload = {
    email: user.email,
    role: user.role
  };
  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: '10d' // 10 days, matching your Spring code's 864000000ms
  });
  return token;
};

// Functions to extract claims from a token (used in middleware)
export const getEmailFromToken = (token) => {
  const claims = jwt.verify(token, SECRET_KEY);
  return claims.email;
};

export const getRoleFromToken = (token) => {
  const claims = jwt.verify(token, SECRET_KEY);
  return claims.role;
};

export { SECRET_KEY, JWT_HEADER };