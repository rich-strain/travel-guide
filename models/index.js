const User = require('./User');
const Destination = require('./Destination');
const Blogs = require('./blogs');

User.belongsToMany(Destination, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
  through: {
    model: Blogs,
    unique: false,
  },
});

Destination.belongsToMany(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
  through: {
    model: Blogs,
    unique: false,
  },
});

// We are setting up the relationship between the User and Blogs models so that a user can have many blogs
/*
User.hasMany(Blogs, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});
*/
// A BLOG belongs to a SINGLE USER
/*
Blogs.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});
*/

module.exports = { User, Destination, Blogs };
