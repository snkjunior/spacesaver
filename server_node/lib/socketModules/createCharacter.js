exports.connect = function(socket, server, userId) {
	var jobSkills = {
		medic: {
			engineering: 1,
			medicine: 3,
			physics: 1,
			programming: 1
		},
		engineer: {
			engineering: 1,
			medicine: 1,
			physics: 3,
			programming: 1
		},
		hacker: {
			engineering: 1,
			medicine: 1,
			physics: 1,
			programming: 3
		},
		saver: {
			engineering: 3,
			medicine: 3,
			physics: 1,
			programming: 1
		}
	}

	var sendResponse = function(data) {
		socket.emit('sCreateCharacter', data);
	}

    var requestHandler = function(data) {
		if (!data || !data.name || !data.genre || !data.job) {
			sendResponse({type: 'error', error: 'Some data missed'});
		}

		var name = data.name;
		var genre = data.genre;
		var job = data.job;

		if (name == '') {
			sendResponse({type: 'error', error: 'Plz, enter character name'});
			return;
		}

		if (genre != 'male' && genre != 'female') {
			sendResponse({type: 'error', error: 'Wrong genre'});
			return;
		}

		if (job != 'medic' && job != 'engineer' && job != 'hacker' && job != 'saver') {
			sendResponse({type: 'error', error: 'Wrong genre'});
			return;
		}

		server.database.characters.createCharacter(userId, data, jobSkills[job], function(result) {
			if(result == true) {
				sendReponse({type: 'ok'});
			}
			else {
				sendReponse({type: 'error', error: 'Character was not created'});
			}
		});
    }

    socket.on('cCreateCharacter', requestHandler);
}
