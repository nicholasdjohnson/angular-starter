const utils = require('../mock-api-utils')
const express = require("express");

const scheduleRouter = express.Router();

// Schedule router
scheduleRouter.route('/')
  // Get all schedules
  .get(function(req, res) {
    res.json(new utils.JSONReader('./responses/schedule/mock-schedules').getObject());
    //const records = utils.randomRecords();
    utils.delayResponse(res, records, 1.5);
    // res.json(records);
  })

scheduleRouter.route('/search')
  // Get record by id
  .post(function(req, res) {
    const records = utils.randomRecords();
    utils.delayResponse(res, records, 1.5);
  })

scheduleRouter.route('/:scheduleId')
  // Get schedule by id
  .get(function(req, res) {
    res.json(new utils.JSONReader('./responses/schedule/mock-schedule').getObject());
  })

  // Update schedule by id
  .put(function(req, res, next) {
    utils.sendAddUpdateResponse(req, res, new utils.JSONReader('./responses/schedule/mock-schedule').getObject());
  })

  // Remove schedule by id
  .delete(function(req, res) {
    res.json({status:"Schedule removed successfully."});
  })

scheduleRouter.route('/search/options')
  // Get record dependencies
  .get(function(req, res) {
    res.json(new utils.JSONReader('./responses/search-options').getObject());
  })

scheduleRouter.route('/bulk/options')
  // Get record dependencies
  .get(function(req, res) {
    res.json(new utils.JSONReader('./responses/bulk-options').getObject());
  })
module.exports = scheduleRouter;
