const express = require('express');

const router = express.Router();
const { validate } = require('./userValidator');
const { authentication } = require('../auth/authenticationMiddleware');
const { authorization } = require('../auth/authorizationMiddleware');
//auth

const {
  getUserList,
  createUser,
  getSingleUser,
  editUser,
  deleteUser,
} = require('./userService');

router.get('/', authentication, authorization('Admin', 'User'), getUserList);
router.post(
  '/',

  validate('postUserCase'),
  createUser
);
router.get(
  '/:userId',
  authentication,
  authorization('Admin'),

  validate('getSingleUserCase'),
  getSingleUser
);
router.put(
  '/:userId',
  authentication,
  authorization('Admin'),
  validate('editUserCase'),
  editUser
);
router.delete(
  '/:userId',
  authentication,
  authorization('Admin'),
  validate('deleteUserCase'),
  deleteUser
);

module.exports = router;
