// Importing express router
const router = require('express').Router();

// Importing the route endpoints
const userRoutes = require('./userRoutes');
const destinationRoutes = require('./destinationRoutes');

// Middleware to use the route endpoints
router.use('/users', userRoutes);
router.use('/destinations', destinationRoutes);

// Export the router
module.exports = router;
