// Import the express router
const router = require('express').Router();

// Import DB models
const { Destination, User } = require('../models');

// Import the custom middleware to verify the user is logged in
const withAuth = require('../utils/auth');

// GET all Destinations for homepage
router.get('/', async (req, res) => {
  console.log('Render Homepage From renderRoutes.js');
  // findAll Destinations join with User data
  try {
    const destinationData = await Destination.findAll({
      include: [{ model: User }]
    });

    // Serialize data so the template can read it
    const destinations = destinationData.map((destination) => destination.get({ plain: true }));

    // Pass serialized data and session into template
    res.render('homepage', {
      destinations,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET Destination By id
router.get('/destination/:id', withAuth, async (req, res) => {
  console.log(`Render Page By Destination ID: ${req.params.id}`);
  // findByPK Destination join with User data
  try {
    const destinationData = await Destination.findByPk(req.params.id, {
      include: [{ model: User }]
    });

    if (!destinationData) {
      res.status(404).json({ message: 'Destination Not Found!' });
      return;
    }

    // Serialize data so the template can read it
    const destination = destinationData.get({ plain: true });

    // Pass serialized data and session into template
    res.render('destination', {
      destination,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    const errMessage = { message: err.name };
    res.status(500).json(errMessage);
  }
});

// Use withAuth middleware to prevent access to the profile route
router.get('/profile', withAuth, async (req, res) => {
  console.log('Render Profile Page');
  // findByPK User data with associated Destinations
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [{ model: Destination }],
    });

    // Serialize user data
    const user = userData.get({ plain: true });

    // Pass user data and session into template
    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
