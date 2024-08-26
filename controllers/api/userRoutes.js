const router = require('express').Router();
const { User } = require('../../models');
require('dotenv').config();

// all endpoints use api/users

// Register a new user account
router.post('/register', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.key = process.env.BYTESCALE_API_KEY;
      res.status(201).redirect('/home'); // Redirect to the homepage after login
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// POST login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      return res.status(400).render('login', { errorMessage: 'Invalid Login Credentials' });
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      return res.status(400).render('login', { errorMessage: 'Invalid Login Credentials' });
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.key = process.env.BYTESCALE_API_KEY;
      res.redirect('/home'); // Redirect to the homepage after login
    });
  } catch (err) {
    res.status(500).json(err); // Changed from 400 to 500 for server errors
  }
});

// POST logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.redirect('/'); // Redirect to the main page (login page) after logout
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
