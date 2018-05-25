const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();
const DocumentService = require('../services/DocumentService');



module.exports.configure = function (app) {

    // main routes
    app.get('/api/records', (eq, res, next) => {
        const { str, id } = eq.body;
        DocumentService.getRecords().then(resolve => {
            res.send(resolve);
        });
    });

    app.post('/api/records/delete', (eq, res, next) => {
        const { id } = eq.body;
        DocumentService.deleteRecord(id).then(resolve => {
            res.send(resolve);
        });
    });

    // app.post('/api/records/add', (eq, res, next) => {
    //     const { str, id } = eq.body;
    //     DocumentService.addRecord().then(resolve => {
    //         res.send(resolve);
    //     });
    // });

    // app.post('/api/records/edit', (eq, res, next) => {
    //     const { str, id } = eq.body;
    //     DocumentService.editRecord().then(resolve => {
    //         res.send(resolve);
    //     });
    // })

};