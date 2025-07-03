// server/middlewares/isAuthenticated.js
module.exports = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next(); // ✅ Authenticated
  }
  res.redirect('/'); // ⛔ Unauthenticated
};
