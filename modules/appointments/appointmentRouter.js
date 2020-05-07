const express = require('express');

const router = express.Router();
const { validate } = require('./appointmentValidator');
const {
  authentication,
} = require('../../middleware/auth/authenticationMiddleware');
const {
  authorization,
} = require('../../middleware/auth/authorizationMiddleware');

const {
  appointmentList,
  getSingleAppointment,
  createAppointment,
  deleteAppointment,
  doctorsAppointment,
} = require('./appointmentService');

router.get('/', appointmentList);
router.get(
  '/myAppointment',
  authentication,
  authorization('Doctor'),
  doctorsAppointment
);
router.get(
  '/:appointmentId',
  validate('singleAppointmentCase'),
  getSingleAppointment
);
router.post(
  '/',
  authentication,
  authorization('Admin', 'Doctor'),
  validate('postAppointmentCase'),
  createAppointment
);

router.delete(
  '/:appointmentId',
  validate('deleteAppointmentCase'),
  deleteAppointment
);

module.exports = router;
