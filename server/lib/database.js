var connection = require('mysql').createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'spacesaver'
});

exports.users = require('./databaseModules/users').connect(connection);