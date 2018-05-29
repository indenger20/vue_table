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
    DocumentService.getRecords().then(resolve => {
      res.send(resolve);
    });
  });

  router.post('/records/delete', (eq, res, next) => {
    const { id } = eq.body;
    DocumentService.deleteRecord(id).then(resolve => {
      res.send(resolve);
    });
  });

  router.post('/records/add', (eq, res, next) => {
    const data = eq.body;
    DocumentService.addRecord(data).then(resolve => {
      res.send(resolve);
    });
  });

  router.post('/records/edit', (eq, res, next) => {
    const { record, first_name, last_name } = eq.body;
    DocumentService.editRecord({ id: record.id, first_name, last_name }).then(resolve => {
      res.send(resolve);
    });
  });

module.exports = router;