const DB = require('../../models');

const appointmentList = async (req) => {
  let query = {
    limit: req.query.limit || 10,
    page: req.query.page || 1,
    sortKey: req.query.sortKey || 'patientId',
    sortOrder: req.query.sortOrder || 'asc',
  };

  let appointmentList = await DB.appointment.findAndCountAll({
    offset: query.limit * (query.page - 1),
    limit: query.limit,
    order: [[query.sortKey, query.sortOrder]],
  });
  return {
    metaData: {
      page: query.page,
      perPage: query.limit,
      totalCount: appointmentList.count,
      totalPage: Math.ceil(appointmentList.count / query.limit),
      sortKey: query.sortKey,
      sortOrder: query.sortOrder,
    },
    records: appointmentList.rows,
  };
};

const getSingleAppointment = async (req) => {
  return DB.appointment.findByPk(req.params.appointmentId).then((result) => {
    if (!result) {
      throw new Error('Not Found!!');
    } else {
      return result;
    }
  });
};

const createAppointment = async (req) => {
  return await DB.appointment.create({
    patientId: req.body.patientId,
    createdBy: req.decode.userId,
  });
};
const deleteAppointment = async (req) => {
  return DB.appointment
    .findByPk(req.params.appointmentId)
    .then((appointment) => {
      if (!appointment) {
        throw new Error('Not Found');
      }
      return appointment.destroy();
    });
};

module.exports = {
  getSingleAppointment,
  appointmentList,
  createAppointment,
  deleteAppointment,
};
