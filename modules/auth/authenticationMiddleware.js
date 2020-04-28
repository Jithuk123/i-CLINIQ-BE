const jwt = require('jsonwebtoken');
const httpStatus = require('http-status-codes');
const DB = require('../../models');

authentication = async (req, res, next) => {
  console.log('here', req.headers['x-api-token']);
  const apiToken = req.headers['x-api-token'];
  if (!apiToken) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .send('Access denied.No token provides');
  } else {
    jwt.verify(apiToken, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        return res.status(httpStatus.FORBIDDEN).send({ message: err.message });
      } else {
        req.decode = decoded;
        next();
      }
    });
  }
};
module.exports = { authentication };
