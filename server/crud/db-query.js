import { Client } from 'pg';

let connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/armoury_manager';


if (process.env.current_env === 'test') {
  connectionString = process.env.TEST_DATABASE_URL || 'postgres://localhost:5432/armoury_manager_test';
}
// const usersTable = 'users';
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



export default createEvent;


// CREATE TABLE users(user_id serial PRIMARY KEY, user_name text NOT NULL,
// user_email text UNIQUE NOT NULL, user_password text NOT NULL);

// const client = new Client({ connectionString, ssl: true });
