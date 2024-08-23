// Purpose: Middleware to check if the user is logged in before allowing them to access certain routes

const setBytescaleAPI = (req, res, next) => {
  req.BYTESCALE_API_KEY = process.env.BYTESCALE_API_KEY;
  next();
};

module.exports = setBytescaleAPI;
