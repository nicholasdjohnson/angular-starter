const utils = require('../mock-api-utils')
const express = require("express");

const recordRouter = express.Router();

// Record router
recordRouter.route('/')
  // Get all records
  .get(function(req, res) {
    // res.json(new utils.JSONReader('./responses/record/mock-records').getObject());
    const records = utils.randomRecords();
    utils.delayResponse(res, records, 1.5);
    // res.json(records);
  })

recordRouter.route('/search')
  // Get record by id
  .post(function(req, res) {
    const records = utils.randomRecords();
    utils.delayResponse(res, records, 1.5);
  })

recordRouter.route('/:recordId')
  // Get record by id
  .get(function(req, res) {
    res.json(new utils.JSONReader('./responses/record/mock-record').getObject());
  })

  // Update record by id
  .put(function(req, res, next) {
    utils.sendAddUpdateResponse(req, res, new utils.JSONReader('./responses/record/mock-record').getObject());
  })

  // Remove record by id
  .delete(function(req, res) {
    res.json({status:"Record removed successfully."});
  })

recordRouter.route('/:recordId/retry')
  // Reprocess record by id
  .post(function(req, res) {
    console.log(req.body);
    utils.delayResponse(res, {status:"Record reprocess initiated."}, 1);
  })

recordRouter.route('/:recordId/dependencies')
  // Get record dependencies
  .get(function(req, res) {
    res.json(new utils.JSONReader('./responses/record/mock-record-dependencies').getObject());
  })

recordRouter.route('/search/options')
  // Get record dependencies
  .get(function(req, res) {
    res.json(new utils.JSONReader('./responses/search-options').getObject());
  })

recordRouter.route('/bulk/options')
  // Get record dependencies
  .get(function(req, res) {
    res.json(new utils.JSONReader('./responses/bulk-options').getObject());
  })
module.exports = recordRouter;
