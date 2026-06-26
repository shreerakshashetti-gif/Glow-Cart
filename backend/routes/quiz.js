const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getRecommendations } = require('../controllers/productEngine');
const { sendRecommendationEmail } = require('../controllers/emailService');
const User = require('../models/User');

// @POST /api/quiz/submit
router.post('/submit', protect, async (req, res) => {
  try {
    const { answers } = req.body;
    const { skinType, concern, sensitivity, age, lifestyle } = answers;

    if (!skinType || !concern || !sensitivity || !age || !lifestyle) {
      return res.status(400).json({ message: 'All 5 questions must be answered' });
    }

    // Get product recommendations
    const recommendedProducts = getRecommendations(answers);

    // Update user's skin profile and quiz history
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          'skinProfile.skinType': skinType,
          'skinProfile.concerns': [concern],
          'skinProfile.sensitivity': sensitivity,
          'skinProfile.age': age,
          'skinProfile.lifestyle': lifestyle,
          updatedAt: Date.now()
        },
        $push: {
          quizHistory: {
            answers,
            recommendedProducts,
            takenAt: new Date()
          }
        }
      },
      { new: true }
    );

    // Send recommendation email (non-blocking)
    sendRecommendationEmail(
      user.email,
      user.name,
      recommendedProducts,
      { skinType, concern, sensitivity, age, lifestyle }
    ).then(() => {
      console.log(`✅ Recommendation email sent to ${user.email}`);
    }).catch((err) => {
      console.error('Email send error:', err.message);
    });

    res.json({
      success: true,
      message: 'Quiz submitted! Check your email for recommendations.',
      recommendedProducts,
      skinProfile: user.skinProfile
    });
  } catch (error) {
    console.error('Quiz submit error:', error);
    res.status(500).json({ message: 'Error processing quiz' });
  }
});

// @GET /api/quiz/history
router.get('/history', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({
      success: true,
      quizHistory: user.quizHistory
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quiz history' });
  }
});

module.exports = router;
