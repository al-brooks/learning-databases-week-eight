// npm install pg-promise
const pgp = require('pg-promise')();
// set connection for pg-promise object
const connectionString =
  'postgres://otzxnfsj:DvGvZk9BrTYjSXmD9XFf6GT5VAlk69U-@chunee.db.elephantsql.com/otzxnfsj';
// set database object
const db = pgp(connectionString);

module.exports = db;
