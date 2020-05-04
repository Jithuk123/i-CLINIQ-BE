const express = require('express');
const router = express.Router();

const { validate } = require('./observationValidator');
const { authentication } = require('../auth/authenticationMiddleware');
const { authorization } = require('../auth/authorizationMiddleware');

const {
  observationList,
  getSingleObservation,
  createObservation,
  deleteObservation,
} = require('./observationService');

router.get('/', observationList);
router.get(
  '/:observationId',
  validate('getSingleObservationCase'),
  getSingleObservation
);
router.post(
  '/',
  authentication,
  authorization('Admin'),
  validate('postObservationCase'),
  createObservation
);
router.delete(
  '/:observationId',
  validate('deleteObservationCase'),
  deleteObservation
);

module.exports = router;
