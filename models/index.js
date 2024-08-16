const User = require('./User');
const Destination = require('./Destination');
const Image = require('./Image');

Destination.hasMany(Image, {
  foreignKey: 'destination_id',
  onDelete: 'CASCADE',
});

Image.belongsTo(Destination, {
  foreignKey: 'destination_id',
});

User.hasMany(Destination, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Destination.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Destination, Image };
