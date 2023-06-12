const utils = require('../mock-api-utils')
const express = require("express");

const clientRouter = express.Router();
  
// Clients route
clientRouter.route('/')
  // Get all clients
  .get(function(req, res) {
    res.json(new utils.JSONReader('./responses/client/mock-clients').getObject());
  })

  // Add client
  .post(function(req, res) {
    utils.sendAddUpdateResponse(req, res, new utils.JSONReader('./responses/client/mock-client').getObject());
  })

clientRouter.route('/:clientId')
   // Get client by id
  .get(function(req, res) {
    res.json(new utils.JSONReader('./responses/client/mock-client').getObject());
  })
  
  // Update client by id
  .put(function(req, res) {
    utils.sendAddUpdateResponse(req, res, new utils.JSONReader('./responses/client/mock-client').getObject());
  })

module.exports = clientRouter;