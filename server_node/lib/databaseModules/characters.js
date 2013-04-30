var module = function(connection) {
	this.getCharacterList = function(userId, callback) {
		var sql = 'SELECT `character_id`, `name`, `genre`, `class`, `level`, `exp` FROM `characters` WHERE `user_id` = ?';
		connection.query(sql, [userId], function(error, result) {
			if (error) {
				console.log(error);
				callback(-1);
			}
			else {
				callback(result);
			}
		});
	}

	this.getCharacterInfo = function(characterId, callback) {
		var sql = 'SELECT * FROM `characters` WHERE `character_id` = ? LIMIT 1';
		connection.query(sql, [characterId], function(error, result) {
			if (error) {
				console.log(error);
				callback(-1);
			}
			else {
				callback(result[0]);
			}
		});
	}

	this.createCharacter = function(userId, chInfo, chSkills, callback) {
		var sql = 'INSERT INTO `characters` SET `user_id` = ?, `name` = ?, `genre` = ?, `job` = ?, `level` = 1, `exp` = 0, `engineering` = ?, `medicine` = ?, `physics` = ?, `programming` = ?';
		connection.query(sql, [userId, chInfo.name, chInfo.genre, chInfo.job, chSkills.engineering, chInfo.medicine, chInfo.physics, chInfo.programming], function(error, result) {
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

	this.removeCharacter = function(characterId, callback) {
		var sql = 'DELETE FROM `characters` WHERE `characterId` = ? LIMIT 1';
		connection.query(sql, [characterId], function(error, result) {
			if (error) {
				console.log(error);
				callback(-1);
			}
			else {
				callback(true);
			}
		});
	}
}

exports.connect = function(connection) {
	return new module(connection);
}