const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const isAuthenticated = require('./middlewares/isAuthenticated');

// Load environment variables from .env
dotenv.config();

// Initialize app
const app = express();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err.message));

// Passport config
require('./config/passport');

// Middlewares
app.use(cors({
  origin: 'http://localhost:3000', // adjust as needed
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: 'aurum_auth_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // true if using HTTPS
    httpOnly: true
  }
}));

// Passport session
app.use(passport.initialize());
app.use(passport.session());

// Auth routes
app.use('/api/auth', authRoutes);

// Serve static frontend
app.use(express.static(path.join(__dirname, '../client')));

// 🛡️ Protected dashboard
app.get('/dashboard.html', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'dashboard.html'));
});

// 🔁 Catch-all route (optional for SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
