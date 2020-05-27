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
  getDoctorList,
  getLabTechnicianList,
  userMedicineCount,
} = require('./userService');

router.get('/', authentication, authorization('Admin', 'Doctor'), getUserList);
router.get('/doctors', getDoctorList);
router.post(
  '/',
  authentication,
  authorization('Admin'),
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
// router.get('/counts', userMedicineCount);

router.get('/doctors', getLabTechnicianList);

module.exports = router;
