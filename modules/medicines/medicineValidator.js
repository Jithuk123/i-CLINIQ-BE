const { body, param } = require('express-validator');
const { medicine } = require('../../models');
const validate = (method) => {
  switch (method) {
    case 'postMedicineCase': {
      return [
        body('name')
          .exists()
          .withMessage('Medicine name is required')
          .custom((value) =>
            medicine.findOne({ where: { name: value } }).then((medicine) => {
              if (medicine) {
                throw new Error('Medicine already exist');
              }
            })
          ),
      ];
    }
    case 'getSingleMedicineCase': {
      return [
        param('medicineId')
          .exists()
          .custom((value) =>
            medicine.findByPk(value).then((medicineData) => {
              if (!medicineData) {
                {
                  throw new Error('Medicine does not exist!!');
                }
              }
            })
          ),
      ];
    }
    case 'deleteMedicineCase': {
      return [
        param('medicineId')
          .exists()
          .custom((value) =>
            medicine.findByPk(value).then((medicineData) => {
              if (!medicineData) {
                {
                  throw new Error('Medicine does not exist!!');
                }
              }
            })
          ),
      ];
    }
    case 'editMedicineCase': {
      return [
        body('name')
          .exists()
          .withMessage('Medicine name is required')
          .custom((value) =>
            medicine.findOne({ where: { name: value } }).then((medicine) => {
              if (medicine) {
                throw new Error('Medicine already exist');
              }
            })
          ),
      ];
    }
  }
};
module.exports = { validate };
