import jwt from 'jsonwebtoken';
import sendResponse from './responses';
import { getUser } from '../crud/db-query';

let secretKey = process.env.TOKEN_KEY;

if (process.env.current_env === 'test') {
  secretKey = process.env.TEST_TOKEN_KEY;
}
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
    sendResponse(res, 400, null, 'Invalid username');
    return;
  }

  if (!(req.body.password && req.body.password.length > 2
   && req.body.username.length < 15)) {
    sendResponse(res, 400, null, 'Invalid password');
    return;
  }
  next();
};

const ensureToken = (req, res, next) => {
  let bearerToken = '';
  const bearerHeader = req.get('Authorization');
  if (bearerHeader) {
    bearerToken = bearerHeader.split(' ')[1];
  } else {
    bearerToken = req.body.token;
  }
  if (!bearerToken) {
    bearerToken = '';
  }
  try {
    const decoded = jwt.verify(bearerToken, secretKey);
    req.body.decoded = decoded;
    // confirm email exists in database
    getUser(req.body.decoded.user_name)
      .then((result) => {
        req.body.databaseResult = result;
        next();
      })
      .catch(() => {
        // console.log(e);
        sendResponse(res, 403, null, 'Invalid user');
      });
    // next();
  } catch (err) {
    sendResponse(res, 403, null, 'Invalid Token');
  }
};


export {
  validateEventInput, isPositiveInteger, verifyInput, ensureToken,
};
