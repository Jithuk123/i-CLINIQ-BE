const HttpStatus = require('http-status-codes');
const medicineQueryBulider = require('./medicineQueryBulider');
const { validationResult } = require('express-validator');

const getMedicine = async (req, res, next) => {
  try {
    const medicine = await medicineQueryBulider.getMedicine(req);
    res.send(medicine);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      error: {
        message: error.message,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
      },
    });
  }
};
const getSingleMedicine = async (req, res, next) => {
  try {
    const medicineList = await medicineQueryBulider.getSingleMedicine(req);
    res.send(medicineList);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      error: {
        message: code.message,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
      },
    });
  }
};
const postMedicine = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({
        errors: errors.array(),
      });
    }
    const createdMedinice = await medicineQueryBulider.postMedicine(req);
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

const editMedicine = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({
        errors: errors.array(),
      });
    }

    const editedMedicine = await medicineQueryBulider.editMedicine(req);
    res.send(editedMedicine);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      error: {
        message: error.message,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
      },
    });
  }
};

const deleteMedicine = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({
        errors: errors.array(),
      });
    }

    await medicineQueryBulider.deleteMedicine(req);
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
  getMedicine,
  getSingleMedicine,
  editMedicine,
  deleteMedicine,
  postMedicine,
};
