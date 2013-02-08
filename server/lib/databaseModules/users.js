var module = function(connection) {
	this.isUserExists = function(login, callback) {
		var sql = 'SELECT `user_id` FROM `users` WHERE `login` = ? LIMIT 1';
		connection.query(sql, [login], function(error, result) {
			if (error) {
				console.log(error);
				callback(-1);
			}
			else {
				if(result) {
					callback(true);
				}
				else {
					callback(false);
				}
			}
		});
	}

	this.createNewUser = function(login, password, email, callback) {
		var sql = 'INSERT INTO `users` SET `login` = ?, `password` = MD5(?), `email` = ?';
		connection.query(sql, [login, password, email], function(error, result) {
			if (error) {
				console.log(error);
				callback(-1);
			}
			else {
				callback(true);
			}
		});
	}

	this.getUserIdByLoginAndPassword = function(login, password, callback) {
		var sql = 'SELECT `user_id` FROM `users` WHERE `login` = ? AND `password` = ? LIMIT 1';
		connection.query(sql, [login, password], function(error, result) {
			if (error) {
				console.log(error);
				callback(-1);
			}
			else {
				callback(result[0]['user_id']);
			}
		});
	}
}

exports.connect = function(connection) {
	return new module(connection);
}