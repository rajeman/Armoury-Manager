'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPositiveInteger = exports.validateEventInput = undefined;

var _responses = require('./responses');

var _responses2 = _interopRequireDefault(_responses);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isPositiveInteger = function isPositiveInteger(s) {
  return (/^\+?[1-9][\d]*$/.test(s)
  );
};
var validateEventInput = function validateEventInput(req, res, next) {
  var _req$body = req.body,
      userId = _req$body.userId,
      rankId = _req$body.rankId,
      gunId = _req$body.gunId,
      timestamp = _req$body.timestamp,
      action = _req$body.action;

  if (!isPositiveInteger(userId)) {
    (0, _responses2.default)(res, 400, null, 'userId must be a positive integer');
    return;
  }
  if (!isPositiveInteger(rankId)) {
    (0, _responses2.default)(res, 400, null, 'rankId must be a positive integer');
    return;
  }

  if (!isPositiveInteger(gunId)) {
    (0, _responses2.default)(res, 400, null, 'gunId must be a positive integer');
    return;
  }

  if (!isPositiveInteger(timestamp)) {
    (0, _responses2.default)(res, 400, null, 'timestamp must be a positive integer');
    return;
  }

  if (!isPositiveInteger(action)) {
    (0, _responses2.default)(res, 400, null, 'action must be a positive integer');
    return;
  }
  next();
};

exports.validateEventInput = validateEventInput;
exports.isPositiveInteger = isPositiveInteger;
//# sourceMappingURL=validators.js.map