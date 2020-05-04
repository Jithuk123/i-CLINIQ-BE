const HttpStatus = require('http-status-codes');
const appointmentQueryBulider = require('./appointmentQueryBuilder');
const { validationResult } = require('express-validator');

const appointmentList = async (req, res, next) => {
  try {
    const appointment = await appointmentQueryBulider.appointmentList(req);
    res.send(appointment);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      error: {
        message: error.message,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
      },
    });
  }
};
const getSingleAppointment = async (req, res, next) => {
  try {
    const getAppointmentList = await appointmentQueryBulider.getSingleAppointment(
      req
    );
    res.send(getAppointmentList);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      error: {
        message: code.message,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
      },
    });
  }
};
const createAppointment = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({
        errors: errors.array(),
      });
    }
    const createdMedinice = await appointmentQueryBulider.createAppointment(
      req
    );
    res.status(HttpStatus.CREATED).send(createdMedinice);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      error: {
        message: error.message,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
      },
    });
  }
};

const deleteAppointment = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({
        errors: errors.array(),
      });
    }

    await appointmentQueryBulider.deleteAppointment(req);
    res.status(HttpStatus.NO_CONTENT).send();
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      error: {
        message: error.message,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
      },
    });
  }
};
module.exports = {
  appointmentList,
  getSingleAppointment,
  createAppointment,
  deleteAppointment,
};
