const express = require("express");
const cors = require('../node_modules/cors')
const error = require('./error')
const utils = require('./mock-api-utils')
const port = 3000;

// route controllers
const recordRouter = require("./routes/mock-record-api");
const clientRouter = require("./routes/mock-client-api");
const entityRouter = require("./routes/mock-entity-api");
const scheduleRouter = require("./routes/mock-schedule-api");

const apiBase = '/quarantine-api/v1';

const app = express();

app.use(express.json());
app.use(cors());

app
  .use(function (req, res, next) {
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    next();
  })
  .options('*', function (req, res, next) {
    res.end();
  })
;

app.use(function (req, res, next) {
  console.log('%s %s', req.method, req.url);
  next();
});

function availableRoutes() {
  return app._router.stack
    .filter(r => r.route)
    .map(r => {
      return {
        method: Object.keys(r.route.methods)[0].toUpperCase(),
        path: r.route.path
      };
    });
}

app.get('/', (req, res) => {
  res.send("Welcome to the mock API");
})

app.get('/api', (req, res) => {
  res.send(availableRoutes(app));
})

// MOCK API
app.get(apiBase + '/config', function (req, res) {
  res.json(new utils.JSONReader('./responses/config').getObject());
});

// MOCK SEARCH API
app.get(apiBase + '/records', function (req, res) {
  const terms = req.query.terms;
  const columns = req.query.columns;
  const records = utils.randomRecords();
  res.json(records);
});

// EXAMPLES
app.get('/examples/random', function (req, res) {
const records = utils.randomRecords();
  res.json(records);
});

app.get('/examples/config', function (req, res) {
  utils.delayResponse(res, new utils.JSONReader('./responses/config').getObject(), 0)
});

app.get('/examples/error', function (req, res) {
  const type = req.query.type ? Number(req.query.type) : 404;
  return error.error(res, type);
});

app.get('/examples/query', function (req, res) {
  const key = req.query.key;
  if (key === 'root')
    res.json(new utils.JSONReader('./responses/root').getObject());

  if (key === 'collections_carousel')
    res.json(new utils.JSONReader('./responses/carousel-empty').getObject());
});

app.get('/examples/addHeaders', function (req, res) {
  utils.addHeaders(res);
  res.json(new utils.JSONReader('./responses/config').getObject());
});

app.post('/examples/delayResponse', function (req, res, next) {

  console.log(req.body);

  try {
    let {delay} = req.body;
    utils.delayResponse(res, new utils.JSONReader('./responses/config').getObject(), delay !== undefined ? delay : 2);
  } catch (error) {
    error.type = "bad request";
    next(error);
  }

});

// add route controllers here
app.use(apiBase + '/records', recordRouter);
app.use(apiBase + '/clients', clientRouter);
app.use(apiBase + '/entities', entityRouter);
app.use(apiBase + '/schedules', scheduleRouter);

let mock_api = app.listen({port}, () => {
  console.log('MOCK API STARTED... LISTENING ON PORT: ', mock_api.address().port)
})

module.exports = app;
