const { body, param } = require('express-validator');
const { user } = require('../../models');
const validate = (method) => {
  switch (method) {
    case 'postUserCase': {
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

        body('password')
          .exists()
          .withMessage('Password Required')
          .isLength({ min: 8 })
          .withMessage('minimum 8 characters required'),

        body('email')
          .exists()
          .withMessage('Email is required')
          .isEmail()
          .custom((value) =>
            user.findOne({ where: { email: value } }).then((user) => {
              if (user) {
                throw new Error('E-mail already in use');
              }
            })
          ),
        body('phoneNumber')
          .isLength({ min: 10 })
          .withMessage('10 digits required'),
        body('roleId').exists().withMessage('RoleId reqired'),
      ];
    }

    case 'getSingleUserCase': {
      return [
        param('userId')
          .exists()
          .custom((value) =>
            user.findByPk(value).then((userData) => {
              if (!userData) {
                {
                  throw new Error('User does not exist!!');
                }
              }
            })
          ),
      ];
    }

    case 'deleteUserCase': {
      return [
        param('userId')
          .exists()
          .custom((value) =>
            user.findByPk(value).then((userData) => {
              if (!userData) {
                {
                  throw new Error('User does not exist!!');
                }
              }
            })
          ),
      ];
    }
    case 'editUserCase': {
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
          .isLength({ min: 5 })
          .withMessage('minumum 2 characters required')
          .isLength({ max: 15 })
          .withMessage('maximum 15 characters allowed'),

        body('phoneNumber')
          .isLength({ min: 10 })
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
