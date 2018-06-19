const router = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const UserServices = require('../services/UserService');
const checkAuth = require('../middleware/auth');

router.post('/singin', (req, res, next) => {
  const { password, username } = req.body
  UserServices.authenticate(username, password).then(user => {
    const token = jwt.sign({
      username: user.username,
      id: user.id,
      group: user.group,
    },
      config.app.secretkey,
      {
        expiresIn: "1h"
      }
    );
    return res.status(200).json({
      message: 'Auth successful',
      token,
      username: user.username,
      id: user.id,
      group: user.group,
    })
  }, error => {
    return res.status(500).json({
      error
    })
  })
});

router.get('/login', checkAuth, (req, res, next) => {
  const header = req.headers.authorization.split(' ');
  const token = header[1];
  UserServices.getUserById(req.userDate.id).then(user => {
    return res.status(200).json({
      message: 'Auth successful',
      token,
      username: user.username,
      group: user.group,
      id: user.id,
    })
  }, err => {
    return res.status(500).json({
      error
    })
  })

})

module.exports = router;