const DB = require('../../models');

const getTest = async (req) => {
  let query = {
    limit: req.query.limit || 10,
    page: req.query.page || 1,
    sortKey: req.query.sortKey || 'name',
    sortOrder: req.query.sortOrder || 'asc',
  };

  let testList = await DB.test.findAndCountAll({
    offset: query.limit * (query.page - 1),
    limit: query.limit,
    order: [[query.sortKey, query.sortOrder]],
  });
  return {
    metaData: {
      page: query.page,
      perPage: query.limit,
      totalCount: testList.count,
      totalPage: Math.ceil(testList.count / query.limit),
      sortKey: query.sortKey,
      sortOrder: query.sortOrder,
    },
    records: testList.rows,
  };
};

const getSingleTest = async (req) => {
  return DB.test.findByPk(req.params.testId).then((result) => {
    if (!result) {
      throw new Error('Not Found!!');
    } else {
      return result.dataValues;
    }
  });
};

const postTest = async (req) => {
  return await DB.test.create({ name: req.body.name });
};
const deleteTest = async (req) => {
  return DB.test.findByPk(req.params.testId).then((test) => {
    if (!test) {
      throw new Error('Not Found');
    }
    return test.destroy();
  });
};

const editTest = (req) =>
  DB.test.findByPk(req.params.testId).then((result) => {
    if (!result) {
      throw new Error('NOT FOUND');
    }
    return result.update({
      name: req.body.name,
    });
  });

module.exports = {
  getTest,
  postTest,
  getSingleTest,
  deleteTest,
  editTest,
};
