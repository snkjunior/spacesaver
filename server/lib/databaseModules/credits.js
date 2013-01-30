var module = function(connection) {
	this.function1 = function(param, callback) {
		var sql = 'SQL';
		connection.query(sql, function(error, result) {
			if (error) {
				console.log(error);
				callback(-1);
			}
			else {
				callback(result);
			}
		});
	}
}

exports.connect = function(connection) {
	return new module(connection);
}