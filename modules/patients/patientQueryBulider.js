const DB = require('../../models');

const getPatient = async (req) => {
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
      return result.dataValues;
    }
  });
};

const deletePatient = async (req) => {
  await DB.patient.destroy({
    where: {
      id: req.params.patientId,
    },
  });
  return 200;
};

const postPatient = async (req) => {
  let newPatientData = {
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
