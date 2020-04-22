const HttpStatus = require('http-status-codes');

const { validationResult } = require('express-validator');
const userQueryBulider = require('./userQueryBulider');

const getUser = async (req, res, next) => {
  try {
    const getUserResponse = await userQueryBulider.getuser(req);
    res.status(HttpStatus.OK).send(getUserResponse);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      error: {
        message: error.message,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
      },
    });
  }
};

const getSingleUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({
        errors: errors.array(),
      });
    }
    const getSingleUserResponse = await userQueryBulider.getSingleUser(req);
    res.status(HttpStatus.ACCEPTED).send(getSingleUserResponse);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      error: {
        message: error.message,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
      },
    });
  }
};

const postUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({
        errors: errors.array(),
      });
    }

    const postUserResponse = await userQueryBulider.postuser(req);
    res.status(HttpStatus.CREATED).send(postUserResponse);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      error: {
        message: error.message,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
      },
    });
  }
};

const editUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({
        errors: errors.array(),
      });
    }

    const putUserResponse = await userQueryBulider.editUser(req);
    res.status(HttpStatus.OK).send(putUserResponse);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      error: {
        message: error.message,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
      },
    });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({
        errors: errors.array(),
      });
    }

    const deleteUserResponse = await userQueryBulider.deleteUser(req);
    res.status(HttpStatus.OK).send(deleteUserResponse);
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
  getUser,
  getSingleUser,
  postUser,
  editUser,
  deleteUser,
};
