// Importing express router
const router = require('express').Router();

// Importing the route endpoints
const userRoutes = require('./userRoutes');
//const destinationRoutes = require('./destinationRoutes');
const blogRoutes = require('./blogRoutes');

// Middleware to use the route endpoints
router.use('/users', userRoutes);
//router.use('/destinations', destinationRoutes);
router.use('/blogs', blogRoutes);

// Export the router
module.exports = router;
