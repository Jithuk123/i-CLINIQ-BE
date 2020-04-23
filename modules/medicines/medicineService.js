const HttpStatus = require('http-status-codes');
const medicineQueryBulider = require('./medicineQueryBulider');
const { validationResult } = require('express-validator');

const getMedicine = async (req, res, next) => {
  try {
    const getMedicineResponse = await medicineQueryBulider.getMedicine(req);
    res.status(HttpStatus.OK).send(getMedicineResponse);
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
    const getSingleMedicineResponse = await medicineQueryBulider.getSingleMedicine(
      req
    );
    res.status(HttpStatus.OK).send(getSingleMedicineResponse);
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
    const postMedicineResponse = await medicineQueryBulider.postMedicine(req);
    console.log(req, 'here');
    res.status(HttpStatus.CREATED).send(postMedicineResponse);
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

    const putMedicineResponse = await medicineQueryBulider.editMedicine(req);
    res.status(HttpStatus.OK).send(putMedicineResponse);
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

    const deleteMedicineResponse = await medicineQueryBulider.deleteMedicine(
      req
    );
    res.status(HttpStatus.OK).send(deleteMedicineResponse);
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
