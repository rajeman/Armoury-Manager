'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _events = require('./routes/events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || 5009;

var app = (0, _express2.default)();
app.use(_bodyParser2.default.json());

app.get('/', function (req, res) {
  res.send({ message: 'Welcome to Armoury Manager' });
});
app.use('/api/v1/events', _events2.default);
app.use('*', function (req, res) {
  res.status(404).send({ error: 'Invalid Route' });
});

app.listen(port, function () {
  console.log('Armoury Manager started on port ' + port + '.');
});

exports.default = app;
//# sourceMappingURL=app.js.map