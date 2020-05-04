const DB = require('../../models');
const bcrypt = require('bcryptjs');

var salt = bcrypt.genSaltSync(10);

const getUserList = async (req) => {
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

const createUser = async (req) => {
  //asynchronous encrypting
  const salt = await bcrypt.genSalt(10);
  var hashedPassword = bcrypt.hash(req.body.password, salt);

  return DB.user.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
    phoneNumber: req.body.phoneNumber,
    roleId: req.body.roleId,
  });
};

const getSingleUser = async (req) => {
  return DB.user.findByPk(req.params.userId).then((result) => {
    if (!result) {
      throw new Error('Not Found!!');
    } else {
      return result;
    }
  });
};

const deleteUser = async (req) => {
  return DB.user.findByPk(req.params.userId).then((user) => {
    if (!user) {
      throw new Error('Not Found');
    }
    return user.destroy();
  });
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
  getUserList,
  getSingleUser,
  createUser,
  editUser,
  deleteUser,
};
