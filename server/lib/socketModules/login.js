exports.connect = function(socket, server) {
	var sendResponse = function(data) {
		socket.emit('sLogin', data);
	}

    var requestHandler = function(data) {
		if (!data || !data.login || !data.password || data.login == "" || data.password == "") {
			sendResponse({type: 'error', error: 'Data is missing'});
			return;
		}

		var login = data.login;
		var password = data.password;

		server.database.users.getUserIdByLoginAndPassword(login, password, function(userId) {
			if(userId != -1) {
				var loginResult = server.userLogin(userId, socket.id);
				if (loginResult == true) {
					sendResponse({type: 'ok'});
				}
				else {
					sendResponse({type: 'error', error: loginResult});
				}
			}
			else {
				sendResponse({type: 'error', error: 'Unknown error'});
			}
		})
    }

    socket.on('cLogin', requestHandler);
}
