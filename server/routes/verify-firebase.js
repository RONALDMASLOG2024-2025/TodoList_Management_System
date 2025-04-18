const express = require('express');
const admin = require('../firebase-admin');
const router = express.Router();

// Test route to check if Firebase is connected
router.get('/verify-firebase', async (req, res) => {
  try {
    const listUsers = await admin.auth().listUsers(1); // Just fetch 1 user
    res.status(200).json({
      success: true,
      message: 'Firebase Admin connected!',
      user: listUsers.users[0]?.email || 'No users yet',
    });
  } catch (error) {
    console.error('Firebase Admin Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
