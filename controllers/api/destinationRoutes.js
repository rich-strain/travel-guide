// Import the express router
const router = require('express').Router();

// Import the Destination db model
const { Destination } = require('../../models');

// Import the custom middleware to verify the user is logged in
// const withAuth = require('../../utils/auth');

// POST new destination
router.post('/', async (req, res) => {
  console.log('POST new destination');
  res.send('POST new destination');
});

// DELETE a destination by id
router.delete('/:id', async (req, res) => {
  console.log(`Delete destination by id: ${req.params.id}`);
  res.send(`Delete destination by id: ${req.params.id}`);
});

module.exports = router;
