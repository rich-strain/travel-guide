const User = require('./User');
const Destination = require('./Destination');

User.hasMany(Destination, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Destination.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Destination};
