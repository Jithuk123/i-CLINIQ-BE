const DB = require('../../models');

const getUser = async (res) => {
  let query = {
    limit: req.query.limit || 10,
    page: req.query.page || 1,
    sortKey: req.query.sortKey || 'name',
    sortOrder: req.query.sortOrder || 'asc',
  };

  let userData = await DB.user.findAndCountAll({
    where: {
      roleId: res.params.roleId,
    },
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
  let newUserData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phone_number,
    roleId: req.body.roleId,
  };
  newUser = await DB.users.create(newUserData).then((dbUser) => {
    return DB.users.findByPk(dbUser.id);
  });
  return newUser;
};

const getSingleUser = (req) =>
  DB.users.findByPk(req.params.userId).then((result) => {
    if (!result) {
      throw new Error('Not Found!!');
    } else {
      return result;
    }
  });

const deleteUser = async (req) => {
  await DB.users.destroy({
    where: {
      id: req.params.userId,
    },
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
  getUser,
  getSingleUser,
  postUser,
  editUser,
  deleteUser,
};
