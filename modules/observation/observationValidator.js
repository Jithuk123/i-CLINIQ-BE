const { body, param } = require('express-validator');
const { observation } = require('../../models');
const validate = (method) => {
  switch (method) {
    case 'postObservationCase': {
      return [
        body('appointmentId')
          .exists()
          .withMessage('appointment_id is required')
          .custom((value) =>
            observation
              .findOne({ where: { appointmentId: value } })
              .then((medicine) => {
                if (medicine) {
                  throw new Error('appointment ID already exist');
                }
              })
          ),
      ];
    }

    case 'getSingleObservationCase': {
      return [
        param('observationId')
          .exists()
          .custom((value) =>
            observation.findByPk(value).then((observationData) => {
              if (!observationData) {
                {
                  throw new Error('observation does not exist!!');
                }
              }
            })
          ),
      ];
    }

    case 'deleteObservationCase': {
      return [
        param('observationId')
          .exists()
          .custom((value) =>
            observation.findByPk(value).then((observationData) => {
              if (!observationData) {
                {
                  throw new Error('observation does not exist!!');
                }
              }
            })
          ),
      ];
    }

    default:
      throw new Error();
  }
};
module.exports = {
  validate,
};
