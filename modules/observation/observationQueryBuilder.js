const DB = require('../../models');

const observationList = async (req) => {
  let query = {
    limit: req.query.limit || 10,
    page: req.query.page || 1,
    sortKey: req.query.sortKey || 'appointmentId',
    sortOrder: req.query.sortOrder || 'asc',
  };

  let observationData = await DB.observation.findAndCountAll({
    offset: query.limit * (query.page - 1),
    limit: query.limit,
    order: [[query.sortKey, query.sortOrder]],
  });
  return {
    metaData: {
      page: query.page,
      perPage: query.limit,
      totalCount: observationData.count,
      totalPage: Math.ceil(observationData.count / query.limit),
      sortKey: query.sortKey,
      sortOrder: query.sortOrder,
    },
    records: observationData.rows,
  };
};

const getSingleObservation = async (req) => {
  return DB.observation.findByPk(req.params.observationId).then((result) => {
    if (!result) {
      throw new Error('Not Found!!');
    } else {
      return result;
    }
  });
};

const deleteObservation = async (req) => {
  return DB.observation.findByPk(req.params.observationId).then((result) => {
    if (!result) {
      throw new Error('Not Found!!');
    } else {
      return result.destroy();
    }
  });
};
const createObservation = (req) => {
  return DB.observation.create({
    appointmentId: req.body.appointmentId,
    labTestRequired: req.body.labTestRequired,
    createdBy: req.decode.userId,
  });
};

const observationMedicine = (req, observation) => {
  return DB.observation_medicines.create({
    observationId: observation.id,
    medicineId: req.body.medicineId,
  });
};

module.exports = {
  observationList,
  getSingleObservation,
  deleteObservation,
  createObservation,
  observationMedicine,
};
