const { body, param } = require('express-validator');
const { labTestcase } = require('../../models');
const validate = (method) => {
  switch (method) {
    case 'postLabReportCase': {
      return [
        body('observationId')
          .exists()
          .withMessage('observationId is required')
          .isUUID()
          .custom((value) =>
            labTestcase
              .findOne({ where: { observationId: value } })
              .then((observationId) => {
                if (observationId) {
                  throw new Error(
                    ' Test Result of this patient is already starts processing '
                  );
                }
              })
          ),

        body('patientId')
          .exists()
          .withMessage('patientId is required')
          .isUUID(),
        body('testId').exists().withMessage('testId is required').isUUID(),
        body('resultUrl')
          .exists()
          .withMessage('Please attach Test Report link'),
        body('isResultGenerated')
          .exists()
          .withMessage('isResultGenerated required'),
      ];
    }

    case 'singleLabReportCase': {
      return [
        param('labReportId')
          .exists()
          .custom((value) =>
            labTestcase.findByPk(value).then((labTestCaseData) => {
              if (!labTestCaseData) {
                {
                  throw new Error('Lab report for this ID  does not exist!!');
                }
              }
            })
          ),
      ];
    }

    case 'deleteLabReportCase': {
      return [
        param('labReportId')
          .exists()
          .custom((value) =>
            labTestcase.findByPk(value).then((labTestCaseData) => {
              if (!labTestCaseData) {
                {
                  throw new Error('labTestCase does not exist!!');
                }
              }
            })
          ),
      ];
    }
    case 'editLabReportCase': {
      return [
        param('labReportId')
          .exists()
          .withMessage('labReport Id  is required')
          .custom((value) =>
            labTestcase.findByPk(value).then((labReport) => {
              if (labReport) {
                throw new Error('Test already exist');
              }
            })
          ),
      ];
    }

    default:
      throw new Error();
  }
};
module.exports = {
  validate,
};
