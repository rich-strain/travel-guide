// Purpose: Middleware to check if the user is logged in before allowing them to access certain routes
const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.logged_in) {
    res.redirect('/');
  } else {
    next();
  }
};

module.exports = withAuth;
