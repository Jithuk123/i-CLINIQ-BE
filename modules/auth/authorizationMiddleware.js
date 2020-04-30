const DB = require('../../models');
const httpStatus = require('http-status-codes');

authorization = (...roleName) => {
  return async (request, response, next) => {
    const data = await DB.role.findByPk(request.decode.roleId);
    if (roleName.includes(data.dataValues.name)) {
      next();
    } else {
      response.status(httpStatus.UNAUTHORIZED).send('UNAUTHORIZED USER');
    }
  };
};
module.exports = { authorization };
