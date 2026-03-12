const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/User');

// Get my credits
router.get('/my-credits', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('credits name');
    res.json({ credits: user.credits, name: user.name });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Donate fabric and earn credits
router.post('/donate', protect, async (req, res) => {
  try {
    const { fabricWeight, fabricType, description } = req.body;

    // Credits calculation
    // Small = 30 credits, Medium = 60 credits, Large = 100 credits
    const creditsMap = { small: 30, medium: 60, large: 100 };
    const earnedCredits = creditsMap[fabricWeight] || 30;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $inc: { credits: earnedCredits } },
      { new: true }
    );

    res.json({
      message: `🎉 You earned ${earnedCredits} credits!`,
      earnedCredits,
      totalCredits: user.credits
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;