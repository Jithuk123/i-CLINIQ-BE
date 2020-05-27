const DB = require('../../models');

const appointmentList = async (req) => {
  let query = {
    limit: req.query.limit || 10,
    page: req.query.page || 1,
    sortKey: req.query.sortKey || 'createdAt',
    sortOrder: req.query.sortOrder || 'asc',
  };

  let appointmentList = await DB.appointment.findAndCountAll({
    include: [
      {
        model: DB.patient,
      },
    ],
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

const doctorsAppointment = async (req) => {
  let query = {
    limit: req.query.limit || 10,
    page: req.query.page || 1,
    sortKey: req.query.sortKey || 'createdAt',
    sortOrder: req.query.sortOrder || 'asc',
  };
  let appointmentList = await DB.appointment.findAndCountAll({
    where: { assignedTo: req.decode.userId, status: 'pending' },

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
  const roleId = await DB.role.findOne({ where: { name: 'Admin' } });

  if (req.decode.roleId == roleId.id)
    return await DB.appointment.create({
      patientId: req.body.patientId,
      createdBy: req.decode.userId,
      assignedTo: req.body.assignedTo,
      status: 'pending',
    });
  else {
    return await DB.appointment.create({
      patientId: req.body.patientId,
      createdBy: req.decode.userId,
      assignedTo: req.decode.userId,
      status: 'pending',
    });
  }
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
  doctorsAppointment,
};
