const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const User = require('../models/User');

// @GET /api/user/profile
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        skinProfile: user.skinProfile,
        quizHistory: user.quizHistory,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

// @PUT /api/user/profile
router.put('/profile', protect, async (req, res) => {
  try {
    const { name } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, updatedAt: Date.now() },
      { new: true }
    );
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile' });
  }
});

module.exports = router;
