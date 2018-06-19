const express = require('express');
const router = express.Router();
const DocumentService = require('../services/DocumentService');
const checkAuth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

router.use(checkAuth);

// main routes
router.get('/records', (eq, res, next) => {
  const { str, id } = eq.body;
  DocumentService.getRecords(eq.userDate.id).then(resolve => {
    res.send(resolve);
  });
});

router.delete('/records/:id', (eq, res, next) => {
  const id = +eq.params.id;
  DocumentService.deleteRecord(id).then(resolve => {
    res.send(resolve);
  });
});

router.post('/records/', (eq, res, next) => {
  const data = eq.body;
  DocumentService.addRecord({ ...data, user_id: eq.userDate.id }).then(resolve => {
    res.send(resolve);
  });
});

router.put('/records/', (eq, res, next) => {
  const { record, first_name, last_name } = eq.body;
  DocumentService.editRecord({ id: record.id, first_name, last_name }).then(resolve => {
    res.send(resolve);
  });
});

router.get('/records/admin', isAdmin, (eq, res, next) => {
  DocumentService.getRecordsAll().then(resolve => {
    res.send(resolve);
  });
})

module.exports = router;