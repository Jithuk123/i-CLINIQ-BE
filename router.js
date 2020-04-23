const userRouter = require('./modules/users/userRouter');
module.exports = (app) => {
  app.use('/api/users', userRouter);
};
