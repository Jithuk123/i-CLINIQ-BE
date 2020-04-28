const queryBulider = require('./accountQueryBuilder');
HttpStatus = require('http-status-codes');

const login = async (req, res, next) => {
  try {
    const logins = await queryBulider.login(req);
    res.send(logins);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      error: {
        message: error.message,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
      },
    });
  }
};

module.exports = { login };
