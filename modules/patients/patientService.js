const HttpStatus = require('http-status-codes');

const { validationResult } = require('express-validator');
const PatinetqueryBulider = require('./patientQueryBulider');

const getPatient = async (req, res, next) => {
  try {
    const getPatientResponse = await PatinetqueryBulider.getPatient(req);
    res.status(HttpStatus.ACCEPTED).send(getPatientResponse);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      error: {
        message: error.message,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
      },
    });
  }
};

const getSinglePatinet = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({
        errors: errors.array(),
      });
    }
    const getSinglePatinetResponse = await PatinetQueryBulider.getSinglePatinet(
      req
    );
    res.status(HttpStatus.ACCEPTED).send(getSinglePatinetResponse);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      error: {
        message: error.message,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
      },
    });
  }
};

const postPatinet = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({
        errors: errors.array(),
      });
    }
    const postPatinetResponse = await PatinetQueryBulider.postPatinet(req);
    res.status(HttpStatus.CREATED).send(postPatinetResponse);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      error: {
        message: error.message,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
      },
    });
  }
};

const editPatinet = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({
        errors: errors.array(),
      });
    }

    const putPatinetResponse = await PatinetQueryBulider.editPatinet(req);
    res.status(HttpStatus.OK).send(putPatinetResponse);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      error: {
        message: error.message,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
      },
    });
  }
};

const deletePatinet = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({
        errors: errors.array(),
      });
    }

    const deletePatinetResponse = await PatinetQueryBulider.deletePatinet(req);
    res.status(HttpStatus.OK).send(deletePatinetResponse);
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
  getSinglePatinet,
  deletePatinet,
  editPatinet,
  postPatinet,
  getPatient,
};
