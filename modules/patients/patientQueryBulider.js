const DB = require('../../models');

const patientList = async (req) => {
  let query = {
    limit: req.query.limit || 10,
    page: req.query.page || 1,
    sortKey: req.query.sortKey || 'firstName',
    sortOrder: req.query.sortOrder || 'asc',
  };

  let patientData = await DB.patient.findAndCountAll({
    offset: query.limit * (query.page - 1),
    limit: query.limit,
    order: [[query.sortKey, query.sortOrder]],
  });
  return {
    metaData: {
      page: query.page,
      perPage: query.limit,
      totalCount: patientData.count,
      totalPage: Math.ceil(patientData.count / query.limit),
      sortKey: query.sortKey,
      sortOrder: query.sortOrder,
    },
    records: patientData.rows,
  };
};

const getSinglePatient = async (req) => {
  return DB.patient.findByPk(req.params.patientId).then((result) => {
    if (!result) {
      throw new Error('Not Found!!');
    } else {
      return result;
    }
  });
};

const deletePatient = async (req) => {
  return DB.patient.findByPk(req.params.patientId).then((result) => {
    if (!result) {
      throw new Error('Not Found!!');
    } else {
      return result.destroy();
    }
  });
};

const createPatient = (req) => {
  return DB.patient.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    sex: req.body.sex,
    height: req.body.height,
    weight: req.body.weight,
    phoneNumber: req.body.phoneNumber,
    createdBy: req.decode.userId,
  });
};

const editPatient = (req) =>
  DB.patient.findByPk(req.params.patientId).then((result) => {
    if (!result) {
      throw new Error('NOT FOUND');
    }
    return result.update({
      lastName: req.body.lastName,
      age: req.body.age,
      height: req.body.height,
      weight: req.body.weight,
      phoneNumber: req.body.phoneNumber,
    });
  });

module.exports = {
  editPatient,
  createPatient,
  deletePatient,
  getSinglePatient,
  patientList,
};
