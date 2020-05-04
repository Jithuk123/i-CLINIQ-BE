const express = require('express');

const router = express.Router();
const { validate } = require('./appointmentValidator');
const { authentication } = require('../auth/authenticationMiddleware');
const { authorization } = require('../auth/authorizationMiddleware');

const {
  appointmentList,
  getSingleAppointment,
  createAppointment,
  deleteAppointment,
} = require('./appointmentService');

router.get('/', appointmentList);
router.get(
  '/:appointmentId',
  validate('singleAppointmentCase'),
  getSingleAppointment
);
router.post(
  '/',
  authentication,
  validate('postAppointmentCase'),
  createAppointment
);

router.delete(
  '/:appointmentId',
  validate('deleteAppointmentCase'),
  deleteAppointment
);
module.exports = router;
