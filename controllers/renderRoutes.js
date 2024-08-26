const router = require('express').Router();
const { Destination, Blogs, User } = require('../models');
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
      //where: { user_id: req.session.user_id }, // Ensure only the logged-in user's blogs are fetched
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
    // const userData = await User.findByPk(req.session.user_id);

    // const user = userData.get({ plain: true });
    // console.log(`User data: ${JSON.stringify(user)}`);
    // res.render('profile', {
    //   ...user,
    //   logged_in: true,
    // });

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

// Use withAuth middleware to prevent access to the newBlog route
router.get('/newBlog', withAuth, (req, res) => {
  res.render('newBlog', { logged_in: req.session.user_id });
});

// GET request to search for destinations
router.get('/search', withAuth, async (req, res) => {
  try {
    const searchQuery = req.query.query.toLowerCase(); // Get the search query and convert it to lowercase
    const destinationData = await Destination.findAll({
      include: [{ model: Blogs, include: [User] }], // Include Blogs and their associated User
    });

    // Filter the results based on the search query
    const destinations = destinationData
      .map((destination) => destination.get({ plain: true }))
      .filter((destination) => destination.city.toLowerCase().includes(searchQuery));

    // Render the homepage with the filtered destinations
    res.render('homepage', {
      destinations,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error('Error searching destinations:', err);
    res.status(500).json(err);
  }
});

module.exports = router;
