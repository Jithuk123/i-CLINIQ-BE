const { body, param } = require('express-validator');
const { patient } = require('../../models');
const validate = (method) => {
  switch (method) {
    case 'postPatientCase': {
      return [
        body('firstName')
          .exists()
          .withMessage('Name is required')
          .isLength({ min: 5 })
          .withMessage('minumum 5 characters required')
          .isLength({ max: 15 })
          .withMessage('maximum 15 characters allowed'),

        body('lastName')
          .exists()
          .withMessage('Name is required')
          .isLength({ min: 2 })
          .withMessage('minumum 2 characters required')
          .isLength({ max: 15 })
          .withMessage('maximum 15 characters allowed'),

        body('age')
          .exists()
          .withMessage('Age is required')
          .isNumeric()
          .withMessage('Enter age in valid fromat')
          .isLength({ min: 1 })
          .withMessage('Enter age in valid fromat')
          .isLength({ max: 3 })
          .withMessage('Enter age in valid fromat'),

        body('sex')
          .exists()
          .withMessage('Sex required')
          .isString()
          .withMessage('Enter sex in valid format'),

        body('height')
          .exists()
          .withMessage('height is required')
          .isNumeric()
          .withMessage('Enter height in valid fromat'),

        body('weight')
          .exists()
          .withMessage('weight is required')
          .isNumeric()
          .withMessage('Enter weight in valid fromat'),

        body('phoneNumber')
          .isLength({ min: 10 })
          .isLength({ max: 10 })
          .withMessage('10 digits required'),

        body('createdBy').exists().withMessage('RoleId reqired'),
      ];
    }

    case 'getSinglePatientCase': {
      return [
        param('patientId')
          .exists()
          .custom((value) =>
            patient.findByPk(value).then((patientData) => {
              if (!patientData) {
                {
                  throw new Error('Patient does not exist!!');
                }
              }
            })
          ),
      ];
    }

    case 'deletePatientCase': {
      return [
        param('patientId')
          .exists()
          .custom((value) =>
            patient.findByPk(value).then((patientData) => {
              if (!patientData) {
                {
                  throw new Error('Patient does not exist!!');
                }
              }
            })
          ),
      ];
    }
    case 'editPatientCase': {
      return [
        body('lastName')
          .exists()
          .withMessage('Name is required')
          .isLength({ min: 2 })
          .withMessage('minumum 2 characters required')
          .isLength({ max: 15 })
          .withMessage('maximum 15 characters allowed'),

        body('age')
          .exists()
          .withMessage('Age is required')
          .isNumeric()
          .withMessage('Enter age in valid fromat')
          .isLength({ min: 1 })
          .withMessage('Enter age in valid fromat')
          .isLength({ max: 3 })
          .withMessage('Enter age in valid fromat'),

        body('height')
          .exists()
          .withMessage('height is required')
          .isNumeric()
          .withMessage('Enter height in valid fromat'),

        body('weight')
          .exists()
          .withMessage('weight is required')
          .isNumeric()
          .withMessage('Enter weight in valid fromat'),

        body('phoneNumber')
          .isLength({ min: 10 })
          .isLength({ max: 10 })
          .withMessage('10 digits required'),
      ];
    }
    default:
      throw new Error();
  }
};
module.exports = {
  validate,
};
