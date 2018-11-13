import express from 'express';
import {
  validateEventInput,
} from '../helpers/validators';
import {
  createEvent,
} from '../crud/db-query';

import sendResponse from '../helpers/responses';


const eventsRouter = express.Router();


eventsRouter.post('/', validateEventInput, (req, res) => {
  // query database

  createEvent(req.body).then(() => {
    sendResponse(res, 201, `event '${req.body.timestamp}' was successfully uploaded`);
  }).catch(() => {
    //console.log(e);
    sendResponse(res, 500, null, 'Internal server error');
  });
});


export default eventsRouter;
