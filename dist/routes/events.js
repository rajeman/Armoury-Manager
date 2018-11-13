'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _validators = require('../helpers/validators');

var _dbQuery = require('../crud/db-query');

var _responses = require('../helpers/responses');

var _responses2 = _interopRequireDefault(_responses);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var eventsRouter = _express2.default.Router();

eventsRouter.post('/', _validators.validateEventInput, function (req, res) {
  // query database

  (0, _dbQuery.createEvent)(req.body).then(function () {
    (0, _responses2.default)(res, 201, 'event \'' + req.body.timestamp + '\' was successfully uploaded');
  }).catch(function () {
    // console.log(e);
    (0, _responses2.default)(res, 500, null, 'Internal server error');
  });
});

exports.default = eventsRouter;
//# sourceMappingURL=events.js.map