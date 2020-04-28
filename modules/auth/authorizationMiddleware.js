const DB = require('../../models');
const httpStatus = require('http-status-codes');

authorization = (roleName) => {
  return async (request, response, next) => {
    console.log(roleName, '1111111111111111111111111111');

    const data = await DB.role.findByPk(request.decode.roleId);

    console.log(data.dataValues.name, 'oooooooo');

    if (roleName == data.dataValues.name) next();
    else {
      response.status(httpStatus.UNAUTHORIZED).send('UNAUTHORIZED USER'); // user is forbidden
    }
  };
};
module.exports = { authorization };
