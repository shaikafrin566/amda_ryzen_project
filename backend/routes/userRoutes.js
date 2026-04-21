import express from 'express';
import User from '../models/User.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();

// GET /api/user/profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found.' });
    res.json(user);
  } catch {
    res.status(500).json({ error: 'Server error.' });
  }
});

// PUT /api/user/onboarding
router.put('/onboarding', authMiddleware, async (req, res) => {
  try {
    const { age, gender, height, weight, allergies, dietPreference, budget, fitnessGoal } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      { age, gender, height, weight, allergies, dietPreference, budget, fitnessGoal, profileComplete: true },
      { new: true }
    ).select('-password');
    res.json(user);
  } catch {
    res.status(500).json({ error: 'Server error during profile update.' });
  }
});

export default router;
