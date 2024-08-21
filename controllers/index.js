const router = require('express').Router();
const apiRoutes = require('./api');
const renderRoutes = require('./renderRoutes');
const blogRoutes = require('./api/blogRoutes');

// Use the rendering routes
router.use('/', renderRoutes);

// Use the API routes
router.use('/api', apiRoutes);

// Use the blog routes
router.use('/api/blogs', blogRoutes);

// Export the router
module.exports = router;
