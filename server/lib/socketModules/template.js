exports.connect = function(socket, server) {
	this.sendResponse = function(data) {
		socket.emit('sTemplate', data);
	}

    var requestHandler = function(data) {
		
    }
        
    socket.on('cTemplate', requestHandler);
}
