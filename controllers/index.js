const router = require('express').Router();
const apiRoutes = require('./api');
const renderRoutes = require('./renderRoutes');

// Use the rendering routes
router.use('/', renderRoutes);

// Use the API routes
router.use('/api', apiRoutes);

// Export the router
module.exports = router;
