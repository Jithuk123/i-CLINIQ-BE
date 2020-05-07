const HttpStatus = require('http-status-codes');

const { validationResult } = require('express-validator');
const userQueryBulider = require('./userQueryBulider');

const getUserList = async (req, res, next) => {
  try {
    const UserList = await userQueryBulider.getUserList(req);
    res.send(UserList);
  } catch (error) {
    next(error);
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
    const getSingleUser = await userQueryBulider.getSingleUser(req);
    res.send(getSingleUser);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({
        errors: errors.array(),
      });
    }
    const newUser = await userQueryBulider.createUser(req);
    res.status(HttpStatus.CREATED).send(newUser);
  } catch (error) {
    next(error);
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

    const editUser = await userQueryBulider.editUser(req);
    res.status(HttpStatus.ACCEPTED).send(editUser);
  } catch (error) {
    next(error);
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
    res.status(HttpStatus.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserList,
  getSingleUser,
  createUser,
  editUser,
  deleteUser,
};
