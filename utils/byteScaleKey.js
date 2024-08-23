// Purpose: Middleware to pass Bytescale API key to the request object
const setBytescaleAPI = (req, res, next) => {
  req.BYTESCALE_API_KEY = process.env.BYTESCALE_API_KEY;
  next();
};

module.exports = setBytescaleAPI;
