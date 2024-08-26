const router = require('express').Router();
const { Destination, Blogs, User } = require('../models');
const { Op } = require('sequelize');
const withAuth = require('../utils/auth');

// GET request to render the homepage or redirect to login/register if not logged in
router.get('/', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/home');
  } else {
    res.render('login'); // Render login page by default
  }
});

// GET request to render the main homepage with all blogs for the logged-in user
router.get('/home', withAuth, async (req, res) => {
  try {
    // Fetch the blogs for the logged-in user
    const blogData = await Blogs.findAll({
      include: [
        {
          model: Destination, // Include the associated Destination model
          attributes: ['city', 'state', 'country'],
        },
      ],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    console.log(`Blog data: ${JSON.stringify(blogs)}`);
    res.render('homepage', {
      blogs, // Pass the blogs associated with the logged-in user
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error('Error fetching blogs:', err);
    res.status(500).json(err);
  }
});

// GET request to render the user's profile page
router.get('/profile', withAuth, async (req, res) => {
  try {
    const blogData = await Blogs.findAll({
      where: { user_id: req.session.user_id },
      include: [
        {
          model: Destination, // Include the associated Destination model
          attributes: ['city', 'state', 'country'],
        },
      ],
    });
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    console.log(`Blog data: ${JSON.stringify(blogs)}`);
    res.render('homepage', {
      blogs, // Pass the blogs associated with the logged-in user
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json(err);
  }
});

// New Blog Form
router.get('/newBlog', withAuth, (req, res) => {
  res.render('newBlog', { logged_in: req.session.user_id });
});

// Search Blog Destinations
router.get('/search', withAuth, async (req, res) => {
  console.log(`Search query: ${req.query.query}`);
  try {
    const blogData = await Blogs.findAll({
      include: [{ model: Destination, attributes: ['city', 'state', 'country'], where: { city: { [Op.like]: `%${req.query.query}%` } } }],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    console.log(`Blog data: ${JSON.stringify(blogs)}`);
    res.render('homepage', {
      blogs, // Pass the blogs associated with the logged-in user
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error('Error searching destinations:', err);
    res.status(500).json(err);
  }
});

module.exports = router;
