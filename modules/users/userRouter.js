const express = require('express');

const router = express.Router();
const { validate } = require('./userValidator');
//auth

const {
  getUser,
  postUser,
  getSingleUser,
  editUser,
  deleteUser,
} = require('./userService');

router.get('/', getUser);
router.post('/', validate('postUserCase'), postUser);
router.get('/:userId', validate('getSingleUserCase'), getSingleUser);
router.put('/:userId', validate('editUserCase'), editUser);
router.delete('/:userId', validate('deleteUserCase'), deleteUser);

module.exports = router;
