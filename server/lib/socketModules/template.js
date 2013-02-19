exports.connect = function(socket, server) {
	var sendResponse = function(data) {
		socket.emit('sTemplate', data);
	}

    var requestHandler = function(data) {
		
    }
        
    socket.on('cTemplate', requestHandler);
}
