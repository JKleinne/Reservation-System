/**
 * Central file to init routes
 * @param app
 */
module.exports = (app) => {
  app.use('/users', require('./students'))
};
