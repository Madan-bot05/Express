import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import User from '../model/User.js';

const router = express.Router();

// --- PROFILE ROUTE ---
router.get('/profile', authenticateToken, (req, res) => {
    const user = req.user;
    res.status(200).json({

        email: user.email,
        role: user.role,

    });
});

router.get('/admin/all', authenticateToken, (req, res) => {
    // Check if the user has the 'ADMIN' role
    if (req.user.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Forbidden: Access denied' });
    }

    User.findAll(
        {
            attributes: {
                exclude: ['password']
            }
        }
    )
        .then(users => {
            // Respond with the list of all users
            res.status(200).json(users);
        })
        .catch(err => {
            console.error("Error fetching all users:", err);
            res.status(500).json({ message: 'Internal server error.' });
        });
});



export default router;
