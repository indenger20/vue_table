const router = require('express').Router();
const passport = require('../../config/passport');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const UserServices = require('../services/UserService');


// login
router.get('/getUser', passport.authenticate('jwt', { session: false }), (req, res) => {
  return res.send(req.user);
});

router.post('/seedUser', (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(401).send('no fields');
  }

  // const user = new User({
  //   email: req.body.email,
  //   password: req.body.password
  // });

  // user.save().then(() => {
  //   res.send('ok');
  // });
});

router.post('/getToken', (req, res) => {
  if (!req.body.password || !req.body.username) {
    return res.status(401).send('no fields');
  }
  UserServices.authenticate(req.body.username, req.body.password).then(user => {
      const payload = { id: user.id };
      const token = jwt.sign(payload, config.app.secretkey);
      res.send(token);
  }, err => res.status(401).send({ err: err }));
});

router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send('i\'m protected');
});

module.exports = router;