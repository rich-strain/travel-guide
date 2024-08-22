const User = require('./User');
const Destination = require('./Destination');
const Blogs = require('./blogs');




User.belongsToMany(Destination, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
  through:{
    model: Blogs,
    unique: false
  },
});


Destination.belongsToMany(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
  through:{
    model: Blogs,
    unique: false
  },
});




module.exports = { User, Destination, Blogs};
