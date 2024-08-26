const User = require('./User');
const Destination = require('./Destination');
const Blogs = require('./blogs');

// Works But Two Desinations Are Swapped During Seeding
// A User can have many Blogs
User.hasMany(Blogs, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// A Blog belongs to a single User
Blogs.belongsTo(User, {
  foreignKey: 'user_id',
});

// // A Blog can have only one destination
// Blogs.hasOne(Destination, {
//   foreignKey: 'destination_id',
//   onDelete: 'CASCADE',
// });

// A Blog belongs to a single Destination
Blogs.belongsTo(Destination, {
  foreignKey: 'destination_id',
});

// // User Belongs to Many Destinations
// User.belongsToMany(Destination, {
//   through: Blogs,
//   unique: false,
// });

// // Destination Belongs to Many Users
// Destination.belongsToMany(User, {
//   through: Blogs,
//   unique: false,
// });

module.exports = { User, Destination, Blogs };
