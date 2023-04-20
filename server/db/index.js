const mysql = require('mysql')

const mysqlInfo = require('./config')

const connection = mysql.createConnection(mysqlInfo);

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('mysql connected success');
});



module.exports = connection