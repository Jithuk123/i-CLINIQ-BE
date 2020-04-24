const { body, param } = require('express-validator');
const { test } = require('../../models');

const validate = (method) => {
  switch (method) {
    case 'postTestCase': {
      return [
        body('name')
          .exists()
          .withMessage('Test name is required')
          .custom((value) =>
            test.findOne({ where: { name: value } }).then((test) => {
              if (test) {
                throw new Error('Test case already exist');
              }
            })
          ),
      ];
    }
    case 'getSingleTestCase': {
      return [
        param('testId')
          .exists()
          .custom((value) =>
            test.findByPk(value).then((testData) => {
              if (!testData) {
                {
                  throw new Error('User does not exist!!');
                }
              }
            })
          ),
      ];
    }
    case 'deleteTestCase': {
      return [
        param('testId')
          .exists()
          .custom((value) =>
            test.findByPk(value).then((testData) => {
              if (!testData) {
                {
                  throw new Error('Test Name does not exist!!');
                }
              }
            })
          ),
      ];
    }
    case 'editTestCase': {
      return [
        body('name')
          .exists()
          .withMessage('Test name is required')
          .custom((value) =>
            test.findOne({ where: { name: value } }).then((test) => {
              if (test) {
                throw new Error('Test already exist');
              }
            })
          ),
      ];
    }
  }
};
module.exports = { validate };
