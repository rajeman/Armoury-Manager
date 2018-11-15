import express from 'express';
import {
  validateEventInput, ensureToken,
} from '../helpers/validators';
import { createEvent, getEvents } from '../crud/db-query';

import sendResponse from '../helpers/responses';


const eventsRouter = express.Router();


eventsRouter.post('/', validateEventInput, ensureToken, (req, res) => {
  // query database

  createEvent(req.body).then(() => {
    sendResponse(res, 201, `event '${req.body.timestamp}' was successfully uploaded`);
  }).catch((e) => {
    if (e.code === '23505') {
      sendResponse(res, 409, null, 'Event with same timestamp already exists');
      return;
    }
    // console.log(e);
    sendResponse(res, 500, null, 'Internal server error');
  });
});


eventsRouter.get('/', ensureToken, (req, res) => {
  // query database
  getEvents().then((result) => {
    res.status(200).send({
      status: 200,
      message: 'successfully fetched events',
      events: result,
    });
  }).catch(() => {
    // console.log(e);
    sendResponse(res, 500, null, 'Internal server error');
  });
});

export default eventsRouter;
