const express = require('express');
const passport = require('passport');
const router = express.Router();
const {
  signup,
  signin,
  forgotPassword,
  resetPassword
} = require('../controllers/authController');

// -------------------- Normal Auth --------------------
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/forgot', forgotPassword);
router.post('/reset/:token', resetPassword);

// -------------------- Google OAuth2 --------------------
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// This handles the callback after Google auth
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful login
    res.redirect('/dashboard'); // or send token/user data
  }
);

// -------------------- Logout --------------------
router.get('/logout', async (req, res, next) => {
  try {
    req.logout(function (err) {
      if (err) return next(err);
      res.redirect('/');
    });
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ message: 'Logout failed' });
  }
});

module.exports = router;
