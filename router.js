const userRouter = require('./modules/users/userRouter');
const medicineRouter = require('./modules/medicines/medicineRoute');
const testRouter = require('./modules/testCases/testCaseRouter');
module.exports = (app) => {
  app.use('/api/users', userRouter);
  app.use('/api/medicines', medicineRouter);
  app.use('/api/tests', testRouter);
};
