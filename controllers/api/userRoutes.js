// Import the express router
const router = require('express').Router();

// Import the User db model
const { User } = require('../../models');

// POST new user
router.post('/', async (req, res) => {
  // Purpose: Create a new user
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// POST login
router.post('/login', async (req, res) => {
  // Purpose: Log in a user
  try {
    // Check if the email matches any in the database
    const userData = await User.findOne({ where: { email: req.body.email } });

    // If the email is incorrect, send a message back to the client
    if (!userData) {
      res.status(400).json({ message: 'Invalid Login Credentials' });
      return;
    }
    // Check if the password is correct
    const validPassword = await userData.checkPassword(req.body.password);

    // If the password is incorrect, send a message back to the client
    if (!validPassword) {
      res.status(400).json({ message: 'Invalid Login Credentials' });
      return;
    }
    // Save the session, and send a message back to the client
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You Have Successfully Logged In.' });
    });
  } catch (err) {
    // If there is an error, send a message back to the client
    res.status(400).json(err);
  }
});

// POST logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
