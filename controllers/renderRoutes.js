const router = require('express').Router();
const { Destination, User } = require('../models');
const withAuth = require('../utils/auth');

// GET request to render the homepage or redirect to login/register if not logged in
router.get('/', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/home');
  } else {
    res.render('login'); // Render login page by default
  }
});

// GET request to render the registration page
router.get('/register', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/home');
    return;
  }

  res.render('register');
});

// GET request to render the main homepage with all destinations
router.get('/home', withAuth, async (req, res) => {
  try {
    const destinationData = await Destination.findAll({
      include: [{ model: User }],
    });

    const destinations = destinationData.map((destination) => destination.get({ plain: true }));

    res.render('homepage', {
      destinations,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET request to render a specific destination by id
router.get('/destination/:id', withAuth, async (req, res) => {
  try {
    const destinationData = await Destination.findByPk(req.params.id, {
      include: [{ model: User }],
    });

    if (!destinationData) {
      res.status(404).json({ message: 'Destination Not Found!' });
      return;
    }

    const destination = destinationData.get({ plain: true });

    res.render('destination', {
      destination,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json({ message: err.name });
  }
});

// GET request to render the user's profile page
router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [{ model: Destination }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to the newBlog route
router.get('/newBlog', async (req, res) => {
  res.render('newBlog');
});

module.exports = router;
