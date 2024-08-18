// Import the Express.js router
const router = require('express').Router();

// Import the route endpoints
const apiRoutes = require('./api');
const renderRoutes = require('./renderRoutes');

// Middleware to use the route endpoints
router.use('/', renderRoutes);
router.use('/api', apiRoutes);

// router.get('/', async (req, res) => {
//   console.log('Render Homepage from controllers/index.js');
//   res.send('Hello World');
// });

// Export the router
module.exports = router;
