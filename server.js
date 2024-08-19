// Entry point for the application
const path = require('path');

// Import the Express.js module
const express = require('express');

// Import the express-session module
const session = require('express-session');

// Import the express-handlebars module
const exphbs = require('express-handlebars');

// Import the routes from the controllers folder
const routes = require('./controllers');

// Import the custom helpers if needed
// const helpers = require('./utils/helpers');

// Import the Sequelize Connection
const sequelize = require('./config/connection');

// Initialize the Sequelize Store
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express(); // Initialize the Express.js application
const PORT = process.env.PORT || 3001; // Set the port for the application

// Set up Handlebars.js engine
// If we use helpers we can pass them in as an object
// const hbs = exphbs.create({ helpers });
const hbs = exphbs.create();

// Configure the session object
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Inform Express.js on which session to use
app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware to parse incoming requests
app.use(express.json()); // Parse incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse incoming requests with urlencoded payloads
app.use(express.static(path.join(__dirname, 'public'))); // Inform Express.js on which folder to use for static files

// Middleware to use the route endpoints
app.use(routes);

// Sync the Sequelize models and start the Express.js app
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`));
});
