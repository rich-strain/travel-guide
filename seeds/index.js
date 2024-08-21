const sequelize = require('../config/connection');
const { User, Destination, } = require('../models');

const userData = require('./userData.json');
const destinationData = require('./destinationData.json');
const stateData = require('./stateData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const destination = await Destination.bulkCreate(destinationData, {
    individualHooks: true,
    returning: true,
  });

  const states = await State.bulkCreate(stateData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
