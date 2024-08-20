const router = require('express').Router();
const { Destination, User } = require('../models');
const withAuth = require('../utils/auth');

// GET request to render the homepage with all destinations
router.get('/', async (req, res) => {
    try {
        const destinationData = await Destination.findAll({
            include: [{ model: User }]
        });

        const destinations = destinationData.map(destination => destination.get({ plain: true }));

        res.render('homepage', {
            destinations,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET request to render the login page
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

// GET request to render a specific destination by id
router.get('/destination/:id', withAuth, async (req, res) => {
    try {
        const destinationData = await Destination.findByPk(req.params.id, {
            include: [{ model: User }]
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

module.exports = router;
