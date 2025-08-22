import jwt from 'jsonwebtoken';


const SECRET_KEY = "wpembytrwcvnryxksdbqwjebruyGHyudqgwveytrtrCSnwifoesarjbwe";
const JWT_HEADER = "Authorization";

export const generateToken = (user) => {
  const payload = {
    email: user.email,
    role: user.role
  };
  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: '10d' 
  });
  return token;
};


// export const getEmailFromToken = (token) => {
//   const claims = jwt.verify(token, SECRET_KEY);
//   return claims.email;
// };

// export const getRoleFromToken = (token) => {
//   const claims = jwt.verify(token, SECRET_KEY);
//   return claims.role;
// };

export { SECRET_KEY, JWT_HEADER };