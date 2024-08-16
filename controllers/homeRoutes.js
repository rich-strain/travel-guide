const router = require('express').Router();
const { Destination, Image } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const destinationData = await Destination.findAll({
      include: [Image],
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

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
