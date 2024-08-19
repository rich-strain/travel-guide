// Import the express router
const router = require('express').Router();

// Import DB models
const { Destination, User } = require('../models');

// Import the custom middleware to verify the user is logged in
const withAuth = require('../utils/auth');

// GET all Destinations for homepage
router.get('/', async (req, res) => {
  console.log('Render Homepage From homeRoutes.js');
  // findAll Destinations join with User data
  try {
    const destinationData = await Destination.findAll({ include: [{ model: User }] });
    // Serialize data so the template can read it
    //const destinations = destinationData.map((destination) => destination.get({ plain: true }));
    // Pass serialized data and session into template
    //res.render('homepage', { destinations });
    res.status(200).json(destinationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET Destination By id
router.get('/destination/:id', withAuth, async (req, res) => {
  console.log(`Render Page By Destination ID: ${req.params.id}`);
  //findByPK Destination join with User data
  try {
    const destinationData = await Destination.findByPk(req.params.id, { include: [{ model: User }] });
    if (!destinationData) {
      res.status(404).json({ message: 'Destination Not Found!' });
      return;
    }

    // Serialize data so the template can read it
    //const destination = destinationData.get({ plain: true });
    // Pass serialized data and session into template
    //res.render('destination', { destination });

    res.status(200).json(destinationData);
  } catch (err) {
    const errMessage = { message: err.name };
    res.status(500).json(errMessage);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', async (req, res) => {
  console.log('Render Profile Page');
  res.send('Render Profile Page');
});

module.exports = router;
