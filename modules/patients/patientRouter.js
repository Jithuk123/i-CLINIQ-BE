const express = require('express');
const router = express.Router();

const { validate } = require('./patientValidator');
const {
  authentication,
} = require('../../middleware/auth/authenticationMiddleware');
const {
  authorization,
} = require('../../middleware/auth/authorizationMiddleware');

const {
  patientList,
  getSinglePatient,
  createPatient,
  editPatient,
  deletePatient,
} = require('./patientService');

router.get('/', authentication, patientList);
router.get(
  '/:patientId',
  authentication,
  validate('getSinglePatientCase'),
  getSinglePatient
);
router.post('/', authentication, validate('postPatientCase'), createPatient);
router.put(
  '/:patientId',
  authentication,
  validate('editPatientCase'),
  editPatient
);
router.delete(
  '/:patientId',
  authentication,
  validate('deletePatientCase'),
  deletePatient
);

module.exports = router;
