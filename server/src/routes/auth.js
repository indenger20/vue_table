const router = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const UserServices = require('../services/UserService');
const bcrypt = require('bcrypt');

router.post('/login', (req, res, next) => {
  const { password, username } = req.body
  UserServices.authenticate(username, password).then(user => {
    const token = jwt.sign({
      username: user.username,
      id: user.id
    },
      config.app.secretkey,
      {
        expiresIn: "1h"
      }
    );
    return res.status(200).json({
      message: 'Auth successful',
      token
    })
  }, error => {
    return res.status(500).json({
      error
    })
  })
});

module.exports = router;