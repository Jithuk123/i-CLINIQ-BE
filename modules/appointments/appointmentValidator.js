const { body, param } = require('express-validator');
const { appointment } = require('../../models');
const validate = (method) => {
  switch (method) {
    case 'postAppointmentCase': {
      return [
        body('patinetId')
          .exists()
          .withMessage('patinetId is required')
          .isUUID()
          .withMessage('Patient Id should be UUID'),

        body('createdBy')
          .exists()
          .withMessage('CreatedBy is required')
          .isString()
          .withMessage('Enter a valid format for createdBy'),
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
                  throw new Error('appointment does not exist!!');
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
                  throw new Error('appointment does not exist!!');
                }
              }
            })
          ),
      ];
    }
  }
};
module.exports = { validate };
