const mysql = require('mysql2');

connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'notesdavidstalgren',
    password: 'notesdavidstalgren',
    database: 'notesdavidstalgren'
});

module.exports = connection;