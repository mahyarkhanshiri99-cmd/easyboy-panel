const express = require('express');
const router = express.Router();
const User = require('../models/User');

// دریافت لیست کاربران
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ joinedAt: -1 }).limit(50);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;