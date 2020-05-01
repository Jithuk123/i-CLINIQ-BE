const { body, param } = require('express-validator');
const { appointment } = require('../../models');
const validate = (method) => {
  switch (method) {
    case 'postAppointmentCase': {
      return [
        body('patientId')
          .exists()
          .withMessage('patientId is required')
          .isUUID()
          .withMessage('Patient Id should be UUID'),
      ];
    }
    case 'singleAppointmentCase': {
      return [
        param('appointmentId')
          .exists()
          .custom((value) =>
            appointment.findByPk(value).then((appointmentData) => {
              if (!appointmentData) {
                {
                  throw new Error('Appointment Id does not exist!!');
                }
              }
            })
          ),
      ];
    }
    case 'deleteAppointmentCase': {
      return [
        param('appointmentId')
          .exists()
          .custom((value) =>
            appointment.findByPk(value).then((appointmentData) => {
              if (!appointmentData) {
                {
                  throw new Error('Appointment Id does not exist!!');
                }
              }
            })
          ),
      ];
    }
  }
};
module.exports = { validate };
