'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var integerError = 'must be a positive integer';
describe('POST /events', function () {
  it('should return userId error with empty body request', function () {
    return (0, _supertest2.default)(_app2.default).post('/api/v1/events').send({}).set('Accept', 'application/json').expect(400).then(function (response) {
      (0, _expect2.default)(response.body.error).toContain('userId');
      (0, _expect2.default)(response.body.error).toContain(integerError);
    });
  });
  it('should return userId error with non-integer userId', function () {
    return (0, _supertest2.default)(_app2.default).post('/api/v1/events').send({
      userId: 'gh'
    }).set('Accept', 'application/json').expect(400).then(function (response) {
      (0, _expect2.default)(response.body.error).toContain('userId');
      (0, _expect2.default)(response.body.error).toContain(integerError);
    });
  });

  it('should return rankId error with non-integer rankId', function () {
    return (0, _supertest2.default)(_app2.default).post('/api/v1/events').send({
      userId: '18',
      rankId: 'li'
    }).set('Accept', 'application/json').expect(400).then(function (response) {
      (0, _expect2.default)(response.body.error).toContain('rankId');
      (0, _expect2.default)(response.body.error).toContain(integerError);
    });
  });

  it('should return gunId error with non-integer gunId', function () {
    return (0, _supertest2.default)(_app2.default).post('/api/v1/events').send({
      userId: '18',
      rankId: '10',
      gunId: 'it'
    }).set('Accept', 'application/json').expect(400).then(function (response) {
      (0, _expect2.default)(response.body.error).toContain('gunId');
      (0, _expect2.default)(response.body.error).toContain(integerError);
    });
  });

  it('should return timestamp error with non-integer timestamp', function () {
    return (0, _supertest2.default)(_app2.default).post('/api/v1/events').send({
      userId: '18',
      rankId: '10',
      gunId: '2',
      timestamp: 'none'
    }).set('Accept', 'application/json').expect(400).then(function (response) {
      (0, _expect2.default)(response.body.error).toContain('timestamp');
      (0, _expect2.default)(response.body.error).toContain(integerError);
    });
  });

  it('should return action error with non-integer action', function () {
    return (0, _supertest2.default)(_app2.default).post('/api/v1/events').send({
      userId: '18',
      rankId: '10',
      gunId: '2',
      timestamp: '161234567'
    }).set('Accept', 'application/json').expect(400).then(function (response) {
      (0, _expect2.default)(response.body.error).toContain('action');
      (0, _expect2.default)(response.body.error).toContain(integerError);
    });
  });
});
//# sourceMappingURL=events.test.js.map