var connection = require('mysql').createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'spacesaver'
});

exports.users = require('./databaseModules/users').connect(connection);
exports.characters = require('./databaseModules/characters').connect(connection);