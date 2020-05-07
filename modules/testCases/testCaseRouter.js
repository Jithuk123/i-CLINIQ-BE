const express = require('express');
const router = express.Router();
const { validate } = require('./testCaseValidator');

const {
  getTest,
  getSingleTest,
  postTest,
  editTest,
  deleteTest,
} = require('./testCaseService');

router.get('/', getTest);

router.get('/:testId', validate('getSingleTestCase'), getSingleTest);
router.post('/', validate('postTestCase'), postTest);
router.put('/:testId', validate('editTestCase'), editTest);
router.delete('/:testId', validate('deleteTestCase'), deleteTest);

module.exports = router;
