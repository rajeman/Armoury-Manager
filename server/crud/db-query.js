import { Client } from 'pg';

let connectionString = process.env.DATABASE_URL;


if (process.env.current_env === 'test') {
  connectionString = process.env.TEST_DATABASE_URL;
}
const usersTable = 'users';
const eventsTable = 'events';


const createEvent = item => new Promise((resolve, reject) => {
  const insertTime = Date.now() / 1000 | 0; // eslint-disable-line no-bitwise
  const client = new Client(connectionString);
  client.connect()
    .then(() => {
      const sql = `INSERT INTO ${eventsTable} (user_id, rank_id, gun_id, event_timestamp, action, insert_timestamp) VALUES ($1, $2, $3, $4, $5, $6)`;
      const params = [item.userId, item.rankId, item.gunId,
        item.timestamp, item.action, insertTime];
      client.query(sql, params)
        .then((result) => {
          // console.log(result.rows);
          resolve(result.rowCount);
          client.end();
        })
        .catch((e) => {
          reject(e);
        });
    }).catch((e) => {
      reject(e);
    });
});

const getEvents = () => new Promise((resolve, reject) => {
  const client = new Client(connectionString);
  client.connect()
    .then(() => {
      // const sql = `SELECT * FROM ${eventsTable} ORDER BY event_timestamp DESC`;
      const sql = 'SELECT events.*, users.name FROM users LEFT JOIN events ON events.user_id = users.user_id WHERE events.user_id = users.user_id';
      client.query(sql)
        .then((result) => {
          resolve(result.rows);
          client.end();
        })
        .catch(e => reject(e));
    }).catch(e => reject(e));
});

const getUser = userInput => new Promise((resolve, reject) => {
  const client = new Client(connectionString);
  client.connect()
    .then(() => {
      let sql = `SELECT * FROM ${usersTable} WHERE user_name = $1;`;
      if (typeof userInput === 'number') {
        sql = `SELECT * FROM ${usersTable} WHERE user_id = $1;`;
      }
      const params = [userInput];
      client.query(sql, params)
        .then((result) => {
          resolve(result.rows);
          client.end();
        })
        .catch(e => reject(e));
    }).catch(e => reject(e));
});


export { createEvent, getEvents, getUser };


// CREATE TABLE users(user_id serial PRIMARY KEY, user_name text NOT NULL,
// user_email text UNIQUE NOT NULL, user_password text NOT NULL);

// const client = new Client({ connectionString, ssl: true });
