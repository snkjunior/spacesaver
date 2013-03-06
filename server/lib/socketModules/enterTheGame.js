exports.connect = function(socket, server) {
	var sendResponse = function(data) {
		socket.emit('sEnterTheGame', data);
	}

    var requestHandler = function(data) {
		if (!data || !data.characterId || data.characterId == '') {
			sendResponse({type: 'error', error: 'Some data missing'});
			return;
		}

		
    }

    socket.on('cEnterTheGame', requestHandler);
}
