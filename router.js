const userRouter = require('./modules/users/userRouter');
const medicineRouter = require('./modules/medicines/medicineRoute');
module.exports = (app) => {
  app.use('/api/users', userRouter);
  app.use('/api/medicines', medicineRouter);
};
