const HttpStatus = require('http-status-codes');

module.exports = function (error, req, res, next) {
  res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
    error: {
      message: error.message,
      code: HttpStatus.INTERNAL_SERVER_ERROR,
    },
  });
};
