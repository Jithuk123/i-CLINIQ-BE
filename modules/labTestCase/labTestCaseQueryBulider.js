const DB = require('../../models');

const labReportList = async (req) => {
  let query = {
    limit: req.query.limit || 10,
    page: req.query.page || 1,
    sortKey: req.query.sortKey || 'observationId',
    sortOrder: req.query.sortOrder || 'asc',
  };

  let labReportData = await DB.labTestcase.findAndCountAll({
    offset: query.limit * (query.page - 1),
    limit: query.limit,
    order: [[query.sortKey, query.sortOrder]],
  });
  return {
    metaData: {
      page: query.page,
      perPage: query.limit,
      totalCount: labReportData.count,
      totalPage: Math.ceil(labReportData.count / query.limit),
      sortKey: query.sortKey,
      sortOrder: query.sortOrder,
    },
    records: labReportData.rows,
  };
};

const singleLabReport = async (req) => {
  console.log(req.params.labReportId, 'ssssssss');
  return DB.labTestcase.findByPk(req.params.labReportId).then((result) => {
    if (!result) {
      throw new Error('Not Found!!');
    } else {
      return result;
    }
  });
};

const deleteLabReport = async (req) => {
  return DB.labTestcase.findByPk(req.params.labReportId).then((result) => {
    if (!result) {
      throw new Error('Not Found!!');
    } else {
      return result.destroy();
    }
  });
};

const createLabReport = async (req) => {
  return await DB.labTestcase.create({
    observationId: req.body.observationId,
    patientId: req.body.patientId,
    testId: req.body.testId,
    resultUrl: req.body.resultUrl,
    isResultGenarated: req.body.isResultGenerated,
    createdBy: req.decode.userId,
  });
};

const editLabReport = (req) =>
  DB.labTestcase.findByPk(req.params.labReportId).then((result) => {
    if (!result) {
      throw new Error('NOT FOUND');
    }
    return result.update({
      resultUrl: req.body.resultUrl,
      isResultGenarated: req.body.isResultGenerated,
    });
  });

module.exports = {
  labReportList,
  singleLabReport,
  createLabReport,
  deleteLabReport,
  editLabReport,
};
