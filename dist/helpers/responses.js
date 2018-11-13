"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var sendResponse = function sendResponse(res, code, message, error) {
  res.status(code).send({
    message: message || undefined,
    error: error || undefined
  });
};

exports.default = sendResponse;
//# sourceMappingURL=responses.js.map