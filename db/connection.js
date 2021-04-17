const mysql = require('mysql2');
const util = require('util');

// connect to MySQL database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: '',
        // Your MySQL password
        password: '',
        database: 'employees'
    });

db.connect();
db.query = util.promisify(db.query);
module.exports = db;
