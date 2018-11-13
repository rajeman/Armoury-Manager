'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearTable = exports.createEvent = undefined;

var _pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/armoury_manager';

if (process.env.current_env === 'test') {
  connectionString = process.env.TEST_DATABASE_URL || 'postgres://localhost:5432/armoury_manager_test';
}
// const usersTable = 'users';
var eventsTable = 'events';

var createEvent = function createEvent(item) {
  return new Promise(function (resolve, reject) {
    var insertTime = new Date().getTime();
    var client = new _pg.Client(connectionString);
    client.connect().then(function () {
      var sql = 'INSERT INTO ' + eventsTable + ' (user_id, rank_id, gun_id, event_timestamp, action, insert_timsetamp) VALUES ($1, $2, $3, $4, $5, $6)';
      var params = [item.userId, item.rankId, item.gunId, item.timestamp, item.action, insertTime];
      client.query(sql, params).then(function (result) {
        // console.log(result.rows);
        resolve(result.rowCount);
        client.end();
      }).catch(function (e) {
        reject(e);
      });
    }).catch(function (e) {
      reject(e);
    });
  });
};

var clearTable = function clearTable(tableName) {
  return new Promise(function (resolve, reject) {
    var client = new _pg.Client(connectionString);
    client.connect().then(function () {
      var sql = 'DELETE FROM ' + tableName + ';';
      if (tableName === '') {
        sql = 'DELETE FROM ' + tableName + ' WHERE user_level != 2;';
      }
      client.query(sql).then(function (result) {
        resolve(result.rowCount);
        client.end();
      }).catch(function (e) {
        return reject(e);
      });
    }).catch(function (e) {
      return reject(e);
    });
  });
};

exports.createEvent = createEvent;
exports.clearTable = clearTable;

// CREATE TABLE users(user_id serial PRIMARY KEY, user_name text NOT NULL,
// user_email text UNIQUE NOT NULL, user_password text NOT NULL);

// const client = new Client({ connectionString, ssl: true });
//# sourceMappingURL=db-query.js.map