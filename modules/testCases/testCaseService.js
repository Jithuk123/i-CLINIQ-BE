const testQueryBulider = require('./testCaseQueryBulider');
const HttpStatus = require('http-status-codes');
const { validationResult } = require('express-validator');

const getTest = async (req, res) => {
  try {
    const getTestResponse = await testQueryBulider.getTest(req);
    res.send(getTestResponse);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      error: {
        message: error.message,
        code: HttpStatus.code,
      },
    });
  }
};
const getSingleTest = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({
        errors: errors.array(),
      });
    }

    const getSingleTestResponse = await testQueryBulider.getSingleTest(req);
    res.send(getSingleTestResponse);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      error: {
        message: error.message,
        code: HttpStatus.code,
      },
    });
  }
};

const postTest = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({
        errors: errors.array(),
      });
    }

    const postTestResponse = await testQueryBulider.postTest(req);
    res.status(HttpStatus.CREATED).send(postTestResponse);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      error: {
        message: error.message,
        code: HttpStatus.code,
      },
    });
  }
};

const editTest = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({
        errors: errors.array(),
      });
    }

    const editTestResponse = await testQueryBulider.editTest(req);
    res.status(HttpStatus.ACCEPTED).send(editTestResponse);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      error: {
        message: error.message,
        code: HttpStatus.code,
      },
    });
  }
};

const deleteTest = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({
        errors: errors.array(),
      });
    }

    const deleteTestResponse = await testQueryBulider.deleteTest(req);
    res.status(HttpStatus.NO_CONTENT).send();
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      error: {
        message: error.message,
        code: HttpStatus.code,
      },
    });
  }
};

module.exports = {
  getTest,
  getSingleTest,
  postTest,
  editTest,
  deleteTest,
};
