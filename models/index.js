const User = require('./User');
const Destination = require('./Destination');
const Blogs = require('./blogs');

// A User can have many Blogs
User.hasMany(Blogs, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// A Blog belongs to a single User
Blogs.belongsTo(User, {
  foreignKey: 'user_id',
});

// A Destination can have many Blogs
Destination.hasMany(Blogs, {
  foreignKey: 'destination_id',
  onDelete: 'CASCADE',
});

// A Blog belongs to a single Destination
Blogs.belongsTo(Destination, {
  foreignKey: 'destination_id',
});

module.exports = { User, Destination, Blogs };
