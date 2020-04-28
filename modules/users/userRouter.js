const express = require('express');

const router = express.Router();
const { validate } = require('./userValidator');
const { authentication } = require('../auth/authenticationMiddleware');
const { authorization } = require('../auth/authorizationMiddleware');
//auth

const {
  getUser,
  postUser,
  getSingleUser,
  editUser,
  deleteUser,
} = require('./userService');

router.get('/', authentication, authorization('Admin'), getUser);
router.post(
  '/',

  validate('postUserCase'),
  postUser
);
router.get(
  '/:userId',
  authentication,

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
