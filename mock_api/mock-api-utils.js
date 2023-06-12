
const fs = require('fs');
const path = require("path");

const allCapsAlpha = [..."ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"];
const allLowerAlpha = [..."abcdefghijklmnñopqrstuvwxyz"];
const allUniqueChars = [..."~!@#$%^&*()_+-=[]\{}|;:'\",./<>?"];
const allNumbers = [..."0123456789"];

const base = [...allCapsAlpha, ...allNumbers, ...allLowerAlpha, ...allUniqueChars];

const generator = (base, len) => {
  return [...Array(len)]
    .map(i => base[Math.random() * base.length | 0])
    .join('');
};

const entitySeed = {
  calmsId: "MOCK",
  title: "Search Result",
  description: "Description here. Blah blah blah blah.",
  subject: "Math",
  gradeLevel: [
    "K",
    "1",
    "2"
  ]
};

const recordSeed = '{"source": "PowerSchool","target": "D2L","payload": "json message payload","retryCount": 2,"callbackUrl": "https://quarantine-callback/ps/5123","created": "2023-04-02 12:23:12","updated": "2023-04-03 16:47:35","metadata": {"client": "TIBCO", "process": "Student Enrollment", "relatedEntity": "abc123"},"missingEntities": [{"id": "abc123", "name": "student"}, {"id": "abc4123", "name": "classroom"}]}';

const lmsTypes = [
  'D2L',
  'PEAK',
  'SAMS',
  'OLS',
  'PowerSchool',
  'OCD',
  'PS'
];

const client = [
  'TIBCO',
  'Source One',
  'Source Two',
  'Source Three',
  'Source Four',
];

const statii = [
  'active',
  'archived',
  'scheduled'
]

const startDate = new Date('2023-01-01');
const endDate = new Date();
const timeDiff = endDate.getTime() - startDate.getTime();

const getDate = () => {
  const randomTime = Math.random() * timeDiff;
  const randomDate = new Date(startDate.getTime() + randomTime);
  return randomDate.toISOString().slice(0, 19);
}

const randomNumber = (max, min) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomItem = (array, disallowed) => {
  let local = array;
  if (disallowed) {
    local = local.filter(lms => lms !== disallowed);
  }
  return local[randomNumber(local.length-1, 0)];

}

const randomRecord = (salt) =>  {

  const record = JSON.parse(recordSeed);
  // const randoText = generator(base, 6);

  const date1 = getDate();
  const date2 = getDate();

  record.id = randomNumber(1, 4000);
  record.created = date1 < date2 ? date1 : date2;
  record.updated = date1 < date2 ? date2 : date1;
  record.retryCount = randomNumber(8, 1);
  record.client = randomItem(client);
  record.status = randomItem(statii);
  record.target = randomItem(lmsTypes);
  record.source = randomItem(lmsTypes, record.target);
  // TODO add random versions of payload, metadata, missingEntities
  // record.metadata = xxx
  // record.relatedEntities = xxx

  return record;
}

module.exports = {

  randomRecords: function () {
    const records = [];
    const rand = randomNumber(100, 20);
    for (let i=0; i<=rand; i++) {
      records.push(randomRecord('blah'));
    }
    return records;
  },



  delayResponse: function delayResponse(res, responseObj, delaySeconds) {
    setTimeout(function () {
      res.json(responseObj);
    }, delaySeconds * 1000);
  },

  delayResponseSuccess: function (res, delaySeconds) {
    setTimeout(function () {
      res.sendStatus(200)
    }, delaySeconds * 1000);
  },

  JSONReader: function (filePath) {

    this.getPath = function () {
      return path.resolve(__dirname, filePath + '.json');
    }

    this.getString = function () {
      return fs.readFileSync(this.getPath(), {encoding: 'utf8', flag: 'r'});
    }

    this.getObject = function () {
      return JSON.parse(this.getString());
    }

  },

  /**
   * addHeaders
   * adds needed headers to response
   * @param {Response} res
   */
  addHeaders: function (res) {
    res.set({
      'k12-auth-token': '123',
      'k12-client-locale': '123'
    });
  },

  availableRoutes: function (app) {
    return app._router.stack
      .filter(r => r.route)
      .map(r => {
        return {
          method: Object.keys(r.route.methods)[0].toUpperCase(),
          path: r.route.path
        };
      });
  },

  sendAddUpdateResponse: function(req, res, responseObj) {
    console.log(req.body);
    if (!Object.keys(req.body).length) {
      res.sendStatus(400);
    } else {
      this.delayResponse(res, responseObj, 1);
    }
  }

}
