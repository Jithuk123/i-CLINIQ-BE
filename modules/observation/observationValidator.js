const { body, param } = require('express-validator');
const { observation } = require('../../models');
const validate = (method) => {
  switch (method) {
    case 'postObservationCase': {
      return [
        body('appointment_id')
          .exists()
          .withMessage('appointment_id is required')
          .exists('createdBy')
          .withMessage('createdBy is required'),
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
