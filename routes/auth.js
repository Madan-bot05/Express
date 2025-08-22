import express from 'express';
import bcrypt from 'bcrypt';
import { generateToken } from '../config/jwt.js';
import User from '../model/User.js';

const router = express.Router();

// --- SIGNUP ---
router.post('/signup', async (req, res) => {
  const { first_name, last_name, email, password, mobile,role } = req.body;
  
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      mobile,
      role: `${role? role.toUpperCase() : 'USER'}` 
    });

    //Token generation
    const token = generateToken(newUser);
    res.status(201).json({
      jwt: token,
      user: {
        email: newUser.email,
        role: newUser.role
      }
    });

  } catch (error) {
    res.status(500).json({ error: 'User creation failed.', details: error.message });
  }
});

// --- SIGNIN ---
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    
    const token = generateToken(user);
    res.status(200).json({
      jwt: token,
      user: {
        email: user.email,
        role: user.role
      }
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed.', details: error.message });
  }
});



export default router;
