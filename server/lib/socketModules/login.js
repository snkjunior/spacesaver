exports.connect = function(socket, server) {
	this.sendResponse = function(data) {
		socket.emit('sLogin', data);
	}

    var requestHandler = function(data) {
		if (!data || !data.login || !data.password || data.login == "" || data.password == "") {
			this.sendResponse({type: 'error', error: 'Data is missing'});
		}

		var login = data.login;
		var password = data.password;

		server.database.users.getUserIdByLoginAndPassword(login, password, function(userId) {
			if(userId != -1) {
				var loginResult = server.userLogin(userId, socket.id);
				if (loginResult == true) {
					this.sendResponse({type: 'ok'});
				}
				else {
					this.sendResponse({type: 'error', error: loginResult});
				}
			}
			else {
				this.sendResponse({type: 'error', error: 'Unknown error'});
			}
		})
    }

    socket.on('cLogin', requestHandler);
}
