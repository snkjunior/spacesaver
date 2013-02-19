exports.connect = function(socket, server, userId) {
	var sendResponse = function(data) {
		socket.emit('sGetCharactersList', data);
	}

    var requestHandler = function(data) {
		server.database.characters.getCharacterList(userId, function(characters) {
			if (characters != -1) {
				sendResponse({type: 'ok', data: characters});
			}
		});
    }

    socket.on('cGetCharactersList', requestHandler);
}
