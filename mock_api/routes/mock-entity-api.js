const utils = require('../mock-api-utils')
const express = require("express");

const entityRouter = express.Router();
  
// Entity route
entityRouter.route('/')
  // Get all entities
  .get(function(req, res) {
    res.json(new utils.JSONReader('./responses/entity/mock-entities').getObject());
  })

  // Add entity
  .post(function(req, res) {
    utils.sendAddUpdateResponse(req, res, new utils.JSONReader('./responses/entity/mock-entity').getObject());
  })

  entityRouter.route('/:entityId')
   // Get entity by id
  .get(function(req, res) {
    res.json(new utils.JSONReader('./responses/entity/mock-entity').getObject());
  })

  // Update entity by id
  .put(function(req, res) {
    utils.sendAddUpdateResponse(req, res, new utils.JSONReader('./responses/entity/mock-entity').getObject());
  })

module.exports = entityRouter;