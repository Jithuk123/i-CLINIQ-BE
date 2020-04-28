const DB = require('../../models');
const bcrypt = require('bcryptjs');

var salt = bcrypt.genSaltSync(10);

const getUser = async (req) => {
  let query = {
    limit: req.query.limit || 10,
    page: req.query.page || 1,
    sortKey: req.query.sortKey || 'firstName',
    sortOrder: req.query.sortOrder || 'asc',
  };

  let userData = await DB.user.findAndCountAll({
    offset: query.limit * (query.page - 1),
    limit: query.limit,
    order: [[query.sortKey, query.sortOrder]],
  });
  return {
    metaData: {
      page: query.page,
      perPage: query.limit,
      totalCount: userData.count,
      totalPage: Math.ceil(userData.count / query.limit),
      sortKey: query.sortKey,
      sortOrder: query.sortOrder,
    },
    records: userData.rows,
  };
};

const postUser = async (req) => {
  var hash = bcrypt.hashSync(req.body.password, salt);
  const role = await DB.role.findOne({ where: { name: req.body.roleId } });

  let newUserData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hash,
    phoneNumber: req.body.phoneNumber,
    roleId: role.id,
  };
  newUser = await DB.user.create(newUserData);
  return newUser;
};

const getSingleUser = async (req) => {
  return DB.user.findByPk(req.params.userId).then((result) => {
    if (!result) {
      throw new Error('Not Found!!');
    } else {
      return result.dataValues;
    }
  });
};

const deleteUser = async (req) => {
  await DB.user.destroy({
    where: {
      id: req.params.userId,
    },
  });
  return 200;
};

const editUser = (req) =>
  DB.user.findByPk(req.params.userId).then((result) => {
    if (!result) {
      throw new Error('NOT FOUND');
    }
    return result.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      phoneNumber: req.body.phone_number,
    });
  });
module.exports = {
  getUser,
  getSingleUser,
  postUser,
  editUser,
  deleteUser,
};
