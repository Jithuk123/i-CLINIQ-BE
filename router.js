const userRouter = require('./modules/users/userRouter');
const medicineRouter = require('./modules/medicines/medicineRoute');
const testRouter = require('./modules/testCases/testCaseRouter');
const accountRouter = require('./modules/account/accountRouter');

module.exports = (app) => {
  app.use('/api/users', userRouter);
  app.use('/api/medicines', medicineRouter);
  app.use('/api/tests', testRouter);
  app.use('/api/login', accountRouter);
};
