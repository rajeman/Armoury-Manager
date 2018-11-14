import sendResponse from './responses';


const isPositiveInteger = s => /^\+?[1-9][\d]*$/.test(s);
const validateEventInput = (req, res, next) => {
  const {
    userId, rankId, gunId, timestamp, action,
  } = req.body;
  if (!isPositiveInteger(userId)) {
    sendResponse(res, 400, null, 'userId must be a positive integer');
    return;
  }
  if (!isPositiveInteger(rankId)) {
    sendResponse(res, 400, null, 'rankId must be a positive integer');
    return;
  }

  if (!isPositiveInteger(gunId)) {
    sendResponse(res, 400, null, 'gunId must be a positive integer');
    return;
  }

  if (!isPositiveInteger(timestamp)) {
    sendResponse(res, 400, null, 'timestamp must be a positive integer');
    return;
  }

  if (!isPositiveInteger(action)) {
    sendResponse(res, 400, null, 'action must be a positive integer');
    return;
  }
  next();
};

const verifyInput = (req, res, next) => {
  if (!(req.body.username && req.body.username.length > 2
   && req.body.username.length < 15)) {
    sendResponse(res, 400, null, 'invalid username');
    return;
  }

  if (!(req.body.password && req.body.password.length > 2
   && req.body.username.length < 15)) {
    sendResponse(res, 400, null, 'invalid password');
    return;
  }
  next();
};

export {
  validateEventInput, isPositiveInteger, verifyInput,
};
