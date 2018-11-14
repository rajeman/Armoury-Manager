import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sendResponse from '../helpers/responses';

import { verifyInput } from '../helpers/validators';
import { getUser } from '../crud/db-query';

const authRouter = express.Router();

let secretKey = process.env.TOKEN_KEY;

if (process.env.current_env === 'test') {
  secretKey = process.env.TEST_TOKEN_KEY;
}

authRouter.post('/login', verifyInput, (req, res) => {
  // confirm username exists in database
  getUser(req.body.username)
    .then((result) => { 
      if (bcrypt.compareSync(req.body.password, result[0].user_password)) {
        const payload = {};
        payload.username = result[0].user_name;
        payload.name = result[0].name;
        payload.userId = result[0].user_id;
        payload.userRank = result[0].user_rank;
        const token = jwt.sign(payload, secretKey);
        res.header('Authorization', `Bearer ${token}`);
        res.status(303).send({
          message: 'successfully logged in',
          token,
        });
      } else {
        sendResponse(res, 403, null, 'Invalid username or password');
      }
    })
    .catch(() => {
      // console.log(e);
      sendResponse(res, 403, null, 'Invalid username or password');
    });
});

insert into users (user_id, name, user_name, user_password, user_rank) values (90, 'Armourer Stone','armourer_stone', '$2b$07$AMkhhDVMZMnrDjDxOQskX.Ys6VJx2O3EgumET7ba763Th2BoRatYq', 9);
export default authRouter;
