const express = require('express');

const router = express.Router();
const { validate } = require('./userValidator');
const {
  authentication,
} = require('../../middleware/auth/authenticationMiddleware');
const {
  authorization,
} = require('../../middleware/auth/authorizationMiddleware');
//auth

const {
  getUserList,
  createUser,
  getSingleUser,
  editUser,
  deleteUser,
} = require('./userService');

router.get('/', authentication, authorization('Admin', 'Doctor'), getUserList);
router.post('/', validate('postUserCase'), createUser);
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
