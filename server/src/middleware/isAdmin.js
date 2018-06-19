const UserService = require('../services/UserService');

module.exports = (req, res, next) => {
  const user = req.userDate;
  if (UserService.isAdmin(user)) {
    return next();
  }
  req.body = { error: 'Forbidden' };
  req.status = 403;
};