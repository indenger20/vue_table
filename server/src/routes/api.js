const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();
const DocumentService = require('../services/DocumentService');
const config = require('../../config/config');
const checkAuth = require('../middleware/auth');


// main routes
router.get('/records', checkAuth, (eq, res, next) => {
  const { str, id } = eq.body;
  DocumentService.getRecords(eq.userDate.id).then(resolve => {
    res.send(resolve);
  });
});

router.post('/records/delete', checkAuth, (eq, res, next) => {
  const { id } = eq.body;
  DocumentService.deleteRecord(id).then(resolve => {
    res.send(resolve);
  });
});

router.post('/records/add', checkAuth, (eq, res, next) => {
  const data = eq.body;
  DocumentService.addRecord({ ...data, user_id: eq.userDate.id }).then(resolve => {
    res.send(resolve);
  });
});

router.put('/records/edit', checkAuth, (eq, res, next) => {
  const { record, first_name, last_name } = eq.body;
  DocumentService.editRecord({ id: record.id, first_name, last_name }).then(resolve => {
    res.send(resolve);
  });
});

router.post('/records/search', checkAuth, (eq, res, next) => {
  const { query } = eq.body;
  DocumentService.searchRecord(query, eq.userDate.id).then(resolve => {
    res.send(resolve);
  });
});

module.exports = router;