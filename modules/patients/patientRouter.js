const express = require('express');
const router = express.Router();

const { validate } = require('./patientValidator');
const { authentication } = require('../auth/authenticationMiddleware');
const { authorization } = require('../auth/authorizationMiddleware');

const {
  patientList,
  getSinglePatient,
  createPatient,
  editPatient,
  deletePatient,
} = require('./patientService');

router.get('/', patientList);
router.get('/:patientId', validate('getSinglePatientCase'), getSinglePatient);
router.post('/', validate('postPatientCase'), createPatient);
router.put('/:patientId', validate('editPatientCase'), editPatient);
router.delete('/:patientId', validate('deletePatientCase'), deletePatient);

module.exports = router;
