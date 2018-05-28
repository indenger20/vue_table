const express = require('express');
const router = express.Router();

const auth = require('./auth');
const api = require('./api');

router.use('/auth', auth);
router.use('/api', api);

module.exports = router;