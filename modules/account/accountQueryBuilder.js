const DB = require('../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req) => {
  return DB.user
    .unscoped()
    .findOne({
      where: {
        email: req.body.email,
      },
    })
    .then((user) => {
      if (!user) {
        throw new Error('User not found');
      }
      if (!bcrypt.compare(req.body.password, user.password)) {
        throw new Error('Wrong user credentials');
      }
      const token = jwt.sign(
        { user: user.email, userId: user.id, roleId: user.roleId },
        process.env.JWT_SECRET,
        {
          expiresIn: '24h', // expires in 24 hours
        }
      );
      delete user.dataValues.password;
      return { ...user.dataValues, ...{ token } };
    });
};

module.exports = { login };
