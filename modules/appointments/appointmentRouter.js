const express = require('express');

const router = express.Router();
const { validate } = require('./appointmentValidator');

const {
  appointmentList,
  getSingleAppointment,
  createAppointment,
  deleteAppointment,
} = require('./appointmentService');

router.get('/', appointmentList);
router.get(
  '/:appointmentId',
  validate('SingleAppointmentCase'),
  getSingleAppointment
);
router.post('/', validate('postAppointmentCase'), createAppointment);

router.delete(
  '/:appointmentId',
  validate('editAppointmentCase'),
  deleteAppointment
);
module.exports = router;
